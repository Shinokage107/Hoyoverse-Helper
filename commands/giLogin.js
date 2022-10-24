const { SlashCommandBuilder } = require('discord.js');
const db = require('../db.js');
const genshin = require('../logins/genshin.js');
module.exports = {
    name: "genshin",
    description: "Sets up Auto-Login for Genshin Impact",
    type: "user",

    commandBuilder(){
        const data = new SlashCommandBuilder()
	        .setName(this.name)
	        .setDescription(this.description)
	        .addStringOption(option =>
		        option.setName('cookie')
			    .setDescription('The Cookie from ur Account Login, info on how to get it under /hoyoHelp'));
         return data;
    },


    async execute(interaction) {
        const cookie = interaction.options.getString('cookie');
        const discordId = interaction.user.id;

        const data = await genshin.checkDailyNotSigned(cookie);
        if(!data) return await interaction.reply('Sry, i was not able to login with ur cookies :c \nThe Cookie should look like this: \n**ltoken=<Some weird text>;ltuid=<Some random number>;**');

        await db.query('INSERT INTO gilogin (discord_id, cookie) VALUES ("'+discordId+'", "'+cookie+'") ON DUPLICATE KEY UPDATE discord_id="'+discordId+'", cookie="'+cookie+'"');

        await interaction.reply('Automatic Login established and is ready to go c:');
    },
  };