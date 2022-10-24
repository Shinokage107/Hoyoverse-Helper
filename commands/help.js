const { SlashCommandBuilder } = require('discord.js');
const db = require('../db.js');
const genshin = require('../logins/genshin.js');
module.exports = {
    name: "help",
    description: "Simple instructions for how to get ur account cookie",
    type: "user",

    commandBuilder(){
        const data = new SlashCommandBuilder()
	        .setName(this.name)
	        .setDescription(this.description)
         return data;
    },


    async execute(interaction) {
        await interaction.reply('https://github.com/Shinokage107/hoyoLogin/blob/main/README.md');
    },
  };