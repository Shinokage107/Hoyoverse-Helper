const fetch = require("node-fetch");
const ACT_ID = "e202110291205111";
const db = require("../db.js");
const embed = require("../libs/embeds.js");
const { HonkaiImpact, LanguageEnum } = require ('hoyoapi')

module.exports = {
  hkiDaily: hkiDaily,
};

async function hkiDaily(cookie, client, discordId) {
  const honkai = HonkaiImpact.create({
    cookie: cookie,
    lang: LanguageEnum.ENGLISH, 
  })

  const claim = await honkai.daily.claim()
  console.log(claim)

  // db.log("")
}

