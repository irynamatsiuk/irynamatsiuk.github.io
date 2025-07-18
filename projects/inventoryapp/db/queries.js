const pool = require("./pool");

async function getAllWonders() {
  const { rows } = await pool.query(`SELECT * FROM wonders`);
  return rows;
}

async function getFilteredWonders(category, country) {
  let query;
  if (country != "allCountries" && category != "allCategories") {
    query = `SELECT w.name, w.id
            FROM wonders AS w
            JOIN wonders_categories AS wc ON w.id=wc.wonder_id
            JOIN categories AS cat ON wc.category_id=cat.id
            JOIN locations AS l ON w.id=l.wonder_id
            JOIN countries AS c ON l.country_id=c.id
            WHERE cat.name='${category}' AND c.name='${country}'`;
  }
  if (country == "allCountries" && category != "allCategories") {
    query = `SELECT w.name, w.id
            FROM wonders AS w
            JOIN wonders_categories AS wc ON w.id=wc.wonder_id
            JOIN categories AS cat ON wc.category_id=cat.id
            WHERE cat.name='${category}'`;
  }
  if (country != "allCountries" && category == "allCategories") {
    query = `SELECT w.name, w.id
            FROM wonders AS w
            JOIN locations AS l ON w.id=l.wonder_id
            JOIN countries AS c ON l.country_id=c.id
            WHERE c.name='${country}'`;
  }
  const { rows } = await pool.query(`${query}`);
  return rows;
}

// SELECT w.name, w.id FROM wonders AS w JOIN wonders_categories AS wc ON w.id=wc.wonder_id JOIN categories AS cat ON wc.category_id=cat.id JOIN locations AS l ON w.id=l.wonder_id JOIN countries AS c ON l.country_id=c.id WHERE c.name='Italy;

async function getAllCategories() {
  const { rows } = await pool.query(`SELECT * from categories`);
  return rows;
}

async function getAllCountries() {
  const { rows } = await pool.query(`SELECT * from countries`);
  return rows;
}

async function insertWonder(name) {
  await pool.query("INSERT INTO wonders (name) VALUES ($1)", [name]);
}

async function getName(id) {
  const { rows } = await pool.query(`SELECT * FROM wonders WHERE id=${id}`);
  return rows;
}

async function getDescription(id) {
  const { rows } = await pool.query(
    `SELECT description FROM descriptions WHERE wonder_id=${id}`
  );
  return rows;
}

async function getSelectedCategories(id) {
  const { rows } = await pool.query(
    `SELECT c.name FROM categories AS c JOIN wonders_categories AS wc ON c.id=wc.category_id WHERE wonder_id=${id}`
  );
  return rows;
}

async function getAddress(id) {
  const { rows } = await pool.query(
    `SELECT address FROM locations WHERE wonder_id=${id}`
  );
  return rows;
}

async function getCountry(id) {
  const { rows } = await pool.query(
    `SELECT c.name AS country FROM countries AS c JOIN locations AS l ON c.id=l.country_id WHERE wonder_id=${id}`
  );
  return rows;
}

async function updateName(id, name) {
  await pool.query(`UPDATE wonders SET name=($1) WHERE id=${id}`, [name]);
}

async function addCheckedCategories(values) {
  await pool.query(
    `INSERT INTO wonders_categories (wonder_id, category_id) VALUES
    ${values}
    ON CONFLICT (wonder_id, category_id) DO NOTHING`
  );
}

async function deleteUncheckedCategories(id, list) {
  await pool.query(
    `DELETE FROM wonders_categories WHERE wonder_id=${id} AND category_id NOT IN (${list})`
  );
}

async function updateDescription(id, description) {
  await pool.query(
    `INSERT INTO descriptions (wonder_id, description) VALUES ('${id}','${description}') ON CONFLICT (wonder_id) DO UPDATE SET description='${description}';`
  );
}

async function updateLocation(id, country, address) {
  await pool.query(
    `INSERT INTO locations (wonder_id, country_id, address) VALUES ('${id}', '${country}', '${address}') ON CONFLICT (wonder_id) DO UPDATE SET country_id='${country}', address='${address}';`
  );
}

async function insertCategory(newCategory) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [newCategory]);
}

async function getCategoryById(id) {
  const { rows } = await pool.query(`SELECT * FROM categories WHERE id=${id}`);
  return rows;
}

async function updateCategoryName(id, name) {
  await pool.query(`UPDATE categories SET name='${name}' WHERE id=${id}`);
}

async function deleteCategoryById(id) {
  await pool.query(`DELETE FROM categories WHERE id=${id} `);
}

async function deleteWonderCategoryRelations(categoryId) {
  await pool.query(
    `DELETE FROM wonders_categories WHERE category_id=${categoryId}`
  );
}

async function deleteWonder(id) {
  await pool.query(`DELETE FROM wonders WHERE id=${id}`);
}

async function cleanUpWonderDescription(id) {
  await pool.query(`DELETE FROM descriptions WHERE wonder_id=${id}`);
}
async function cleanUpWonderCategories(id) {
  await pool.query(`DELETE FROM wonders_categories WHERE wonder_id=${id}`);
}
async function cleanUpWonderLocation(id) {
  await pool.query(`DELETE FROM locations WHERE wonder_id=${id}`);
}

module.exports = {
  getAllWonders,
  getAllCategories,
  getAllCountries,
  insertWonder,
  getFilteredWonders,

  getName,
  getDescription,
  getSelectedCategories,
  getAddress,
  getCountry,

  updateName,
  updateDescription,

  addCheckedCategories,
  deleteUncheckedCategories,
  //   updateCategories,
  updateLocation,

  deleteWonder,
  cleanUpWonderDescription,
  cleanUpWonderCategories,
  cleanUpWonderLocation,

  insertCategory,
  getCategoryById,
  updateCategoryName,
  deleteCategoryById,
  deleteWonderCategoryRelations,
};

//` SELECT w.name, d.description, cat.name as category, l.address, c.name as country FROM wonders AS w JOIN descriptions AS d ON w.id=d.wonder_id JOIN wonders_categories AS wc ON w.id=wc.wonder_id JOIN categories AS cat ON wc.category_id=cat.id JOIN locations AS l ON w.id=l.wonder_id JOIN countries AS c ON l.country_id=c.id `;

// `SELECT w.name, d.description, cat.name as category, l.address, c.name as country
//     FROM wonders AS w
//         JOIN descriptions AS d ON w.id=d.wonder_id
//         JOIN wonders_categories AS wc ON w.id=wc.wonder_id
//         JOIN categories AS cat ON wc.category_id=cat.id
//         JOIN locations AS l ON w.id=l.wonder_id
//         JOIN countries AS c ON l.country_id=c.id`
