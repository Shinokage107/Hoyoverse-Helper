const mysql = require("mysql");
const util = require("util");

module.exports = {
  log: log,
  regCodeRedemption: regCodeRedemption,
  getUser: getUser,
};

var conn = mysql.createConnection({
  host: process.env.DB_URL,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

const query = util.promisify(conn.query).bind(conn);

async function log(discord_id, game_id, type_id, value) {
  await query(
    `INSERT INTO log (discord_id, game_id, type_id, value) VALUES ("${discord_id}", ${game_id}, ${type_id}, "${value}")`
  );
}

async function regCodeRedemption(discord_id, code) {
  await query(
    `INSERT INTO gicodes (discord_id, code) VALUES ("${discord_id}", "${code}")`
  );
}

async function getUser(discord_id) {
  return await query(`SELECT * FROM user WHERE discord_id = "${discord_id}"`);
}

module.exports.query = query;
module.exports.conn = conn;
