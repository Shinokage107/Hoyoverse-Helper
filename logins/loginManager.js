const honkai = require("./honkai.js");
const genshin = require("./genshin.js");
const db = require("../db.js");
const crypto = require("../encrypt.js");

module.exports = {
  startDailyRoutine: startDailyRoutine
};

async function startDailyRoutine(client){
  const users = await db.query("SELECT * FROM user");

  for (const user of users){
    if(user["hki_cookie"] != null) honkai.hkiDaily(crypto.decrypt(user["hki_cookie"]), client, user["discord_id"]);
    if(user["gi_cookie"] != null) genshin.giDaily(crypto.decrypt(user["gi_cookie"]), client, user["discord_id"]);
  }
}



