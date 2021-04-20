pragma solidity ^0.5.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import './AbstractOrderBook.sol';
import "../interfaces/OrderBookInterface.sol";

contract BuyOrderBook is AbstractOrderBook, OrderBookInterface {
    constructor(address depositAddres) AbstractOrderBook(depositAddres) public {}

    function _preCreate(
        address giveCurrency,
        uint256 give,
        address takeCurrency
    ) internal {
        require(
            giveCurrency == address(0x0),
            "Must sell ether"
        );
        require(
            takeCurrency != address(0x0),
            "Must buy token"
        );
        require(
            msg.value == give,
            "Must deposit ether before BuyOrder"
        );
        deposit.deposit.value(give)();
    }

    function _finalize(Order memory order) internal {
        IERC20 token = IERC20(order.takeCurrency);
        require(
            token.balanceOf(msg.sender) >= order.take,
            "Sender must have required tokens!"
        );
        require(
            token.allowance(msg.sender, address(this)) >= order.take,
            "Sender must allow tokens to be transferred!"
        );
        token.transferFrom(msg.sender, order.creator, order.take);
        deposit.withdraw(order.give);
        msg.sender.transfer(address(this).balance);
    }

    function withdrawFromDeposit() onlyDeposit() external payable {}

    function interfaceOrderBook() external pure returns (bool) {
        return true;
    }
}
