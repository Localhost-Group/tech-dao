


contract CoinBalancesStore {
    mapping(address => uint256) public balances;
    mapping(address => bool) public owners;
    address[] public addresses;

    mapping (address => mapping (address => uint256)) internal _allowances;

    constructor() {}

}
