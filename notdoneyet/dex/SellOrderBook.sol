pragma solidity ^0.5.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import './AbstractOrderBook.sol';

contract SellOrderBook is AbstractOrderBook {
    constructor(address depositAddres) AbstractOrderBook(depositAddres) public {}

    function _preCreate(
        address giveCurrency,
        uint256 give,
        address takeCurrency
    ) internal {
        require(
            giveCurrency != address(0x0),
            "Must sell token"
        );
        require(
            takeCurrency == address(0x0),
            "Must buy ether"
        );
        IERC20 token = IERC20(giveCurrency);
        require(
            token.balanceOf(msg.sender) >= give,
            "Creator must have required tokens!"
        );
        require(
            token.allowance(msg.sender, address(this)) >= give,
            "Creator must allow tokens to be transferred!"
        );
    }

    function _finalize(Order memory order) internal {
        IERC20 token = IERC20(order.giveCurrency);
        require(
            token.balanceOf(order.creator) >= order.give,
            "Creator must have required tokens!"
        );
        require(
            token.allowance(order.creator, address(this)) >= order.give,
            "Creator must allow tokens to be transferred!"
        );
        require(
            msg.value == order.take,
            "Must deposit ether to finalize SellOrder"
        );
        token.transferFrom(order.creator, msg.sender, order.give);
        address payable seller = address(uint160(order.creator));
        seller.transfer(order.take);
    }
}
