const mysql = require("mysql");
const util = require("util");

var conn = mysql.createConnection({
  host: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

const query = util.promisify(conn.query).bind(conn);

module.exports.query = query;
module.exports.conn = conn;
