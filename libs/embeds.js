const { EmbedBuilder } = require("discord.js");
const honkai = require("../logins/honkai");

module.exports = {
  loginEmbed: loginEmbed,
  codeRedeemEmbed: codeRedeemEmbed,
  logMessageEmbed: logMessageEmbed,
};

function loginEmbed(game, days, status) {
  var color = "#25be4d";

  var embed = new EmbedBuilder()
    .setTitle(`${game} Daily Sign-In`)
    .addFields(
      { name: "Status", value: `${status}`, inline: true },
      { name: "Day: ", value: `${days}`, inline: true }
    )
    .setTimestamp();

  if (status == "Error") {
    color = "#D84b4b";
    embed.addFields({
      name: "What to do ?",
      value:
        "Ur automatic Sign-In resulted in an error. Dont panic this is most likely due to an outdated/invalid cookie. Try reassigning ur cookies. When this doesnt help delete ur connection and contact a developer.",
    });
  }
  embed.setColor(color);
  return embed;
}

function codeRedeemEmbed(game, code) {
  var color = "#4b70d8";

  var embed = new EmbedBuilder()
    .setTitle(`${game} Code Redemption`)
    .setColor(color)
    .setDescription(`I redeemed a code for u! => ${code}`)
    .setTimestamp();

  return embed;
}

function logMessageEmbed(
  genshinSuccess,
  genshinError,
  honkaiSuccess,
  honkaiError,
  totSuccess,
  totError,
  genshinRedeem,
  days
) {
  var embed = new EmbedBuilder()
    .setTitle(`Your log from the last ${days} Day/s`)
    .setColor("#4b70d8")
    .setTimestamp();

  if (genshinSuccess != 0 || genshinError != 0) {
    var genshinString = "";
    if (genshinSuccess > 0) {
      genshinString += `${genshinSuccess} <:checkgreen:1040257932580888687> `;
    }
    if (genshinError > 0) {
      genshinString += `${genshinError} <:crossmark:1040269404392407040> `;
    }

    embed.addFields({
      name: "Genshin Login",
      value: `${genshinString}`,
      inline: true,
    });
  }

  if (honkaiSuccess != 0 || honkaiError != 0) {
    var honkaiString = "";
    if (honkaiSuccess > 0) {
      honkaiString += `${honkaiSuccess} <:checkgreen:1040257932580888687> `;
    }
    if (honkaiError > 0) {
      honkaiString += `${honkaiError} <:crossmark:1040269404392407040> `;
    }

    embed.addFields({
      name: "Honkai Login",
      value: `${honkaiString}`,
      inline: true,
    });
  }

  if (totSuccess != 0 || totError != 0) {
    var totString = "";
    if (totSuccess > 0) {
      totString += `${totSuccess} <:checkgreen:1040257932580888687> `;
    }
    if (totError > 0) {
      totString += `${totError} <:crossmark:1040269404392407040> `;
    }

    embed.addFields({
      name: "Tears of Themis Login",
      value: `${totString}`,
      inline: true,
    });
  }

  var codes = "None";
  for (let i = 0; i < genshinRedeem.length; i++) {
    const code = genshinRedeem[i];
    if (i == 0) {
      codes = `${code} <:checkgreen:1040257932580888687>`;
    } else {
      codes += `, ${code} <:checkgreen:1040257932580888687>`;
    }
  }
  if (codes != "None") {
    embed.addFields({
      name: "Genshin Redeem",
      value: `${codes}`,
    });
  }

  return embed;
}
