require("dotenv").config();
const fs = require("fs");
const CronJob = require("cron").CronJob;
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const login = require("./logins/loginManager.js");
const messanger = require("./libs/messagingManager.js");

const version = 1.54;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.users.send(
    process.env.DEV_ID,
    `Restarted the bot. Version => ${version}`
  );

  // dailyMessageJob.start();
  // weeklyMessageJob.start();
  // monthlyMessageJob.start();
  loginQ.start();
});

var loginQ = new CronJob(
  "00 */10 * * * *",
  function () {
    //console.log("Started Login-Process => " + new Date().toLocaleString());
    login.startHki3loginRoutine(client);
    login.startGenshinLoginRoutine(client);
  },
  null,
  true,
  "America/Los_Angeles"
);


var dailyMessageJob = new CronJob(
  "00 00 09 * * *",
  function () {
    console.log(
      "Started Started Daily Messaging => " + new Date().toLocaleString()
    );
    messanger.dailyMessage(client);
  },
  null,
  true,
  "America/Los_Angeles"
);

var weeklyMessageJob = new CronJob(
  "00 00 09 * * 1",
  function () {
    console.log(
      "Started Started Weekly Messaging => " + new Date().toLocaleString()
    );
    messanger.weeklyMessage(client);
  },
  null,
  true,
  "America/Los_Angeles"
);

var monthlyMessageJob = new CronJob(
  "00 00 09 1 * *",
  function () {
    console.log(
      "Started Started Monthly Messaging => " + new Date().toLocaleString()
    );
    messanger.monthlyMessage(client);
  },
  null,
  true,
  "America/Los_Angeles"
);

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  client.commands.forEach((command) => {
    if (interaction.commandName === command.name && command.type === "user") {
      command.execute(interaction);
    }

    if (interaction.commandName === command.name && command.type === "dev") {
      if (interaction.user.id === process.env.DEV_ID) {
        command.execute(interaction);
      } else {
        interaction.reply(
          "You are not a dev! The command u are trying to use is Dev only"
        );
      }
    }
  });
});

client.login(process.env.BOT_TOKEN);
