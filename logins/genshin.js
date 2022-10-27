const fetch = require("node-fetch");
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

  log = "unfinished business";
  if (data2.sign_cnt == data.sign_cnt) {
    log = `Failed to sigh in, either theres a backend problem or your cookies are outdated`;
  } else {
    log = `Your sign in is success, your total sign in is **${data2.sign_cnt} days **. \n U missed **${data2.sign_cnt_missed} days** :c`;
  }

  client.users.send(userId, log);
}

async function checkDailyNotSigned(cookie) {
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

async function DailySigned(cookie) {
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
