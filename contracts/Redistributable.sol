//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ma maxymalny limit - 1mld
// można go burnować -> wrzucić na portfel 0x0
// każda zmiana robi event odbierany w społeczności Community jako automatic stacking
// można zarobić za nauke
// można wysłać jako ofertę za nauke
// można wysłać jako płatność za rabat

abstract contract Redistributable is ERC20, Ownable {
    mapping(address => uint256) internal _balances;
    mapping(address => bool) internal _owners;
    address[] internal _addresses;

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) Ownable() {}

    function decimals() public view virtual override(ERC20) returns (uint8) {
        return 2;
    }

    function _getOwnersCount() internal virtual returns (uint256 count) {
        return _addresses.length;
    }

    function _addToOwners(address a) internal virtual returns (bool) {
        if(_containsOwner(a) == false){
            _addresses.push(a);
            _owners[a] = true;
            return true;
        }
        return false;
    }

    function _redistribure(uint256 amount) internal virtual returns (bool) {
         uint256 toSendForOne = amount / _getOwnersCount();

        for (uint256 i = 0; i < _addresses.length; i++) {
            address user = _addresses[i];
            _addToBalance(user, toSendForOne);
        }

        return true;
    }

    function _containsOwner(address a) internal virtual returns (bool) {
        return _owners[a];
    }

    function _addToBalance(address recepient, uint256 amount) internal virtual {
        _balances[recepient] += amount;
    }
}
