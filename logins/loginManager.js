const honkai = require("./honkai.js");
const genshin = require("./genshin.js");
const genshinRedeem = require("./genshinRedeem.js");
const tot = require("./tot.js");
const db = require("../db.js");
const crypto = require("../encrypt.js");
const CronJob = require("cron").CronJob;

module.exports = {
  startHki3loginRoutine: startHki3loginRoutine,
  startGenshinLoginRoutine: startGenshinLoginRoutine,
  startGenshinRedeemRoutine: startGenshinRedeemRoutine,
  startTotLoginRoutine: startTotLoginRoutine,
  loginQ: loginQ,
  redeemQ: redeemQ,
};

var loginQ = new CronJob(
  "00 */10 * * * *",
  function () {
    console.log("Started Login-Process => " + new Date().toLocaleString());
    login.startHki3loginRoutine(client);
    login.startGenshinLoginRoutine(client);
    login.startTotLoginRoutine(client);
  },
  null,
  true,
  "America/Los_Angeles"
);

var redeemQ = new CronJob(
  "00 */1 * * * *",
  function () {
    console.log("Started Redeem-Process => " + new Date().toLocaleString());
    login.startGenshinRedeemRoutine(client);
  },
  null,
  true,
  "America/Los_Angeles"
);

async function startHki3loginRoutine(client) {
  const pairs = await db.query("SELECT * FROM hki3login");

  for (const pair of pairs) {
    honkai.hi3Request(
      crypto.decrypt(pair["cookie"]),
      client,
      pair["discord_id"]
    );
  }
}

async function startGenshinLoginRoutine(client) {
  const pairs = await db.query("SELECT * FROM gilogin");

  for (const pair of pairs) {
    genshin.genshinRequest(
      crypto.decrypt(pair["cookie"]),
      client,
      pair["discord_id"]
    );
  }
}

async function startGenshinRedeemRoutine(client) {
  const pairs = await db.query("SELECT * FROM giredeem");
  const codes = await genshinRedeem.checkCodes();

  for (const pair of pairs) {
    genshinRedeem.redeemCodes(
      crypto.decrypt(pair["cookie"]),
      client,
      pair["discord_id"],
      codes
    );
  }
}

async function startTotLoginRoutine(client) {
  const pairs = await db.query("SELECT * FROM totlogin");

  for (const pair of pairs) {
    tot.totRequest(crypto.decrypt(pair["cookie"]), client, pair["discord_id"]);
  }
}
