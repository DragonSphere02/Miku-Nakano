const Discord = require('discord.js');
const {YamlDatabase} = require('wio.db');
const db = new YamlDatabase('prefixes');

module.exports = (client, guild) => {
  if(db.fetch(`prefix_${guild.id}`) === null) {

    console.log(`Dejé el servidor: ${guild.name} (id: ${guild.id})`);

    client.channels.cache.get(process.env.SELOG).send(`Dejé el servidor: **${guild.name}** (ID: **${guild.id}**)\nAhora estoy en **_${client.guilds.cache.size}_** servidores.`)
  } else {
    db.delete(`prefix_${guild.id}`)
    console.log(`Dejé el servidor: ${guild.name} (id: ${guild.id}).\nEl prefix fue eliminado con éxito.`);

    client.channels.cache.get(process.env.SELOG).send(`Dejé el servidor: **${guild.name}** (ID: **${guild.id}**)\nAhora estoy en **_${client.guilds.cache.size}_** servidores.\nEl prefix fue eliminado con éxito.`)
  }
}