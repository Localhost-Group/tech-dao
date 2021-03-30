//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

// ma maxymalny limit - 1mld
// można go burnować -> wrzucić na portfel 0x0
// każda zmiana robi event odbierany w społeczności Community jako automatic stacking
// można zarobić za nauke
// można wysłać jako ofertę za nauke
// można wysłać jako płatność za rabat

abstract contract ERC20Redistributable is ERC20 {
    mapping(address => bool) _owners;
    address[] private _addresses;

    function _getCount() internal virtual returns (uint256 count) {
        return _addresses.length;
    }

    function _redistributeToOwners(address _from, uint256 amount)
        internal
        virtual
        returns (bool)
    {
        uint256 toSendForOne = amount / _getCount();

        for (uint256 i = 0; i < _addresses.length; i++) {
            address user = _addresses[i];
            _transfer(_from, user, toSendForOne);
        }

        return true;
    }

    function _addToOwners(address newOwner) internal virtual {
        _addresses.push(newOwner);
        _owners[newOwner] = true;
    }

    function _containsOwner(address newOwner) internal virtual returns (bool) {
        return _owners[newOwner];
    }
}

contract TCOIN is ERC20, ERC20Burnable, ERC20Redistributable {
    uint256 private _supply = 0;
    uint256 private _maxSupply = 256 * 10**9 * 10**9;

    constructor() ERC20("TCoin", "TCOIN") {}

    function earnForLearning(address mentor) public payable returns (bool) {
        uint256 amount = 32 * 10**9;

        if (super._containsOwner(mentor) == false) {
            super._addToOwners(mentor);
        }

        if (_supply + amount <= _maxSupply) {
            _supply += amount;
            _mint(mentor, amount);
            return (true);
        }

        amount = 0;
        return (false);
    }

    function spend(
        address _sender,
        address _to,
        uint256 amount
    ) public payable returns (bool, uint256) {
        uint256 toBurn = amount / 10;
        uint256 toSend = (4 * amount) / 5;
        uint256 toRedistribute = amount / 10;

        if (super._containsOwner(_to) == false) {
            super._addToOwners(_to);
        }

        if (super._containsOwner(_sender) == false) {
            super._addToOwners(_sender);
        }

        _burn(_sender, toBurn);
        _transfer(_sender, _to, toSend);
        super._redistributeToOwners(_sender, toRedistribute);

        return (true, toSend);
    }

    function minted() public view returns (uint256) {
        return _supply;
    }

    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }
}
