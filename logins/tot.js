const fetch = require("node-fetch");
const ACT_ID = "e202202281857121";
const embed = require("../libs/embeds.js");
const db = require("../db.js");

module.exports = {
  totRequest: totRequest,
  checkDailyNotSigned: checkDailyNotSigned,
};

async function totRequest(cookie, client, userId) {
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

  try {
    await client.users.send(userId, {
      embeds: [
        await embed.loginEmbed("Tears of Themis", data2.total_sign_day, status),
      ],
    });
    db.log(userId, 3, 1, status);
  } catch (error) {
    console.log(error);
  }
}

async function checkDailyNotSigned(cookie, userId) {
  try {
    const response = await fetch(
      `https://sg-public-api.hoyolab.com/event/luna/os/info?lang=en-us&act_id=${ACT_ID}`,
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
      `https://sg-public-api.hoyolab.com/event/luna/os/sign`,
      {
        headers: {
          accept: "*/*",
          cookie: `${cookie}`,
        },
        body: `{
				"act_id":"${ACT_ID}",
				"lang" :"en-us"
			}`,
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
