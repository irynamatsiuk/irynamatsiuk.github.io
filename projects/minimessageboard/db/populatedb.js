const { argv } = require("node:process");
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Username VARCHAR (255),
Message VARCHAR (255),
Date DATE
);

INSERT INTO messages (Username, Message, Date)
VALUES 
('Anonymous colleague', 'It’s not stealing if I prayed over it first', CURRENT_DATE),
('No Name', 'Plot twist: Your lunch left you. It wanted more spice in its life', CURRENT_DATE),
('New family', 'I didn’t steal it — I adopted it. It has a new, loving home now', CURRENT_DATE);
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
