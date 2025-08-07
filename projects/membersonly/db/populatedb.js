const { Client } = require('pg');
require('dotenv').config();

// default db data
// it's not possible to log in with credentials listed in this file
// because during autentication the password is hashed using bcrypt
// to log in you need to create the user via sign up form

const SQL = `

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR ( 255 ) UNIQUE,
password VARCHAR ( 255 ),
f_name VARCHAR ( 50 ),
l_name VARCHAR ( 50 ),
is_member BOOLEAN DEFAULT FALSE,
is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INTEGER REFERENCES users (id),
date DATE DEFAULT CURRENT_DATE,
title VARCHAR ( 255 ),
text VARCHAR ( 500 )
);


INSERT INTO users (username, password, f_name, l_name) 
VALUES
('tribbiani_j', '111', 'Joey', 'Tribbiani'),
('dinosrus', '222', 'Ross', 'Geller'),
('neatfreak', '333', 'Monica', 'Geller'),
('songbird', '444', 'Phoebe', 'Buffay');


INSERT INTO messages (user_id, title, text) 
VALUES
('2', 'We Were on a Break', 'Posting this before anyone else tries to rewrite history again. The break was real, people. Just saying.'),
('3', 'Clean Slate, Clean Apartment', 'I reorganized my sock drawer, labeled all the spices alphabetically, and sanitized my keyboard. Productivity = happiness.'),
('4', 'Smelly Cat Appreciation Post', 'Smelly Cat deserves more love, fewer baths, and probably a record deal. Protect her at all costs.'),
('1', 'How YOU doin’?', 'Figured I’d drop in and say hey to all the beautiful people on this board. If anyone’s free tonight, I’ll be at Central Perk. Bring snacks.');
`;

async function populate() {
  console.log('sending...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('db is reset to its default version');
}

module.exports = {
  populate,
};
