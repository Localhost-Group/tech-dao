pragma solidity ^0.5.2;

import "../interfaces/DepositInterface.sol";

contract AbstractOrderBook {
    uint256 public nonce = 0;

    Order[] public orderList;
    mapping(uint256 => Order) public orders;

    DepositInterface public deposit;

    enum Status {
        ACTIVE,
        FINALIZED
    }

    struct Order {
        uint256 nonce;
        address giveCurrency;
        uint256 give;
        address takeCurrency;
        uint256 take;
        address creator;
        Status status;
    }

    modifier onlyDeposit() {
        require(
            msg.sender == address(deposit),
            "Sender is not a Deposit"
        );
        _;
    }

    event NewOrder(address creator, uint256 nonce);

    constructor(address depositAddress) public {
        DepositInterface _deposit = DepositInterface(depositAddress);
        require(
            _deposit.interfaceDeposit(),
            "Must be a Deposit contract!"
        );
        deposit = _deposit;
    }

    function create(
        address giveCurrency,
        uint256 give,
        address takeCurrency,
        uint256 take
    ) public payable {
        require(
            give > 0 && take > 0,
            "Give and taken must be greater than 0!"
        );
        _preCreate(
            giveCurrency,
            give,
            takeCurrency
        );
        Order memory order = Order(
            nonce,
            giveCurrency,
            give,
            takeCurrency,
            take,
            msg.sender,
            Status.ACTIVE
        );
        orders[nonce] = order;
        orderList.push(order);
        emit NewOrder(msg.sender, nonce);
        nonce += 1;
    }

    // This function is overriden in its children and thus its nonpayable
    function _preCreate(
        address,
        uint256,
        address
    ) internal {
        revert('This is abstract function call for preCreate!');
    }

    function finalize(
        uint256 _nonce
    ) public payable {
        Order storage order = orders[_nonce];
        require(
            order.status == Status.ACTIVE,
            "Order is not active"
        );
        _finalize(order);
        order.status = Status.FINALIZED;
    }

    // This function is overriden in its children and thus its nonpayable
    function _finalize(Order memory) internal {
        revert('This is abstract function call for finalize!');
    }
}
