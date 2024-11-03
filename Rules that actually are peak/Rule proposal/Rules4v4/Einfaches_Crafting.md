# Ladungstypen
Ladung I. = Raeumliche Struktur
Ladung II. = Elektrische Dichte
Ladung III. = Informationsdichte
Ladung IV. = Magische Dichte
Ladung V. = Ideale Struktur
Angriffswert (normaler Schadenstyp) =>
    1 Angriffswert -> Ladung I. 1
Angriffswert (elektrischer Schadenstyp) =>
    1 Angriffswert -> Ladung II. 1
Angriffswert (magie) =>
    1 Angriffswert -> Ladung IV. 1
Angriffswert (gift) =>
    1 Angriffswert -> Ladung I. -1 & Ladung II. -1 & Ladung III. 1
Angriffswert (gleisend) =>
    2 Angriffswert -> Ladung II. 1 & Ladung III. 2
Angriffswert (hitze) =>
    1 Angriffswert -> Ladung I. 1 & Ladung II. 1 & Ladung III. 1
Angriffswert (kaelte) =>
    1 Angriffswert -> Ladung I. -1 & Ladung II. -1 & Ladung III. -1
Ladungen koennen auch in Angriffswert der verschiedenen Typen umgewandelt werden.
Gibt es mehrere Ladungswerte eines Ladungstypen werden hinzugefuegte Ladungen gleichmaesig aufgeteilt. (deprecated)
Ist der Ladungswert groesser als 6 gilt eine Ladung als ueberladen.
Ist eine Ladung Ueberladen wird die Ladung entladen.

# Materialien
## Beispiel
### Holz
Ladung I. 4
-> Entlaedt Ladung I. - 5 Ladung I.
Ladung II. 0
-> Entlaedt Ladung II. uebrige Ladung wird in Ladung I. umgewandelt.
Ladung III. 