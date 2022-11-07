const fetch = require("node-fetch");
const embed = require("../libs/embeds.js");
const db = require("../db.js");
const ACT_ID = "e202102251931481";

module.exports = {
  genshinRequest: genshinRequest,
  checkDailyNotSigned: checkDailyNotSigned,
};

async function genshinRequest(cookie, client, userId) {
  const data = await checkDailyNotSigned(cookie, userId);
  if (data.signed == true) return;

  await DailySigned(cookie, userId);
  const data2 = await checkDailyNotSigned(cookie, userId);

  var status = `Error`;
  if (data2.sign_cnt == data.sign_cnt) {
    status = `Error`;
  } else {
    status = `Success`;
  }

  userNotification = 1;
  try {
    user = await db.getUser(userId);
    userNotification = user[0].notification_type;
  } catch (error) {
    console.log(error);
  }

  try {
    if (
      userNotification == 1 ||
      userNotification == null ||
      status == "Error"
    ) {
      await client.users.send(userId, {
        embeds: [await embed.loginEmbed("Genshin", data2.sign_cnt, status)],
      });
    }
    await db.log(userId, 1, 1, status);
  } catch (error) {
    console.log(error);
  }
}

async function checkDailyNotSigned(cookie, userId) {
  try {
    const response = await fetch(
      `https://sg-hk4e-api.hoyolab.com/event/sol/resign_info?lang=en-us&act_id=${ACT_ID}`,
      {
        headers: {
          accept: "*/*",
          cookie: `${cookie}`,
        },
        referrer: "https://www.hoyolab.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "GET",
        mode: "cors",
      }
    );

    const data = await response.json();
    if (data.data == null) throw data.message;

    return data.data;
  } catch (error) {
    console.log(`user: ${userId} => check info failed with error: ${error}`);
    return false;
  }
}

async function DailySigned(cookie, userId) {
  try {
    const response = await fetch(
      `https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us`,
      {
        headers: {
          accept: "*/*",
          cookie: `${cookie}`,
        },
        body: `{"act_id":"${ACT_ID}"}`,
        referrer: "https://www.hoyolab.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        mode: "cors",
      }
    );

    const data = await response.json();
    if (data.data == null) throw data.message;
    // return data.data.is_sign;
  } catch (error) {
    console.log(`user: ${userId} => sign in failed with error: ${error}`);
    return false;
  }
}
