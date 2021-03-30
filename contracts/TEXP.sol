//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import { ITEXP } from "./interfaces/ITEXP.sol";

contract TEXP is ERC20, ITEXP {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    function earnForHelping(
        address mentor,
        uint256 amount,
        address student
    ) public payable override(ITEXP) returns (bool) {
        uint256 studentAmount = amount / 10;
        _mint(mentor, amount);
        _mint(student, studentAmount);
        return true;
    }

    function earnForPublishing(address mentor, uint256 amount)
        public
        payable
        override(ITEXP)
        returns (bool)
    {
        _mint(mentor, amount);
        return true;
    }

    function isExpToken() public pure override(ITEXP) returns (bool) {
        return true;
    }
}
