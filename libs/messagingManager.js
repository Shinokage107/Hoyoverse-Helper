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
  var totSuccess = 0;
  var totError = 0;
  var genshinRedeem = [];

  for (let i = 0; i < logs.length; i++) {
    const entry = logs[i];
    if (entry.type_id == 2 && entry.game_id == 1) {
      genshinRedeem.push(entry.value);
    } else if (entry.type_id == 1 && entry.game_id == 1) {
      if (entry.value != "Error") {
        genshinSuccess++;
      } else {
        genshinError++;
      }
    } else if (entry.type_id == 1 && entry.game_id == 2) {
      if (entry.value != "Error") {
        honkaiSuccess++;
      } else {
        honkaiError++;
      }
    } else if (entry.type_id == 1 && entry.game_id == 3) {
      if (entry.value != "Error") {
        totSuccess++;
      } else {
        totError++;
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
          totSuccess,
          totError,
          genshinRedeem,
          days
        ),
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

async function dailyMessage(client) {
  userList = await db.getUserByType(1);
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    collectionMessage(user.discord_id, 1, client);
  }
}

async function weeklyMessage() {
  userList = await db.getUserByType(2);
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    collectionMessage(user.discord_id, 7, client);
  }
}

async function monthlyMessage() {
  userList = await db.getUserByType(3);
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    collectionMessage(user.discord_id, 30, client);
  }
}
