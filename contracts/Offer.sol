//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Oferta to mapping X TCOIN to string (opis) to user to opt 'hidden value' - np kupon
// można wystawić ofertę za ileś TCOINów
// można wystawić udupić swoją ofertę
// można wystawić wykupić ofertę za ileś TCOINow
// mozna opisać swoją ofertę
// można jej nadać wartość w fiacie / w pln/usd
// można określić jej ilość
// można określić jej hidden value - string dostępny po wykupie

contract Offer {
    uint256 private _nonce;
    address author;
    uint256 price;

    string fiatPrice;
    string description;
    uint256 amount;

    string private _hiddenValue;

    constructor(
        uint256 nonce,
        address _author,
        uint256 _price,
        string memory _fiatPrice,
        string memory _description,
        uint256 _amount,
        string memory value
    ) {
        _nonce = nonce;
        author = _author;
        description = _description;
        fiatPrice = _fiatPrice;
        price = _price;
        amount = _amount;
        _hiddenValue = value;
    }

    function getOfferStats()
        public
        view
        returns (
            address a,
            string memory d,
            string memory f,
            uint256 p,
            uint256 a_
        )
    {
        return (author, description, fiatPrice, price, amount);
    }

    function getHiddenValue() public view returns (string memory v) {
        return _hiddenValue;
    }
}
