const db = require("../db.js");
const embed = require("../libs/embeds.js");

module.exports = {
  collectionMessage: collectionMessage,
  dailyMessage: dailyMessage,
  weeklyMessage: weeklyMessage,
  monthlyMessage: monthlyMessage,
};

async function collectionMessage(discord_id, days, client) {
  logs = await db.collectLogs(discord_id, days);
  var genshinSuccess = 0;
  var genshinError = 0;
  var honkaiSuccess = 0;
  var honkaiError = 0;

  for (let i = 0; i < logs.length; i++) {
    const entry = logs[i];
    if (entry.type_id == "sign" && entry.game_id == "gi") {
      if (entry.value != "Error") {
        genshinSuccess++;
      } else {
        genshinError++;
      }
    } else if (entry.type_id == "sign" && entry.game_id == "hki") {
      if (entry.value != "Error") {
        honkaiSuccess++;
      } else {
        honkaiError++;
      }
    }
  }

  try {
    await client.users.send(discord_id, {
      embeds: [
        await embed.logMessageEmbed(
          genshinSuccess,
          genshinError,
          honkaiSuccess,
          honkaiError,
          days
        ),
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

async function dailyMessage(client) {
  userList = await db.getUserByType("d");
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    collectionMessage(user.discord_id, 1, client);
  }
}

async function weeklyMessage(client) {
  userList = await db.getUserByType("w");
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    collectionMessage(user.discord_id, 7, client);
  }
}

async function monthlyMessage(client) {
  userList = await db.getUserByType("m");
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    collectionMessage(user.discord_id, 30, client);
  }
}
