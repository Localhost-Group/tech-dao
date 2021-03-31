//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import { ITEXP } from "./interfaces/ITEXP.sol";

contract TEXP is ERC20, ITEXP {
    uint256 private _totalSupply = 0;

    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    function decimals() public view virtual override(ERC20) returns (uint8) {
        return 1;
    }

    function earnForHelping(
        address mentor,
        uint256 amount,
        address student
    ) public payable override(ITEXP) returns (bool) {
        require(mentor != address(0), "ERC20: mentor address cannot be 0x0");
        require(mentor != address(0), "ERC20: mentor address cannot be 0x0");

        uint256 studentAmount = amount / 10;
        _mint(mentor, amount);
        _mint(student, studentAmount);

        _totalSupply += amount;
        _totalSupply += studentAmount;

        return true;
    }

    function earnForPublishing(address mentor, uint256 amount)
        public
        payable
        override(ITEXP)
        returns (bool)
    {
        _mint(mentor, amount);

        _totalSupply += amount;

        return true;
    }

    function isExpToken() public pure override(ITEXP) returns (bool) {
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override(ERC20) returns (bool) {
        require(true, "ERC20: EXP cannot be transfered");
        return true;
    }

    function transfer(address recipient, uint256 amount) public virtual override(ERC20) returns (bool) {
        require(true, "ERC20: EXP cannot be transfered");
        return true;
    }
}
