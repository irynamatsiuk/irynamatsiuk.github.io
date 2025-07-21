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
description VARCHAR ( 1000 )
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
('Leaning Tower of Pisa'),
('Venice Canals'),
('Dolomites'),
('Blue Grotto'),
('Eiffel Tower'),
('Palace of Versailles'),
('Mont-Saint-Michel'),
('Verdon Gorge'),
('Calanques National Park'),
('Stonehenge'),
('Tower of London'),
('Giant’s Causeway'),
('Snowdonia National Park'),
('Loch Ness'),
('Neuschwanstein Castle'),
('Brandenburg Gate'),
('Cologne Cathedral'),
('Black Forest'),
('Saxon Switzerland National Park'),
('Acropolis of Athens'),
('Delphi'),
('Meteora Monasteries'),
('Samaria Gorge '),
('Santorini Caldera'),
('Plitvice Lakes National Park'),
('Dubrovnik Old Town'),
('Diocletian’s Palace'),
('Krka National Park'),
('Matterhorn'),
('Jungfraujoch'),
('Lake Geneva'),
('Rhine Falls'),
('Sagrada Família'),
('Alhambra'),
('Santiago de Compostela Cathedral'),
('Teide National Park'),
('Picos de Europa'),
('Caminito del Rey'),
('Rio Tinto');


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
('2', '2'),
('3', '2'),
('4', '4'),
('4', '3'),
('5', '4'),
('6', '2'),
('7', '2'),
('8', '2'),
('9', '4'),
('10', '4'),
('11', '2'),
('12', '2'),
('13', '4'),
('14', '3'),
('14', '4'),
('15', '4'),
('16', '2'),
('17', '2'),
('18', '2'),
('19', '4'),
('20', '4'),
('21', '1'),
('21', '2'),
('22', '1'),
('23', '2'),
('23', '4'),
('24', '4'),
('25', '4'),
('26', '4'),
('27', '2'),
('28', '1'),
('29', '4'),
('30', '3'),
('30', '4'),
('31', '3'),
('31', '4'),
('32', '4'),
('33', '4'),
('34', '2'),
('35', '2'),
('36', '2'),
('37', '4'),
('38', '4'),
('39', '4'),
('40', '4');

