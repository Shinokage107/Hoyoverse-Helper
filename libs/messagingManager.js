const db = require("../db.js");
const CronJob = require("cron").CronJob;

module.exports = {
  collectionMessage: collectionMessage,
  dailyMessageJob: dailyMessageJob,
};

var dailyMessageJob = new CronJob(
  "00 */1 * * * *",
  function () {
    console.log(
      "Started Started Daily Messaging => " + new Date().toLocaleString()
    );
    dailyMessage();
  },
  null,
  true,
  "America/Los_Angeles"
);

async function collectionMessage(discord_id, days) {
  logs = await db.collectLogs(discord_id, days);
  console.log(logs);
}

async function dailyMessage() {
  userList = await db.getUserByType(2);
  for (const user in userList) {
    collectionMessage(user["discord_id"], 1);
  }
}

async function weeklyMessage() {
  userList = await db.getUserByType(3);
  for (const user in userList) {
    collectionMessage(user["discord_id"], 7);
  }
}

async function monthlyMessage() {
  userList = await db.getUserByType(4);
  for (const user in userList) {
    collectionMessage(user["discord_id"], 30);
  }
}
