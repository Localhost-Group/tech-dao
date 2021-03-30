//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import { ITEXP } from "./interfaces/ITEXP.sol";

contract TechEXPTokens is Ownable {
    // Event token structures
    mapping(address => ITEXP) public tokens;
    ITEXP[] public tokenList;

    function getTokensCount() public view returns (uint256) {
        return tokenList.length;
    }

    constructor() Ownable() {}

    function addEventToken(address _tokenAddress) public onlyOwner() {
        ITEXP token = ITEXP(_tokenAddress);

        require(
            token.isExpToken(),
            "Contract deployed under address is not TEXP Token"
        );

        tokens[_tokenAddress] = token;
        tokenList.push(token);
    }
}