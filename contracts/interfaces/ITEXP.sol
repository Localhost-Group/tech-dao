//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface ITEXP {
    function earnForHelping(
        address mentor,
        uint256 amount,
        address student
    ) external payable returns (bool);

    function earnForPublishing(address mentor, uint256 amount)
        external
        payable
        returns (bool);

    function isExpToken() external pure returns (bool);
}