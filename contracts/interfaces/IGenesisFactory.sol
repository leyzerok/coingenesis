// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IGenesisFactory {
    error ZeroAddress();
    error ZeroValue();
    error InvalidSupply();
    error InvalidAvailableAllocation();
    error InvalidEthTarget();
    error InvalidFeeRate();
    error TokenDoesntExist();
    error LaunchNotFinished();
    error TokenAlreadyListed();
    error NotTokenOwner();
    error NotActiveToken();
    error NotEnoughTokenSupply();
    error EthTransferFailed();
    error DeadlineExpired();
    error ZeroDexRouter();

    event FeeUpdated(uint256 newFeeRate);
    event PriceFeeUpdated(address newPriceFee);
    event DexRouterUpdates(address newRouter);
    event TokenCreated(
        address indexed tokenAddress,
        uint256 totalSupply,
        uint256 availableSupply,
        uint256 ethTarget
    );
    event Bought(
        address indexed tokenAddress,
        uint256 amountIn,
        uint256 amountOut
    );

    struct TokenDeployment {
        string name;
        string symbol;
        uint256 totalSupply;
        string twitterURL;
        string discordURL;
        string websiteURL;
        string telegramURL;
        string imageURL;
        address tokenCreator;
        uint256 availableSupply;
        uint256 ethTarget;
    }
    struct TokenData {
        uint256 balance;
        uint256 totalSupply;
        uint256 availableSupply;
        uint256 ethTarget;
        uint256 usdTarget;
        address tokenCreator;
        bool isCreated;
        bool isListed;
        bool isTargetAchieved;
    }
    function setFeeRate(uint256 _feeRate) external;
    function setChainLinkPriceFeed(address _priceFeed) external;
    function setSushiSwapRouter(address _sushiSwapRouter) external;

    function createToken(
        TokenDeployment memory _tokenInfo
    ) external returns (address);

    function buyToken(address _tokenAddress, uint32 _deadline) external payable;

    function getAmountOut(
        address _token,
        uint256 _ethAmountIn
    ) external view returns (uint256);

    function getCollectedUSD(address _token) external view returns (uint256);
}
