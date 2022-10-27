const honkai = require("./honkai.js");
const genshin = require("./genshin.js");
const genshinRedeem = require("./genshinRedeem.js");
const tot = require("./tot.js");
const db = require("../db.js");

module.exports = {
  startHki3loginRoutine: startHki3loginRoutine,
  startGenshinLoginRoutine: startGenshinLoginRoutine,
  startGenshinRedeemRoutine: startGenshinRedeemRoutine,
  startTotLoginRoutine: startTotLoginRoutine,
};

async function startHki3loginRoutine(client) {
  const pairs = await db.query("SELECT * FROM hki3login");

  for (const pair of pairs) {
    honkai.hi3Request(pair["cookie"], client, pair["discord_id"]);
  }
}

async function startGenshinLoginRoutine(client) {
  const pairs = await db.query("SELECT * FROM gilogin");

  for (const pair of pairs) {
    genshin.genshinRequest(pair["cookie"], client, pair["discord_id"]);
  }
}

async function startGenshinRedeemRoutine(client) {
  const pairs = await db.query("SELECT * FROM giredeem");
  const codes = await genshinRedeem.checkCodes();

  for (const pair of pairs) {
    genshinRedeem.redeemCodes(
      pair["cookie"],
      client,
      pair["discord_id"],
      codes
    );
  }
}

async function startTotLoginRoutine(client) {
  const pairs = await db.query("SELECT * FROM totlogin");

  for (const pair of pairs) {
    tot.totRequest(pair["cookie"], client, pair["discord_id"]);
  }
}
