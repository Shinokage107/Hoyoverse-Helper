const { SlashCommandBuilder } = require("discord.js");
const db = require("../db.js");
const genshin = require("../logins/genshin.js");
const crypto = require("../encrypt.js");
module.exports = {
  name: "genshincodes",
  description: "Sets up Auto-Code-Redemption",
  type: "user",

  commandBuilder() {
    const data = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((option) =>
        option
          .setName("cookie")
          .setDescription(
            "The Cookie from ur Account Login, info on how to get it under /hoyoHelp"
          )
      );
    return data;
  },

  async execute(interaction) {
    const cookie = interaction.options.getString("cookie");
    const discordId = interaction.user.id;

    const data = await genshin.checkDailyNotSigned(cookie);
    if (!data)
      return await interaction.reply(
        "Sry, i was not able to login with ur cookies :c \nThe Cookie should look like this: \n**cookie_token=<Some weird text>;account_id=<Some random number>;**"
      );

    await db.query(
      `INSERT INTO giredeem (discord_id, cookie) VALUES ("${discordId}", "${crypto.encrypt(
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
