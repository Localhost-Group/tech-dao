//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface ITEXP {
    function gatherExpForLearning(
        address mentor,
        address student,
        uint256 amount
    ) external returns (bool);

    function gatherExpForPublishing(address mentor, uint256 amount)
        external
        returns (bool);

    function isExpToken() external pure returns (bool);
}