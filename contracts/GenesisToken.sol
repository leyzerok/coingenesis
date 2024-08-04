// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract GenesisToken is ERC20 {
    string public twitterURL;
    string public discordURL;
    string public websiteURL;
    string public telegramURL;
    string public imageURL;
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        string memory _twitterURL,
        string memory _discordURL,
        string memory _websiteURL,
        string memory _telegramURL,
        string memory _imageURL
    ) ERC20(_name, _symbol) {
        _mint(_msgSender(), _supply);
        twitterURL = _twitterURL;
        discordURL = _discordURL;
        websiteURL = _websiteURL;
        telegramURL = _telegramURL;
        imageURL = _imageURL;
    }
}
