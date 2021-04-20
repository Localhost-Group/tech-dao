// //SPDX-License-Identifier: Unlicense

// pragma solidity ^0.8.0;

// contract RewardsPolicy {
//     uint256 public mentorEXPRewardforHelping = 10;
//     uint256 public mentorCoinRewardforHelping = 1000;

//     uint256 public mentorEXPRewardforPublishingMaterials = 50;
//     uint256 public mentorCoinRewardforPublishingMaterials = 100;

//     uint256 public studentEXPRewardforAskingForHelp = 1;
//     uint256 public studentCoinRewardforAskingForHelp = 0;

//     uint256 public studentEXPRewardforScoringMaterials = 3;
//     uint256 public studentCoinRewardforPublishing = 25;

//     uint256 public redistributionMultiplier = 0.02;
//     uint256 public burnedMultiplier = 0.01;
// }

// contract Rewarder is Ownable{
//     constructor() Ownable(){}

//     // mentor publikuje artykuł, kurs, video
//     forPublishingValue(uint256 publicationNonce, address mentor){
//         // mentor dostaje mentorCoinRewardforPublishingMaterials coinów
//         // pobierany publication po nonce, aby sprawdzić tagi technologiczne (adresy przypisanych technologii do publikacji)
//         // tagi technologiczne dzielą mentorEXPRewardforPublishingMaterials równo na siebie
//     }

//     // uczeń/mentor ocenia
//     forScoreValue(uint256 publicationNonce, address student){}

//     // mentor pomaga uczniowi
//     forHelpingStudents(address mentor, address student){}

// }