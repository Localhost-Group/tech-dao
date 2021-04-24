// co powienien robić kontrakt TDC
// TECH DAO Coin - reward token społeczności

// 1. start

// powinien zacząć z volumenem 0 wytworzonego TDC
// posiada 9 miejsc po przecinku
// powinno go być max 256 * 10 ^ 9 i nie można wytworzyć więcej
// powinien wytworzyć tokeny o wolumenie 1,2 * 10e-3 % całego wolumenu i przesłać je na contrakt do airdropów

// 2. airdropy

// powinien zawierać adres na którym jest ukryte 1,2 * 10e-3 % całego wolumenu
// od podpięcia kontaktu do sieci co miesiąc powinno schodzić 1/36 całej wartości wolumenu i powinna być rozsyłana do wszystkich osób posiadających TDC przez kolejne 3 lata


// 3. przesył tokenów

// - podczas transferu powienien przeprowadzać poniższe rozdzielenie wolumenu

// - 2% wolumenu transferu powienien zostać rozdany dla wszystkich włascicieli TDC
// - 1% wolumenu transferu powinno zostać palone - wysyłane na portfel 0x0
// - 97% wolumenu transferu powinno trafić do odbiorcy


// 4. wydobywanie poprzez pomaganie innym

// - zanim pomoc się odbędzie
// jeśli jest wydobyte max supply (256 * 10^9) nagroda w tdc nie jest przyznawana

// w kontrakcie jest jakiś zmienny volumen zwany student reward, który jest przyznawany studentom za publikację ogłoszenia z potrzebą pomocy
// w kontrakcie jest jakiś zmienny volumen zwany mentor reward, który jest przyznawany jest za skuteczną pomoc w ramach ogłoszenia liczony w zależności od tego ile zostało do wykopania z kontraktu
// funkcja do liczenia mentor reward działa następująco = mentor reward = student rating * (total supply - minted supply) * 2,56 * 10e-9
// funkcja do liczenia student reward działa następująco = student reward = (total supply - minted supply) * 2,56 * 10e-11

// - jeśli pomoc się odbyła to 
// po uzyskanej pomocy student może ocenic mentora w skali od 0 do 10 i wtedy student otrzymuje student reward
// po udzieleniu pomocy mentor otrzymuje (mentor reward) * int(skala) / 10

// - jeśli pomoc się nie odbyła się lub została oceniona na 0 
// zlecenie pomocy jest dalej otwarte, nie następuje wydobycie tokenów


// 4. wydobywanie poprzez publikację materiałów
// - todo
