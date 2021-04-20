//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

import {Redistributable} from "./Redistributable.sol";


contract TDCBalancesStore is Redistributable {

    uint256 internal _totalSupply = 0;

    uint256 internal _burnedSupply = 0;

    uint256 internal _burnedMultiplier = 100;
    uint256 internal _rediscributionMultiplier = 50;

    uint256 internal _teachingReward = 32 * 10 ** decimals();
    uint256 internal _initReward = 2 * 10 ** decimals();
    uint256 internal _maxSupply = 256 * 10**6 * 10 ** decimals();

    mapping (address => mapping (address => uint256)) internal _allowances;

    constructor() 
    Redistributable("TechDAOCoin", "TDC") 
    public {}

    function minted() public view returns (uint256) {
        return _totalSupply;
    }

    function burned() public view returns (uint256) {
        return _burnedSupply;
    }

    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }
}


contract TCOIN is TDCBalancesStore {

    constructor() TDCBalancesStore() {}

    function earnForLearning(address mentor, address student, uint score) public returns (bool) {
        // console.log("args", mentor, student, score);
        require(mentor != address(0), "ERC20: mentor address cannot be 0x0");
        require(student != address(0), "ERC20: confirmer address cannot be 0x0");
        require(uint(score) >= 1, "ERC20: score cannot be negative");
        require(uint(score) <= 10, "ERC20: score cannot be more then 10");

        bool mentorWasRecentlyAdded = _addToOwners(mentor);
        bool studentWasRecentlyAdded = _addToOwners(student);

        if (_totalSupply + _initReward >= _maxSupply) {
            return false;
        }

        if(mentorWasRecentlyAdded == true){
            _mint(mentor, _initReward);
            _totalSupply += _initReward;
        }

        if (_totalSupply + _initReward >= _maxSupply) {
            return false;
        }

        if(studentWasRecentlyAdded == true){
            _mint(student, _initReward);
            _totalSupply += _initReward;
        }

        if (_totalSupply + (score * _teachingReward / 10) >= _maxSupply) {
            return false;
        }

        _mint(mentor, (score * _teachingReward / 10));
        _totalSupply += (score * _teachingReward / 10);
        
        return true;
    }


    function transferFrom(address sender, address recipient, uint256 amount) public virtual override(ERC20) returns (bool) {
        uint256 toBurn = amount / _burnedMultiplier;
        uint256 toRediscribute = amount / _rediscributionMultiplier;
        uint256 finalAmount = amount - toBurn - toRediscribute;

        _redistribure(toRediscribute);

        _burn(sender, toBurn);
        _burnedSupply += toBurn;

        _approve(sender, recipient, finalAmount);
        _transfer(sender, recipient, finalAmount);
        _approve(sender, recipient, 0);

        return true;
    }

    function transfer(address recipient, uint256 amount) public virtual override(ERC20) returns (bool) {
        uint256 toBurn = amount / _burnedMultiplier;
        uint256 toRediscribute = amount / _rediscributionMultiplier;
        uint256 finalAmount = amount - toBurn - toRediscribute;

        _redistribure(toRediscribute);

        _burn(_msgSender(), toBurn);
        _burnedSupply += toBurn;

        _transfer(_msgSender(), recipient, finalAmount);

        return true;
    }

 
}



// ma maxymalny limit - 1mld
// można go burnować -> wrzucić na portfel 0x0
// każda zmiana robi event odbierany w społeczności Community jako automatic stacking
// można zarobić za nauke
// można wysłać jako ofertę za nauke
// można wysłać jako płatność za rabat

// abstract contract ERC20Redistributable is ERC20, ERC20Burnable, Ownable {
//     mapping(address => uint256) private _balances;
//     mapping (address => mapping (address => uint256)) private _allowances;
//     mapping(address => bool) _owners;
//     address[] private _addresses;

//     constructor(string memory name_, string memory symbol_)
//         ERC20(name_, symbol_)
//     {}

//     function decimals() public view virtual override(ERC20) returns (uint8) {
//         return 8;
//     }

//     function _getCount() internal virtual returns (uint256 count) {
//         return _addresses.length;
//     }

//     function _redistributeToAll(address sender, uint256 amount)
//         internal
//         virtual
//         returns (bool)
//     {
//         uint256 toSendForOne = amount / _getCount();

//         for (uint256 i = 0; i < _addresses.length; i++) {
//             address user = _addresses[i];
//             _transferForRedistribution(sender, user, toSendForOne);
//         }

//         return true;
//     }

//     function _transferForRedistribution(
//         address sender,
//         address recipient,
//         uint256 redistributionAmount
//     ) internal virtual {
//         require(sender != address(0), "ERC20: transfer from the zero address");
//         require(recipient != address(0), "ERC20: transfer to the zero address");

//         _addToBalance(recipient, redistributionAmount);

//         emit Transfer(sender, recipient, redistributionAmount);
//     }

//     // function _transfer(
//     //     address sender,
//     //     address recipient,
//     //     uint256 amount
//     // ) internal virtual override(ERC20) {
//     //     require(sender != address(0), "ERC20: transfer from the zero address");
//     //     require(recipient != address(0), "ERC20: transfer to the zero address");

//     //     uint256 senderBalance = _balances[sender];

//     //     require(
//     //         senderBalance >= amount,
//     //         "ERC20: transfer amount exceeds balance"
//     //     );

//     //     if (_containsOwner(sender) == false) {
//     //         _addToOwners(sender);
//     //     }

//     //     if (_containsOwner(recipient) == false) {
//     //         _addToOwners(recipient);
//     //     }

//     //     // uint256 toSendForAll = amount / 20;
//     //     uint256 toSendToBurn = amount / 20;
//     //     uint256 toSend = amount - toSendToBurn - toSendForAll;

//     //     _burn(sender, toSendToBurn);

//     //     _addToBalance(recipient, amount);

//     //     emit Transfer(sender, recipient, toSend);

//     //     // _redistributeToAll(sender, toSendForAll);
//     // }

    // function _addToBalance(address recepient, uint256 amount) internal virtual {
    //     _balances[recepient] += amount;
    // }

//     function _addToOwners(address newOwner) internal virtual {
//         if(_containsOwner(newOwner) == false){
//             _addresses.push(newOwner);
//             _owners[newOwner] = true;
//         }
       
//     }

    

//     function _containsOwner(address newOwner) internal virtual returns (bool) {
//         return _owners[newOwner];
//     }

//     // function _beforeTokenTransfer(
//     //     address sender,
//     //     address recipient,
//     //     uint256 amount
//     // ) overwrite(ERC20) internal virtual {

//     //     if(owner == address(0)){
//     //         return false
//     //     }

//     //     if(recipient == address(0)){
//     //         return false
//     //     }
//     //     // uint256 toBurn = amount / 10
//     // }
// }

// allowance -> dajesz pozwolnie na wydanie pieniędzy z Twojego konta
