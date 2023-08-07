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
            { name: "Instant", value: "i" },
            { name: "Daily", value: "d" },
            { name: "Weekly", value: "w" },
            { name: "Monthly", value: "m" }
          )
      );
    return data;
  },

  async execute(interaction) {
    const type = interaction.options.getString("type");
    const discordId = interaction.user.id;

    await db.query(
      `INSERT INTO user (discord_id, notification_type) VALUES ("${discordId}", ${type}) ON DUPLICATE KEY UPDATE discord_id="${discordId}", notification_type="${type}"`
    );

    await interaction.reply("Notification type set!");
  },
};
