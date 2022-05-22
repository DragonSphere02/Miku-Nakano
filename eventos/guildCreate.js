const Discord = require('discord.js');
module.exports = (client, guild) => {
  client.channels.cache.get(process.env.SELOG).send(`Nuevo servidor: **${guild.name}** (ID: **${guild.id}**)\nEste servidor tiene: **${guild.memberCount}** miembros.\nAhora estoy en **_${client.guilds.cache.size}_** servidores.`)

  console.log(`Nuevo servidor: ${guild.name} (id: ${guild.id})\nEste servidor tiene: ${guild.memberCount} miembros\n`)
}