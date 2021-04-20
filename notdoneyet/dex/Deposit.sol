pragma solidity ^0.5.2;

import "@openzeppelin/contracts/ownership/Ownable.sol";

import "../interfaces/DepositInterface.sol";
import "../interfaces/OrderBookInterface.sol";

contract Deposit is Ownable, DepositInterface {
    enum Status {
        CREATED,
        INITIALIZED
    }
    Status public currentStatus;

    OrderBookInterface public orderBook;
    modifier onlyOrderBook() {
        require(
            msg.sender == address(orderBook),
            "Only order book contract is allowed."
        ); _;
    }
    modifier statusIs(Status status) {
        require(
            currentStatus == status,
            "Status is not correct."
        ); _;
    }

    constructor() Ownable() public {
        currentStatus = Status.CREATED;
    }

    function setOrderBook(address _orderBook) public
    onlyOwner()
    statusIs(Status.CREATED) {
        OrderBookInterface orderBookContract = OrderBookInterface(_orderBook);
        require(
            orderBookContract.interfaceOrderBook(), 
            "Address is not an OrderBook contract"
        );
        orderBook = orderBookContract;
        currentStatus = Status.INITIALIZED;
    }

    function withdraw(uint256 amount) external
    onlyOrderBook()
    statusIs(Status.INITIALIZED) {
        require(
            address(this).balance >= amount,
            "Contract must have enough balance to withdraw"
        );
        orderBook.withdrawFromDeposit.value(amount);
    }

    function deposit() external payable
    onlyOrderBook()
    statusIs(Status.INITIALIZED) {}

    function interfaceDeposit() external pure returns (bool) {
        return true;
    }

    function () external payable {
        this.deposit();
    }
}
