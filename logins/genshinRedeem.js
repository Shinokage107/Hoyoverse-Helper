const fetch = require("node-fetch");
const db = require("../db.js");

module.exports = {
  checkCodes: checkCodes,
  redeemCodes: redeemCodes,
};

async function redeemCodes(cookie, client, discord_id, codes) {
  if (codes != null) {
    const acc = await getAccData(cookie);

    const usedCodes = getUsedCodes(discord_id);

    for (const code of codes) {
      if (!(await usedCodes).includes(code)) {
        await redeemCode(acc, cookie, code, discord_id, client);
      }
    }
  }
}

async function checkCodes() {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn-update.json`,
      {
        headers: {
          accept: "*/*",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "GET",
        mode: "cors",
      }
    );

    var codeList = [];
    const data = await response.json();
    for (const redeem of data.CODES) {
      if (redeem.is_expired == false) {
        codeList.push(redeem.code);
      }
    }
    return codeList;
  } catch (error) {
    console.log(
      "Something went wrong fetching Genshin Redeem Code list\n" + error
    );
  }
}

async function getUsedCodes(discord_id) {
  const result = await db.query(
    `SELECT * FROM gicodes WHERE discord_id=${discord_id}`
  );
  var usedCodes = [];
  for (const row of result) {
    usedCodes.push(row["code"]);
  }
  return usedCodes;
}

async function redeemCode(acc, cookie, code, discord_id, client) {
  try {
    const response = await fetch(
      `https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey?uid=${acc.game_uid}&region=${acc.region}&lang=en&cdkey=${code}&game_biz=${acc.game_biz}`,
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
    if (data.data == null) {
      throw data;
    } else {
      client.users.send(discord_id, `I redeemed a code for u! => ${code}`);
      regCodeRedemption(discord_id, code);

      //console.log(data);
    }
  } catch (error) {
    if (error.retcode == -2017) {
      regCodeRedemption(discord_id, code);
    } else if (error.retcode != -2016) {
      console.log(
        `user: ${discord_id} check info failed with error: ${error.message}`
      );
    }
    return false;
  }
}

async function regCodeRedemption(discord_id, code) {
  await db.query(
    `INSERT INTO gicodes (discord_id, code) VALUES ("${discord_id}", "${code}")`
  );
}

async function getAccData(cookie) {
  try {
    const response = await fetch(
      `https://api-os-takumi.hoyoverse.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_global`,
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

    return data.data.list[0];
  } catch (error) {
    console.log("check info failed with error: " + error);
    return false;
  }
}
