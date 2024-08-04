// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {IGenesisFactory} from "./interfaces/IGenesisFactory.sol";
import {GenesisToken} from "./GenesisToken.sol";
import {IV2Router02} from "./interfaces/IV2Router02.sol";
contract GenesisFactory is AccessControl, ReentrancyGuard, IGenesisFactory {
    using SafeERC20 for IERC20;
    uint256 public PERCENT_100 = 1 * 10 ** 18; // 100% of fee
    uint256 public MAX_FEE_RATE = 5 * 10 ** 16; // max fee equals 5%
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
    uint256 public feeRate;
    mapping(address => TokenData) public tokens;
    address public chainLinkPriceFeed;
    address public sushiSwapRouter;

    modifier onlyActiveToken(address _token) {
        if (!isTokenActive(_token)) {
            revert NotActiveToken();
        }
        _;
    }
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(DEPLOYER_ROLE, _msgSender());
    }

    function setFeeRate(
        uint256 _feeRate
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (_feeRate > MAX_FEE_RATE) {
            revert InvalidFeeRate();
        }
        feeRate = _feeRate;
        emit FeeUpdated(_feeRate);
    }

    function setChainLinkPriceFeed(
        address _priceFeed
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (_priceFeed == address(0)) {
            revert ZeroAddress();
        }
        chainLinkPriceFeed = _priceFeed;
        emit PriceFeeUpdated(_priceFeed);
    }

    function setSushiSwapRouter(
        address _sushiSwapRouter
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (_sushiSwapRouter == address(0)) {
            revert ZeroAddress();
        }
        sushiSwapRouter = _sushiSwapRouter;
        emit DexRouterUpdates(_sushiSwapRouter);
    }

    function createToken(
        TokenDeployment memory _tokenInfo
    ) external returns (address) {
        if (
            !hasRole(DEFAULT_ADMIN_ROLE, _msgSender()) &&
            !hasRole(DEPLOYER_ROLE, _msgSender())
        ) revert AccessControlBadConfirmation();
        return _createToken(_tokenInfo);
    }

    function buyToken(
        address _tokenAddress,
        uint32 _deadline
    ) external payable onlyActiveToken(_tokenAddress) nonReentrant {
        _buyToken(_tokenAddress, _deadline);
    }

    function listToken(
        address _token,
        uint256 _deadline
    ) external nonReentrant {
        _listToken(_token, _deadline);
    }

    function getAmountOut(
        address _token,
        uint256 _ethAmountIn
    ) external view onlyActiveToken(_token) returns (uint256) {
        TokenData memory tokenData = tokens[_token];
        return
            _getAmountOut(
                _ethAmountIn,
                tokenData.availableSupply,
                tokenData.ethTarget
            );
    }

    function getCollectedUSD(address _token) external view returns (uint256) {
        TokenData memory tokenData = tokens[_token];
        if (tokenData.isListed || !tokenData.isCreated) return 0;
        int256 price;
        (, price, , , ) = AggregatorV3Interface(chainLinkPriceFeed)
            .latestRoundData();

        return (uint256(price) * tokenData.balance) / (1 * 10 ** 26);
    }
    function isTokenActive(address _token) public view returns (bool) {
        TokenData memory tokenData = tokens[_token];
        return
            tokenData.isCreated &&
            !tokenData.isListed &&
            !tokenData.isTargetAchieved;
    }

    function getTokenStatus(
        address _token
    ) external view returns (bool, bool, bool) {
        TokenData memory tokenData = tokens[_token];
        return (
            tokenData.isCreated,
            tokenData.isListed,
            tokenData.isTargetAchieved
        );
    }

    function getReserve(address _token) public view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }

    function _createToken(
        TokenDeployment memory _tokenInfo
    ) internal returns (address) {
        if (_tokenInfo.totalSupply == 0) revert InvalidSupply();
        if (
            _tokenInfo.totalSupply < _tokenInfo.availableSupply ||
            _tokenInfo.availableSupply == 0
        ) revert InvalidAvailableAllocation();
        if (_tokenInfo.ethTarget == 0) revert InvalidEthTarget();
        GenesisToken newToken = new GenesisToken(
            _tokenInfo.name,
            _tokenInfo.symbol,
            _tokenInfo.totalSupply,
            _tokenInfo.twitterURL,
            _tokenInfo.discordURL,
            _tokenInfo.websiteURL,
            _tokenInfo.telegramURL,
            _tokenInfo.imageURL
        );

        address tokenAddress = address(newToken);
        tokens[tokenAddress].isCreated = true;
        tokens[tokenAddress].totalSupply = _tokenInfo.totalSupply;
        tokens[tokenAddress].availableSupply = _tokenInfo.availableSupply;
        tokens[tokenAddress].ethTarget = _tokenInfo.ethTarget;
        tokens[tokenAddress].tokenCreator = _tokenInfo.tokenCreator;
        emit TokenCreated(
            tokenAddress,
            _tokenInfo.totalSupply,
            _tokenInfo.availableSupply,
            _tokenInfo.ethTarget
        );
        return tokenAddress;
    }

    function _buyToken(address _tokenAddress, uint32 _deadline) internal {
        if (msg.value == 0) revert ZeroValue();
        if (_deadline < block.timestamp) revert DeadlineExpired();
        uint256 tokensReserve = getReserve(_tokenAddress);
        TokenData memory tokenData = tokens[_tokenAddress];
        uint256 minTokenReserve = tokenData.totalSupply -
            tokenData.availableSupply;
        if (tokensReserve == minTokenReserve) revert NotEnoughTokenSupply();
        uint256 tokenReserve = getReserve(_tokenAddress);
        uint256 tokensToReceive = _getAmountOut(
            msg.value,
            tokenData.availableSupply,
            tokenData.ethTarget
        );
        if (tokenReserve < tokensToReceive) revert NotEnoughTokenSupply();
        uint256 tokenReserveAfterTx = tokenReserve - tokensToReceive;
        uint256 refund;
        if (tokenReserveAfterTx < minTokenReserve) {
            tokensToReceive = tokenReserve - minTokenReserve;
            tokenReserveAfterTx = minTokenReserve;
            // TODO test correctness of calculations
            uint256 ethCost = _getAmountIn(
                tokensToReceive,
                tokenData.availableSupply,
                tokenData.ethTarget
            );
            refund = msg.value - ethCost;
        }
        if (tokenReserveAfterTx == minTokenReserve)
            tokens[_tokenAddress].isTargetAchieved = true;
        tokens[_tokenAddress].balance += msg.value - refund;
        emit Bought(_tokenAddress, msg.value - refund, tokensToReceive);
        IERC20(_tokenAddress).safeTransfer(_msgSender(), tokensToReceive);
        if (refund > 0) _transferEth(_msgSender(), refund);
    }

    function _listToken(address _token, uint256 _deadline) internal {
        address _sushiSwapRouter = sushiSwapRouter;
        if (_sushiSwapRouter == address(0)) revert ZeroDexRouter();
        TokenData memory tokenData = tokens[_token];
        if (!tokenData.isCreated) revert TokenDoesntExist();
        if (!tokenData.isTargetAchieved) revert LaunchNotFinished();
        if (tokenData.isListed) revert TokenAlreadyListed();
        if (tokenData.tokenCreator != _msgSender()) revert NotTokenOwner();

        uint256 ethBalanceBefore = address(this).balance;
        uint256 tokenReserve = getReserve(_token);
        uint256 amountIn = tokenData.totalSupply - tokenData.availableSupply;
        // TODO update min values
        IV2Router02(_sushiSwapRouter).addLiquidityETH(
            _token,
            amountIn,
            tokenReserve,
            ethBalanceBefore,
            address(this),
            _deadline
        );
        tokens[_token].isListed = true;
    }

    function _transferEth(address _recipient, uint256 _value) internal {
        (bool success, ) = payable(_recipient).call{value: _value}("");
        if (!success) revert EthTransferFailed();
    }

    function _getAmountOut(
        uint256 _ethIn,
        uint256 _availableSupply,
        uint256 _ethTarget
    ) internal view returns (uint256) {
        return
            ((_ethIn * _availableSupply * PERCENT_100) / _ethTarget) /
            PERCENT_100;
    }

    function _getAmountIn(
        uint256 _tokensIn,
        uint256 _availableSupply,
        uint256 _ethTarget
    ) internal view returns (uint256) {
        return
            ((_tokensIn * _ethTarget * PERCENT_100) / _availableSupply) /
            PERCENT_100;
    }
}
