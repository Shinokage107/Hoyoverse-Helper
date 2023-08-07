const { SlashCommandBuilder } = require("discord.js");
const db = require("../db.js");
const crypto = require("../encrypt.js");
const { GenshinImpact, LanguageEnum } = require ('hoyoapi')

module.exports = {
  name: "genshin",
  description: "Sets up Auto-Dailys for Genshin Impact",
  type: "user",

  commandBuilder() {
    const data = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((option) =>
        option
          .setName("cookie")
          .setDescription(
            "The Cookie from ur Daily-Signup page, info on how to get it under /help"
          )
      );
    return data;
  },

  async execute(interaction) {
    const cookie = interaction.options.getString("cookie");
    const discordId = interaction.user.id;

    const data = GenshinImpact.create({
      cookie: 'cookie',
      lang: LanguageEnum.ENGLISH, 
    })
    if (!data)
      return await interaction.reply(
        "Sry, i was not able to login with ur cookies :c \nThe Cookie should look like this: \n**ltoken=<Some weird text>;ltuid=<Some random number>;**"
      );

    await db.query(
      `INSERT INTO user (discord_id, gi_cookie) VALUES ("${discordId}", "${crypto.encrypt(
        cookie
      )}") ON DUPLICATE KEY UPDATE discord_id="${discordId}", cookie="${crypto.encrypt(
        cookie
      )}"`
    );

    await interaction.reply(
      "Automatic Login established and is ready to go c:"
    );
  },
};
