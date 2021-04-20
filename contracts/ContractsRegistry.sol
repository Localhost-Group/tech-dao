//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract BalancesRegisty {
    address private _admin;
    
    // owner x value
    mapping(address => uint256) private  _coins; 
    // owner x handler x value
    mapping(address => mapping(address => uint256)) private  _allowances; 

    // owner x type x value
    mapping(address => mapping(address => uint256)) private  _exps; 

    constructor ( ) {
        _admin = msg.sender;
    }

    modifier onlyAdminMethod() {
        require(msg.sender == _admin, "BalancesRegisty: only admin can to things");
        _;
    }

    function getCoinBalance(address owner) public view returns (uint256){
        require(owner != address(0), "BalancesRegisty: owner not exist");
        return _coins[owner];
    }

    function getAllowance(address owner, address handler) public view returns (uint256){
        require(owner != address(0), "BalancesRegisty: owner not exist");
        require(handler != address(0), "BalancesRegisty: handler not exist");
        return _allowances[owner][handler];
    }

    function getExp(address owner, address type) public view returns (uint256){
        require(owner != address(0), "BalancesRegisty: owner not exist");
        require(type != address(0), "BalancesRegisty: exp type not exist");
        return _exps[owner][type];
    }


    function addCoins(address owner, uint amount) external return (uint256){
        require(owner != address(0), "BalancesRegisty: owner not exist");
        require(amount != 0, "BalancesRegisty: why are you adding amount to 0?");

        _coins[owner] += amount;
        return _coins[owner];
    }

    function subtractCoins(address owner, uint amount) external return (uint256){
        require(owner != address(0), "BalancesRegisty: owner not exist");
        require(amount != 0, "BalancesRegisty: why are you subtract amount to 0?");

        require(_coins[owner] >= amount, "BalancesRegisty: owner doesnt have so much");
        _coins[owner] -= amount;
        return _coins[owner];
    }

    function tranferCoins(address owner, address receiver, uint amount) external return (bool){
        subtractCoins(owner, amount);
        addCoins(receiver, amount);
        return true;
    }

    function addExp(address owner, address type, uint amount) external return (uint256){
        require(owner != address(0), "BalancesRegisty: owner not exist");
        require(type != address(0), "BalancesRegisty: exp type not exist");
        require(amount != 0, "BalancesRegisty: why are you setting amount to 0?");

        _exps[owner][type] += amount;
        return _exps[owner][type];
    }


    function addAllowance(address owner, address handler, uint allowance) external return (uint256){
        require(owner != address(0), "BalancesRegisty: owner not exist");
        require(handler != address(0), "BalancesRegisty: handler not exist");
        require(allowance != 0, "BalancesRegisty: why are you setting allowance to 0?");
        require(_coins[owner] >= allowance, "BalancesRegisty: owner doesnt have so much to allow");

        _allowances[owner][handler] += allowance;
        return _allowances[owner][handler];
    }

    function subtractAllowance(address owner, address handler, uint allowance) external return (uint256){
        require(owner != address(0), "BalancesRegisty: owner not exist");
        require(handler != address(0), "BalancesRegisty: handler not exist");
        require(allowance != 0, "BalancesRegisty: why are you setting allowance to 0?");

        require(_allowances[owner][handler] >= allowance, "BalancesRegisty: handler doesnt have so much");
        _allowances[owner][handler] -= allowance;
        return _allowances[owner][handler];
    }
} 





// kto ma dostęp do rejestru
// do dodawania admin
// do zmiany admin
// do odczytu wszyscy

// aby dodac coina EXP  - propy typu mapping address => bool:
// - sprawdz czy nie ma już przypisanego mappingu expów -> nie pozwalaj
// - sprawdz wysyłający jest adminem
// - sprawdz czy adres wysyłany nie jest 0x0, adminem 
// - dodaj mapping address => true
// - dodaj do arrayki z adressami

// aby nadpisac coina EXP:
// - sprawdz czy jest mappingu expów -> jeśli nie to nie pozwalaj
// - sprawdz czy stary address jest w mappingu
// - sprawdz wysyłający jest adminem
// - sprawdz czy adres wysyłany nie jest 0x0, adminem 
// - w mappingu stary address zmien na false
// - w arrayu z adresami usun stary adres
// - dodaj nowy adres do arrayki z addressami



contract ContractsRegistry {
    address private _admin;

    address private  _coinAddress; 

    address[] private  _expsAddresses;
    mapping(address => bool) private  _exps;

    address private  _helpOffersMarket; 

    modifier onlyAdminMethod() {
        require(msg.sender == _admin, "ContractsRegistry: only admin can to things");
        _;
    }

    constructor() {
        _admin = msg.sender;
    }

    function getOwner() public view returns (address){
        return _admin;
    }



    function getCoin() public view returns (address){
        require(_coinAddress != address(0), "ContractsRegistry: address not set");
        return _coinAddress;
    }

    function addCoin(address coin) onlyAdminMethod() public returns (bool) {
        require(coin != address(0), "ContractsRegistry: wrong coin address");
        require(_coinAddress == address(0), "ContractsRegistry: coin already set");
        _coinAddress = coin;
        return true;
    }

    function updateCoin(address coin, address oldAddress) onlyAdminMethod() public returns (bool) {
        require(coin != address(0), "ContractsRegistry: wrong coin address");
        require(_coinAddress == oldAddress, "ContractsRegistry: wrong all address");
        _coinAddress = coin;
        return true;
    }






    function getExps() public view returns (address[] memory){
        return _expsAddresses;
    }

    function addExp(address expType) onlyAdminMethod() public returns (bool) {
        require(_exps[expType] == false, "ContractsRegistry: exp type already in");
        require(expType != address(0), "ContractsRegistry: wrong adres address");

        _exps[expType] = true;
        _exps.push(expType);
        return true;
    }

    function updateExp(address expType, address oldAddress) onlyAdminMethod() public returns (bool) {
        require(_exps[oldAddress] == true, "ContractsRegistry: exp type not set in");
        require(_exps[expType] == false, "ContractsRegistry: new exp type set in");
        require(expType != address(0), "ContractsRegistry: wrong exp address");

        _exps[oldAddress] = false;
        _exps[expType] = true;

        for (uint i = index; i < _expsAddresses.length-1; i++){
            if(_expsAddresses[i] == oldAddress){
                _expsAddresses[i] = expType;
            }
        }

        return true;
    }




    // todo
    function addHelpMarket(address _a) onlyAdminMethod() public returns (bool) {
        _helpOffersMarket = _a
        return true
    }
}