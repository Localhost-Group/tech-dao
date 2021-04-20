//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Offers/HelpOfferUtils.sol";
import "./ContractsRegistry.sol";
import "./TCOIN.sol";
// helpOffer

// oferta pomocy to
// - adres wystawiającego studenta
// - opis techologii w zakresie problemu
// - opis tekstowy problemu
// - link do problemu
// - status active

// propozycja pomocy do oferty to
// - mapping adresow mentorów do ich expa w tej technologii
// - status active

// przyjęcie pomocy przez studenta to
// - zmiana statusu oferty pomocy na HELPING


// zatwierdzenie pomocy to
// - ocena od 0 do 100 jak student ocenił wartość pomocy mentora
// - zmiana statusu oferty pomocy na HELPED
// - rozdanie coinów

contract HelpOffersMarket {
    mapping(address => HelpStudentOffering) private offers;
    address[] private offerents;
    mapping(address => mapping(address => uint)) private mentors;

    ContractsRegistry private registry;

    event OfferAdded(address indexed _from, string description, string link);

    constructor( address _reg ) {
        registry = ContractsRegistry(_reg);
     }

    // student
    function addNewOffer(string memory description, string memory link, address[] memory technologies) 
        public payable returns (bool) {
        // jeśli coś z technologies nie należy do tokenów exp to wywalać błąd
        require(msg.sender != address(0), "ERC20: you cannot bid from 0x0");
 
        offerents.push(msg.sender);
        offers[msg.sender] = HelpStudentOffering(msg.sender, description, link, technologies, HelpOfferStatus.ACTIVE);
        emit OfferAdded(msg.sender, description, link);
        return true;
    }

     // student
    function confirmMentor(address mentor) public returns (bool) {
        require(offers[msg.sender].student != address(0), "ERC20: cannot confirm offer which not exist");
        require(checkOffering(msg.sender, mentor) != 1, "ERC20: mentor does not start in this offer");
        require(offers[msg.sender].status != HelpOfferStatus.ACTIVE, "ERC20: cannot confirm offer is already in progress");

        mentors[msg.sender][mentor] = 2; // 2 oznacza, że mentor zostaw wybrany
        offers[msg.sender].status = HelpOfferStatus.HELPING;
        
        return true;
    }

     // student
    function rewardMentor(address mentor, uint score) public payable returns (bool){
        require(offers[msg.sender].student != address(0), "ERC20: cannot reward mentor on offer which not exist");
        require(checkOffering(msg.sender, mentor) != 2, "ERC20: mentor does not help in this offer");
        require(offers[msg.sender].status != HelpOfferStatus.HELPING, "ERC20: offer not in progress");
        require(score <= 0, "ERC20: score cannot be negative");

        mentors[msg.sender][mentor] = 0; // 0 oznacza, że mentor jest status inital
        offers[msg.sender].status = HelpOfferStatus.HELPING;

        // TCoin.earnForLearning(mentor, msg.sender, score);
        
        return true;
    }

    function cancelOffer() public payable returns (bool) {
        require(offers[msg.sender].student != address(0), "ERC20: cannot cancel offer which not exist");
        offers[msg.sender].status = HelpOfferStatus.CANCELED;
        return true;
    }

    // student + mentor
    function getOfferents() public view returns (address[] memory _offerents){
        return offerents;
    }

    function getOffer(address student) public
        view returns (
            address _student,
            string memory _description,
            string memory _link,
            address[] memory _technologies,
            HelpOfferStatus _status
        ) {
            return (offers[student].student, offers[student].description, offers[student].link, offers[student].technologies, offers[student].status);
        }


    // mentor 
    function checkOffering(address student, address mentor) public view returns (uint){
        return mentors[student][mentor];
    }

    function makeOfferBid(address student) public payable returns (bool) {
        require(msg.sender != student, "ERC20: you cannot bid your own offer");

        mentors[student][msg.sender] = 1; // 1 oznacza, że mentor sie zgłosił
        return true;
    }
   

    function checkBuyers() public returns (bool) {
        
        // canceled = true;
        return true;
    }

    // function testSendCoins(address mentor, address student) public payable returns (bool){
    //     TCOIN(registry.coinAddress()).earnForLearning(mentor, student, 10);
    //     return true;
    // }

}
