const pool = require('./pool');

async function getAllMessages() {
  const { rows } = await pool.query(`SELECT 
        m.id as message_id,
        m.user_id,
        u.f_name, 
        u.l_name, 
        m.date, 
        m.title, 
        m.text  
        FROM users as u
        JOIN messages as m ON m.user_id=u.id`);
  return rows;
}

async function insertNewUser(username, password, f_name, l_name) {
  const result = await pool.query(
    'INSERT INTO users (username, password, f_name, l_name) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, password, f_name, l_name],
  );
  return result.rows[0];
}

async function findUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}

async function addMemberStatus(id) {
  const result = await pool.query(
    'UPDATE users SET is_member = TRUE WHERE id = $1 RETURNING id',
    [id],
  );
  return result.rowCount;
}

async function delMemberStatus(id) {
  const result = await pool.query(
    'UPDATE users SET is_member = FALSE WHERE id = $1 RETURNING id',
    [id],
  );
  return result.rowCount;
}

async function addAdminStatus(id) {
  const result = await pool.query(
    'UPDATE users SET is_admin = TRUE WHERE id = $1 RETURNING id',
    [id],
  );
  return result.rowCount;
}

async function delAdminStatus(id) {
  const result = await pool.query(
    'UPDATE users SET is_admin = FALSE WHERE id = $1 RETURNING id',
    [id],
  );
  return result.rowCount;
}

async function insertMessage(id, title, message) {
  const result = await pool.query(
    'INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3) RETURNING *',
    [id, title, message],
  );
  return result.rows[0];
}

async function deleteMessage(id) {
  const result = await pool.query(
    'DELETE FROM messages WHERE id=$1 RETURNING *',
    [id],
  );
  return result.rowCount;
}

module.exports = {
  getAllMessages,
  insertNewUser,
  findUserByUsername,
  findUserById,
  addMemberStatus,
  delMemberStatus,
  addAdminStatus,
  delAdminStatus,
  insertMessage,
  deleteMessage,
};
