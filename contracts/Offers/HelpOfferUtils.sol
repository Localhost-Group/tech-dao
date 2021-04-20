//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

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

enum HelpOfferStatus {
    ACTIVE,
    HELPING,
    HELPED,
    CANCELED
}

struct HelpStudentOffering {
    address student;
    string description;
    string link;
    address[] technologies;
    HelpOfferStatus status;
}

