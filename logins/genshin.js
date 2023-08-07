const fetch = require("node-fetch");
const embed = require("../libs/embeds.js");
const db = require("../db.js");
const ACT_ID = "e202102251931481";
const { GenshinImpact, LanguageEnum } = require ('hoyoapi')

module.exports = {
  giDaily: giDaily,
};

async function giDaily(cookie, client, discordId) {

  const genshin = GenshinImpact.create({
    cookie: cookie,
    lang: LanguageEnum.ENGLISH, 
  })

  const claim = await genshin.daily.claim()
  console.log(claim)

  // db.log()
}

