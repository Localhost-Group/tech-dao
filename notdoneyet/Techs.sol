// //SPDX-License-Identifier: Unlicense

// pragma solidity ^0.8.0;

// import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
// import { ITEXP } from "./interfaces/ITEXP.sol";

// contract Technologies is Ownable {
//     // Event token structures
//     mapping(address => ITEXP) public tokens;
//     ITEXP[] public tokenList;

//     function getTokensCount() public view returns (uint256) {
//         return tokenList.length;
//     }

//     constructor() Ownable() {}

//     function addTechnologyToken(address a) public onlyOwner() {
//         ITEXP token = ITEXP(a);

//         require(
//             token.isExpToken(),
//             "Contract deployed under address is not TEXP Token"
//         );

//         tokens[a] = token;
//         tokenList.push(token);
//     }
// }