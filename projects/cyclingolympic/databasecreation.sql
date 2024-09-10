-- Creating a database of 6 tables and inserting values in tables

DROP DATABASE IF EXISTS cycling2020olympic;

CREATE DATABASE cycling2020olympic;

USE cycling2020olympic;

CREATE TABLE discipline (
    id VARCHAR(2) NOT NULL,
    name VARCHAR(20) NOT NULL,
    CONSTRAINT PK_discipline PRIMARY KEY (id)
);

INSERT INTO discipline
(id, name)
VALUES
('d1', 'Road cycling'),
('d2', 'Mountain biking'),
('d3', 'BMX');

CREATE TABLE medal (
    id VARCHAR(2) NOT NULL,
    class VARCHAR(20) NOT NULL,
    CONSTRAINT PK_medal PRIMARY KEY (id)
);

INSERT INTO medal
(id, class)
VALUES
('m1', 'gold'),
('m2', 'silver'),
('m3', 'bronze');

CREATE TABLE event (
    id VARCHAR(3) NOT NULL,
    name VARCHAR(30) NOT NULL,
    discipline_id VARCHAR(2),
    CONSTRAINT PK_event PRIMARY KEY (id),
    CONSTRAINT FK_discipline FOREIGN KEY (discipline_id)
        REFERENCES discipline (id)
);

INSERT INTO event
(id, name, discipline_id)
VALUES
('e01', 'Freestyle Men', 'd3'),
('e02', 'Freestyle Women', 'd3'),
('e03', 'Racing Men', 'd3'),
('e04', 'Racing Women', 'd3'),
('e05', 'Mountain biking Men', 'd2'),
('e06', 'Mountain biking Women', 'd2'),
('e07', 'Mens road race', 'd1'),
('e08', 'Mens time trial', 'd1'),
('e09', 'Womens road race', 'd1'),
('e10', 'Womens time trial', 'd1');

CREATE TABLE nation (
    id VARCHAR(4) NOT NULL,
    country VARCHAR(30) NOT NULL,
    CONSTRAINT PK_nation PRIMARY KEY (id)
);

INSERT INTO nation
(id, country)
VALUES
('n01', 'Algeria'),
('n02', 'Argentina'),
('n03', 'Australia'),
('n04', 'Austria'),
('n05', 'Azerbaijan'),
('n06', 'Belarus'),
('n07', 'Belgium'),
('n08', 'Brazil'),
('n09', 'Great Britain'),
('n10', 'Netherlands'),
('n11', 'Switzerland'),
('n12', 'Denmark'),
('n13', 'United States'),
('n14', 'Germany'),
('n15', 'Italy'),
('n16', 'Canada'),
('n17', 'Slovenia'),
('n18', 'Ecuador'),
('n19', 'New Zealand'),
('n20', 'Colombia'),
('n21', 'Belgium'),
('n22', 'Japan'),
('n23', 'Malaysia'),
('n24', 'Ukraine'),
('n25', 'Venezuela'),
('n26', 'France'),
('n27', 'ROC'),
('n28', 'Hong Kong'),
('n29', 'Spain'),
('n30', 'Luxembourg');

CREATE TABLE competitor (
    id VARCHAR(3),
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    nation_id VARCHAR(30) NOT NULL,
    CONSTRAINT PK_competitor PRIMARY KEY (id),
    CONSTRAINT FK_competitor FOREIGN KEY (nation_id)
        REFERENCES nation (id)
);

INSERT INTO competitor (
id, first_name, last_name, nation_id)
VALUES
('c01', 'Richard', 'Carapaz', 'n18'),
('c02', 'Primož', 'Roglič', 'n17'),
('c03', 'Anna', 'Kiesenhofer', 'n04'),
('c04', 'Annemiek', 'Vleuten van', 'n10'),
('c05', 'Wout', 'Aert  van', 'n07'),
('c06', 'Tom', 'Dumoulin', 'n10'),
('c07', 'Marlen', 'Reusser', 'n11'),
('c08', 'Tadej', 'Pogačar', 'n17'),
('c09', 'Rohan', 'Dennis', 'n03'),
('c10', 'Elisa', 'Longo Borghini', 'n15'),
('c11', 'Anna', 'Breggen van der ', 'n10'),
('c12', 'Tom', 'Pidcock', 'n09'),
('c13', 'Jolanda', 'Neff', 'n11'),
('c14', 'Mathias', 'Flückiger', 'n11'),
('c15', 'Sina','Frei', 'n11'),
('c16', 'David', 'Valero', 'n29'),
('c17', 'Linda', 'Indergand', 'n11'),
('c18', 'Niek', 'Kimmann', 'n10'),
('c19', 'Logan', 'Martin', 'n03'),
('c20', 'Beth', 'Shriever', 'n09'),
('c21', 'Charlotte', 'Worthington', 'n09'),
('c22', 'Kye', 'Whyte', 'n09'),
('c23', 'Daniel', 'Dhers', 'n25'),
('c24', 'Mariana', 'Pajón', 'n20'),
('c25', 'Hannah', 'Roberts', 'n13'),
('c26', 'Carlos', 'Ramírez', 'n20'),
('c27', 'Declan', 'Brooks', 'n09'),
('c28', 'Merel', 'Smulders', 'n10'),
('c29', 'Nikita', 'Ducarroz', 'n11');

CREATE TABLE winner (
competitor_id VARCHAR(3),
event_id VARCHAR(3) NOT NULL,
medal_id VARCHAR(2) NOT NULL,
CONSTRAINT FK_competitor_winner FOREIGN KEY (competitor_id) REFERENCES competitor(id),
CONSTRAINT FK_event_winner FOREIGN KEY (event_id) REFERENCES event(id),
CONSTRAINT FK_medal_winner FOREIGN KEY (medal_id) REFERENCES medal(id)
);

INSERT INTO winner (
competitor_id, event_id, medal_id)
VALUES
('c01', 'e07', 'm1'),
('c05', 'e07', 'm2'),
('c08', 'e07', 'm3'),
('c02', 'e08', 'm1'),
('c06', 'e08', 'm2'),
('c09', 'e08', 'm3'),
('c03', 'e09', 'm1'),
('c04', 'e09', 'm2'),
('c10', 'e09', 'm3'),
('c04', 'e10', 'm1'),
('c07', 'e10', 'm2'),
('c11', 'e10', 'm3'),
('c12', 'e05', 'm1'),
('c14', 'e05', 'm2'),
('c16', 'e05', 'm3'),
('c13', 'e06', 'm1'),
('c15', 'e06', 'm2'),
('c17', 'e06', 'm3'),
('c18', 'e03', 'm1'),
('c22', 'e03', 'm2'),
('c26', 'e03', 'm3'),
('c19', 'e01', 'm1'),
('c23', 'e01', 'm2'),
('c27', 'e01', 'm3'),
('c20', 'e04', 'm1'),
('c24', 'e04', 'm2'),
('c28', 'e04', 'm3'),
('c21', 'e02', 'm1'),
('c25', 'e02', 'm2'),
('c29', 'e02', 'm3');