const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
DROP TABLE IF EXISTS wonders CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS wonders_categories CASCADE;
DROP TABLE IF EXISTS descriptions CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE IF NOT EXISTS wonders (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR ( 255 ) UNIQUE
);

CREATE TABLE IF NOT EXISTS wonders_categories (
wonder_id INTEGER REFERENCES wonders (id),
category_id INTEGER REFERENCES categories (id),
UNIQUE (wonder_id, category_id)
);

CREATE TABLE IF NOT EXISTS descriptions (
wonder_id INTEGER REFERENCES wonders (id) UNIQUE,
description VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS countries (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS locations (
wonder_id INTEGER REFERENCES wonders (id) UNIQUE,
country_id INTEGER REFERENCES countries (id),
address VARCHAR ( 255 )
);


INSERT INTO wonders (name)
VALUES 
('Colosseum'), 
('Acropolis & Parthenon'),
('Eiffel Tower'),
('Matterhorn'),
('Blue Lagoon'),
('Leaning Tower of Pisa'),
('Venetian Canals'),
('St. Peter’s Basilica'),
('Temple of Hephaestus'),
('Mont-Saint-Michel'),
('Palace of Versailles'),
('Stonehenge'),
('Edinburgh Castle'),
('Neuschwanstein Castle'),
('Cologne Cathedral'),
('Sagrada Família'),
('Alhambra Palace '),
('Charles Bridge'),
('Hungarian Parliament '),
('Hermitage Museum'),
('Jerónimos Monastery'),
('Bran Castle'),
('Gullfoss Waterfall'),
('Thingvellir National Park'),
('Geiranger Fjord'),
('Aletsch Glacier '),
('Meteora'),
('Plitvice Lakes National Park'),
('Cliffs of Moher'),
('Eisriesenwelt Ice Caves'),
('Lapland Wilderness'),
('Tara River Canyon'),
('Teide National Park'),
('Berat Castle'),
('Our Lady of Meritxell Basilica'),
('Mir Castle'),
('Grand Place'),
('Stari Most'),
('Rila Monastery'),
('Kourion'),
('The Little Mermaid'),
('Tallinn Old Town'),
('Gauja National Park & Turaida Castle'),
('Trakai Island Castle'),
('Lake Bled'),
('Vianden Castle'),
('Orheiul Vechi'),
('Ohrid Lake and Ancient Theatre'),
('Kinderdijk Windmills'),
('Wieliczka Salt Mine'),
('Spiš Castle'),
('Gamla Stan ');

INSERT INTO categories (name)
VALUES 
('Ancient'),
('Man-Made'),
('Mountain'),
('Nature');

INSERT INTO wonders_categories (wonder_id, category_id)
VALUES 
('1', '1'),
('1', '2'),
('2', '1'),
('2', '2'),
('3', '2'),
('4', '4'),
('4', '3'),
('5', '4'),
('6', '2'),
('7', '2'),
('8', '2'),
('9', '1'),
('9', '2'),
('10', '2'),
('11', '2'),
('12', '1'),
('12', '2'),
('13', '2'),
('14', '2'),
('15', '2'),
('16', '2'),
('17', '2'),
('18', '2'),
('19', '2'),
('20', '2'),
('21', '2'),
('22', '2'),
('23', '4'),
('24', '4'),
('25', '4'),
('26', '4'),
('27', '4'),
('28', '4'),
('29', '4'),
('30', '4'),
('31', '4'),
('32', '4'),
('33', '4'),
('34', '2'),
('35', '2'),
('36', '2'),
('37', '2'),
('38', '2'),
('39', '2'),
('40', '1'),
('41', '1'),
('42', '2'),
('43', '2'),
('43', '4'),
('44', '2'),
('45', '4'),
('46', '2'),
('47', '2'),
('48', '1'),
('48', '4'),
('49', '2'),
('50', '2'),
('51', '2'),
('52', '2');

INSERT INTO descriptions (wonder_id, description)
VALUES 
('1', 'Gladiatorial arena and symbol of Imperial Rome'),
('2', 'Heart of ancient Greek civilization'),
('3', 'The iron symbol of romance and innovation'),
('4', 'One of the Alps’ most iconic peaks'),
('5', 'Geothermal spa in lava fields'),
('6', 'Iconic freestanding bell tower.'),
('7', 'A unique floating city with centuries-old canals.'),
('8', 'Largest church in the world.'),
('9', 'One of the best-preserved ancient temples.'),
('10', 'Medieval island abbey.'),
('11', 'Royal palace epitomizing Baroque extravagance.'),
('12', 'Megalithic monument shrouded in mystery.'),
('13', 'Historic fortress atop Castle Rock.'),
('14', 'Fairytale castle in the Alps.'),
('15', 'Towering Gothic masterpiece.'),
('16', 'Gaudí’s surreal cathedral.'),
('17', 'Moorish fortress and gardens.'),
('18', '14th-century stone bridge with statues.'),
('19', 'Neo-Gothic masterpiece on the Danube.'),
('20', 'One of the largest and oldest museums in the world.'),
('21', 'Manueline-style masterpiece.'),
('22', 'Dracula’s Castle.'),
('23', 'Majestic multi-tiered cascade.'),
('24', 'Tectonic rift valley and historical site.'),
('25', 'UNESCO-listed fjord with waterfalls.'),
('26', 'Longest glacier in the Alps.'),
('27', 'Giant rock pillars topped by monasteries.'),
('28', 'Tiered lakes and waterfalls.'),
('29', 'Towering cliffs along the Atlantic coast.'),
('30', 'World’s largest ice cave system.'),
('31', 'Forests, tundra, and Northern Lights views.'),
('32', 'One of the deepest gorges in Europe.'),
('33', 'Volcanic landscapes on the Canary Islands.'),
('34', 'Medieval fortress overlooking the UNESCO-listed city of a thousand windows.'),
('35', 'Iconic Romanesque sanctuary and national shrine.'),
('36', 'A majestic Gothic-Renaissance fortress listed as UNESCO World Heritage.'),
('37', 'Stunning central square framed by Gothic guildhalls.'),
('38', 'Iconic 16th-century Ottoman bridge spanning the Neretva River.'),
('39', '10th-century Eastern Orthodox monastery nestled in the Rila Mountains.'),
('40', 'Ancient Greco‑Roman theater perched on a cliff overlooking the Mediterranean.'),
('41', 'Beloved bronze statue inspired by Hans Christian Andersen.'),
('42', 'Exceptionally preserved medieval city center.'),
('43', 'Scenic forests with medieval heritage.'),
('44', 'Picturesque red-brick fortress on Lake Galvė.'),
('45', 'Alpine lake with church-topped islet.'),
('46', 'Panoramic hilltop medieval citadel.'),
('47', 'Ancient monastery complex carved into limestone cliffs.'),
('48', 'Historic lakeside city and UNESCO site.'),
('49', 'Array of historic windmills emblematic of Dutch water management.'),
('50', 'Underground cavern complex carved from salt.'),
('51', 'One of Central Europe’s largest castle ruin complexes.'),
('52', 'Enchanting medieval old town center.');


INSERT INTO countries (name)
VALUES 
('Albania'),
('Andorra'),
('Armenia'),
('Austria'),
('Azerbaijan'),
('Belarus'),
('Belgium'),
('Bosnia and Herzegovina'),
('Bulgaria'),
('Croatia'),
('Cyprus'),
('Czech Republic'),
('Denmark'),
('Estonia'),
('Finland'),
('France'),
('Georgia'),
('Germany'),
('Greece'),
('Hungary'),
('Iceland'),
('Ireland'),
('Italy'),
('Kosovo'),
('Latvia'),
('Liechtenstein'),
('Lithuania'),
('Luxembourg'),
('Macedonia'),
('Malta'),
('Moldova'),
('Monaco'),
('Montenegro'),
('Netherlands'),
('Norway'),
('Poland'),
('Portugal'),
('Romania'),
('Russia'),
('San Marino'),
('Serbia'),
('Slovakia'),
('Slovenia'),
('Spain'),
('Sweden'),
('Switzerland'),
('Turkey'),
('Ukraine'),
('United Kingdom');

INSERT INTO locations (wonder_id, country_id, address)
VALUES 
('1', '23', 'Rome'),
('2', '19', 'Athens'),
('3', '16', 'Paris'),
('4', '46', 'Zermatt'),
('5', '21', 'Grindavik'),
('6', '23', 'Pisa'),
('7', '23', 'Venice'),
('8', '23', 'Rome'),
('9', '19', 'Athens'),
('10', '16', 'Normandy'),
('11', '16', 'Versailles'),
('12', '49', 'England'),
('13', '49', 'Scotland'),
('14', '18', 'Bavaria'),
('15', '18', 'Cologne'),
('16', '44', 'Barcelona'),
('17', '44', 'Granada'),
('18', '12', 'Prague'),
('19', '20', 'Budapesht'),
('20', '39', 'St. Petersburg'),
('21', '37', 'Lisbon'),
('22', '38', 'Transylvania'),
('23', '21', 'Canyon of the Hvítá river'),
('24', '21', 'Southern Region'),
('25', '35', 'South-More'),
('26', '46', 'Swiss Alps'),
('27', '19', 'Trikala'),
('28', '10', 'Lika-Senj County'),
('29', '22', 'Southwestern edge of the Burren region in County Clare'),
('30', '4', 'Werfen'),
('31', '15', 'Kaldoaivi Wilderness Area'),
('32', '33', 'Tara river'),
('33', '44', 'Tenerife'),
('34', '1', 'Berat'),
('35', '2', 'Meritxell'),
('36', '6', 'Grodno'),
('37', '7', 'brussels'),
('38', '8', 'Mostar'),
('39', '9', 'Rila Mountains'),
('40', '11', 'Southwestern coast of the island of Cyprus'),
('41', '13', 'Copenhagen'),
('42', '14', 'Tallinn'),
('43', '25', 'Sigulda'),
('44', '27', 'Lake Galvė'),
('45', '43', 'Julian Alps'),
('46', '28', 'Vianden'),
('47', '31', 'Orheiul Vechi Cultural and Natural Reserve'),
('48', '29', 'Ohrid'),
('49', '34', 'South Holland'),
('50', '36', 'Wieliczka'),
('51', '42', 'Zehra'),
('52', '45', 'Stockholm');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
