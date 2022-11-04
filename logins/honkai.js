const fetch = require("node-fetch");
const ACT_ID = "e202110291205111";
const embed = require("../libs/embeds.js");

module.exports = {
  hi3Request: hi3Request,
  checkDailyNotSigned: checkDailyNotSigned,
};

async function hi3Request(cookie, client, userId) {
  const data = await checkDailyNotSigned(cookie, userId);
  if (data.is_sign == true) return;

  await DailySigned(cookie, userId);
  const data2 = await checkDailyNotSigned(cookie, userId);

  var status = `Error`;
  if (data2.total_sign_day == data.total_sign_day) {
    status = `Error`;
  } else {
    status = `Success`;
  }

  await client.users.send(userId, {
    embeds: [
      await embed.loginEmbed("Honkai Impact", data2.total_sign_day, status),
    ],
  });
}

async function checkDailyNotSigned(cookie, userId) {
  try {
    const response = await fetch(
      `https://sg-public-api.hoyolab.com/event/mani/info?lang=en-us&act_id=${ACT_ID}`,
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
      `https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us`,
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
