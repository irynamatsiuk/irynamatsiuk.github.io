const pool = require("./pool");

async function selectAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function selectMessageById(id) {
  const { rows } = await pool.query(`SELECT * FROM messages WHERE id=${id}`);
  return rows;
}

async function insertMessage(username, message, date) {
  await pool.query(
    `INSERT INTO messages (Username, Message, Date) VALUES ($1, $2, $3)`,
    [username, message, date]
  );
}

module.exports = {
  selectAllMessages,
  selectMessageById,
  insertMessage,
};
