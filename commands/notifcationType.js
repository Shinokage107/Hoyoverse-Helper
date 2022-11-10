const { SlashCommandBuilder } = require("discord.js");
const db = require("../db.js");
module.exports = {
  name: "notification",
  description:
    "Change ur Notifcation type to instant, daily, weekly or monthly",
  type: "user",

  commandBuilder() {
    const data = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addIntegerOption((option) =>
        option
          .setName("type")
          .setDescription("The type of notification")
          .setRequired(true)
          .addChoices(
            { name: "Instant", value: 0 },
            { name: "Daily", value: 1 },
            { name: "Weekly", value: 2 },
            { name: "Monthly", value: 3 }
          )
      );
    return data;
  },

  async execute(interaction) {
    const type = interaction.options.getInteger("type");
    const discordId = interaction.user.id;

    await db.query(
      `INSERT INTO user (discord_id, notification_type) VALUES ("${discordId}", ${type}) ON DUPLICATE KEY UPDATE discord_id="${discordId}", notification_type=${type}`
    );

    await interaction.reply("Notification type set!");
  },
};
