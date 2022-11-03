require("dotenv").config();
const db = require("./db.js");
const crypto = require("./encrypt.js");

async function replaceCookies(table) {
  const pairs = await db.query(`SELECT * FROM ${table}`);
  for (const pair of pairs) {
    await db.query(
      `UPDATE ${table} SET cookie="${crypto.encrypt(
        pair["cookie"]
      )}" WHERE discord_id="${pair["discord_id"]}"`
    );
    console.log(`updated ${pair[discord_id]} in ${table}`);
  }
}

replaceCookies("hki3login");
replaceCookies("gilogin");
replaceCookies("totlogin");
replaceCookies("giredeem");