INSERT INTO descriptions (wonder_id, description)
VALUES 
('1', 'A majestic amphitheater from ancient Rome that hosted gladiatorial contests, spectacles, and public events. It is an enduring symbol of architectural innovation—with its arches, vaults, and tiered seating still inspiring.'),
('2', 'Famous for its unintended tilt, this bell tower in the Piazza dei Miracoli has captivated visitors for centuries due to its unexpected lean and elegant Romanesque design.'),
('3', 'A unique urban waterway system built on stilts and islands, Venice’s canals define its character by blending Gothic palaces, daily gondolas, and atmospheric bridges over shimmering water'),
('4', 'Towering pastel-colored peaks in northeastern Italy, the Dolomites are perfect for skiing, via ferrata, climbing, and alpine hikes—offering dramatic vistas and UNESCO-listed geology.'),
('5', 'This sea cave is illuminated by an otherworldly azure light caused by sunlight filtering through seawater—an ethereal experience best viewed by small boat on a sunny day.'),
('6', 'Gustave Eiffel’s iron lattice tower built in 1889 for the World’s Fair became Paris’s signature silhouette. Rising 330 m high, it offers breathtaking views across the Seine and city skyline.'),
('7', 'The epitome of French Baroque architecture and royal extravagance, Versailles features mirrored halls, painted ceilings, and meticulously manicured gardens reflecting 17th-century power.'),
('8', 'A dramatic Gothic abbey perched upon a rocky tidal island. Its silhouette emerges from the sea at high tide, surrounded by winding passages and medieval ramparts.'),
('9', 'Known as Europe’s “Grand Canyon,” this deep river canyon cuts through limestone cliffs with a vibrant turquoise river—ideal for kayaking, hiking, and scenic viewpoints.'),
('10', 'Steep limestone cliffs plunge into crystal-clear turquoise waters, creating secluded coves and breathtaking hiking paths along the Mediterranean coast.'),
('11', 'A prehistoric monument of massive standing stones arranged in a circular layout. Its origins and purpose remain a topic of fascination, tied to ritualistic and astronomical theories.'),
('12', 'This historic fortress on the Thames is known for its tales of intrigue, royal crowns, Beefeaters, and the famous ravens. It has served as a palace, prison, and armory.'),
('13', 'A striking natural spectacle of over 40,000 hexagonal basalt columns formed by ancient volcanic activity. Legend has it the landscape was built by giants—adding to its mystique.'),
('14', 'Home to Mount Snowdon and glacial lakes, Snowdonia features dramatic mountain scenery, rugged terrain, Welsh heritage, and outdoor adventure.'),
('15', 'A deep freshwater loch famous for the myth of the Loch Ness Monster. Surrounded by misty hills and forests, it’s a dreamy mix of legend and beautiful wilderness.'),
('16', 'King Ludwig II’s romantic 19th-century castle overlooks alpine meadows and lakes. Its fairy-tale turrets inspired Disney and continues to enchant visitors.'),
('17', 'Once a symbol of division—now a symbol of reunification—this neoclassical gate marks the heart of Berlin and has witnessed pivotal moments in European history.'),
('18', 'A soaring masterpiece of Gothic architecture boasting twin spires that dominate the skyline. Inside, the stained-glass windows and shrine of the Three Kings dazzle.'),
('19', 'Dense evergreen woodlands, storybook villages, cuckoo clocks, and traditional farms against a backdrop of rolling hills and fairy-tale charm characterize this enchanting region.'),
('20', 'An otherworldly landscape of dramatic sandstone towers, deep gorges, and dense forests—ideal for rock climbing, hiking, and scenic riverside walks.'),
('21', 'An ancient citadel perched above the city, crowned by the Parthenon, which celebrates the height of classical Greek architecture and became a symbol of democracy.'),
('22', 'Once regarded as the spiritual center of the ancient Greek world, Delphi features temple ruins, ancient theaters, and oracle precincts set on a mountainside with sweeping views.'),
('23', 'A collection of Eastern Orthodox monasteries perched on sandstone pillars. These spiritual structures cling to cliffs, offering both historical insight and dramatic beauty.'),
('24', 'A spectacular 16 km trek through one of Europe’s longest gorges, winding between limestone walls and allowing hikers to emerge at a coastal village.'),
('25', 'A sunken volcanic crater encircled by dramatic cliffs, whitewashed villages, and sunsets over the Aegean—ranked among the world’s most stunning island vistas.'),
('26', 'A chain of terraced lakes joined by waterfalls in lush forest surroundings. Wooden paths let you stroll over turquoise pools and rushing cascades.'),
('27', 'A UNESCO-listed medieval walled city famed for its limestone streets, orange rooftops, and fortress walls that offer panoramic Adriatic views.'),
('28', 'A remarkably preserved ancient Roman palace built by Emperor Diocletian. Today, its ruins house shops, cafes, and residences amid stone courtyards.'),
('29', ' Home to a series of waterfalls and emerald-green pools, this park invites you to swim beneath cascades and explore historic monasteries in a tranquil setting.'),
('30', 'One of the most photographed mountains in the world, with its sharp pyramid peak rising dramatically above alpine valleys—an iconic symbol of the Swiss Alps.'),
('31', 'A train ride to Europe’s highest railway station (3,454 m), offering panoramic snowfields, ice sculptures, and 360-degree mountain views.'),
('32', 'A vast freshwater lake bordered by vineyards, historic towns, and the city of Geneva. The shoreline blends urban culture with natural beauty.'),
('33', 'Europe’s largest waterfall by volume, where turbulent water thunders over the edge of the Rhine River—viewable from platforms and boat tours.'),
('34', 'A still-unfinished masterpiece by Antoni Gaudí, this basilica combines Gothic and Art Nouveau forms with fantastical shapes, intricate façades, and soaring towers. Construction began in 1882 and continues today, making it one of the longest-running architectural projects in the world.'),
('35', 'A stunning Moorish palace and fortress complex that dates back to the Nasrid dynasty in the 13th century. Intricately carved arches, tranquil courtyards, and reflecting pools make the Alhambra a masterpiece of Islamic architecture in Europe.'),
('36', 'The reputed burial site of Saint James and the final destination of the Camino de Santiago pilgrimage. Its Baroque façade, Romanesque interior, and religious significance make it one of Spain’s most important Christian landmarks.'),
('37', 'Home to Mount Teide, Spain’s highest peak and an active volcano, this national park offers a surreal, Mars-like volcanic landscape. It’s also a prime spot for stargazing, with some of the clearest skies in Europe.'),
('38', 'A rugged mountain range with deep gorges, green valleys, and limestone peaks. It’s a paradise for hikers and home to traditional villages, bears, and rare birds.'),
('39', 'A narrow cliffside path originally built for hydroelectric workers, now restored for adventurers. The trail winds along dramatic gorges and over glass walkways with sheer drops below.'),
('40', 'A river known for its blood-red hue, caused by high iron and acidic content due to ancient mining. The landscape is so otherworldly that NASA has studied it to understand Mars-like environments.');

INSERT INTO countries (name)
VALUES 
('Italy'),
('France'),
('United Kingdom'),
('Germany'),
('Greece'),
('Croatia'),
('Switzerland'),
('Spain');

INSERT INTO locations (wonder_id, country_id, address)
VALUES 
('1', '1', 'Rome'),
('2', '1', 'Pisa'),
('3', '1', 'Venice'),
('4', '1', 'Italian Alps'),
('5', '1', 'Capri'),
('6', '2', 'Paris'),
('7', '2', 'Versailles'),
('8', '2', 'Normandy'),
('9', '2', 'Provence'),
('10', '2', 'near Marseille'),
('11', '3', 'England'),
('12', '3', 'England'),
('13', '3', 'Northern Ireland'),
('14', '3', 'Wales'),
('15', '3', 'Scotland'),
('16', '4', 'Bavaria'),
('17', '4', 'Berlin'),
('18', '4', 'Cologne'),
('19', '4', 'Baden-Württemberg'),
('20', '4', 'Saxony'),
('21', '5', 'Athens'),
('22', '5', 'Central part'),
('23', '5', 'Thessaly'),
('24', '5', 'Crete'),
('25', '5', 'Cyclades'),
('26', '6', 'Lika-Senj County'),
('27', '6', 'Dubrovnic'),
('28', '6', 'Split'),
('29', '6', 'Dalmatia'),
('30', '7', 'Swiss Alps'),
('31', '7', 'between the summits of Mathildespitze (west) and Sphinx (east)'),
('32', '7', 'Geneva'),
('33', '7', 'border between the cantons of Schaffhausen (SH) and Zurich (ZH)'),
('34', '8', 'Barcelona'),
('35', '8', 'Granada'),
('36', '8', 'Galicia'),
('37', '8', 'Tenerife, Canary Islands'),
('38', '8', 'Asturias, Cantabria, and Castile and León'),
('39', '8', 'Andalusia'),
('40', '8', 'Andalusia');
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
