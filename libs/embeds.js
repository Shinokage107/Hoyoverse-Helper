const { EmbedBuilder } = require("discord.js");

module.exports = {
  loginEmbed: loginEmbed,
  codeRedeemEmbed: codeRedeemEmbed,
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
    .addDescription(`I redeemed a code for u! => ${code}`)
    .setTimestamp();

  return embed;
}
