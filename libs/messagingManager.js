const db = require("../db.js");

module.exports = {
  collectionMessage: collectionMessage,
};

async function collectionMessage(discord_id, days) {
  logs = await db.collectLogs(discord_id, days);
  console.log(logs);
}
