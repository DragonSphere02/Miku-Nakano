module.exports = (client, message, args) => {
  const Discord = require('discord.js');
  const translate = require('node-google-translate-skidz');
  const mal = require("mal-scraper");
  var server = message.guild;
  if (!server) return message.channel.send('¡No puedes usar ese comando aquí, necesitas estar en un **servidor**! (・`ω´・)');
  let name = args.slice(0).join(' ');
  if (!name) return message.reply("Escribe el nombre de un anime.")
  try {
  mal.getInfoFromName(name).then((data) => {
    translate({text: data.synopsis, source: 'en',target: 'es'}, function(res) {
      translate({text: data.status, source: 'en',target: 'es'}).then((res1) => {
      translate({text: data.aired, source: 'en',target: 'es'}).then((res2) => {
      translate({text: data.broadcast, source: 'en',target: 'es'}).then((res3) => {
      translate({text: data.scoreStats, source: 'en',target: 'es'}).then((basado) => {
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${data.title}`)
      .setURL(data.url)
      .setDescription(`📄 **Sinopsis:**\n${res}`)
      .addField('📡 Estatus del anime:', `*${res1}*.`)
      .addField('📝 Detalles:', `> **Título en Inglés:** ${data.englishTitle}\n> **Sinónimos:** ${data.synonyms}\n> **Tipo:** ${data.type}\n> **Episodios:** ${data.episodes}\n> **Emisión:** ${res2}\n> **Transmisión:** ${res3}`)
      .addField('📝 Detalles adicionales:', `> **Géneros:** ${data.genres}\n> **Puntuación:** ${data.score}, ${basado}\n> **Popularidad:** ${data.popularity}`)
      .setImage(`${data.picture}`)
      .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
      .setTimestamp()
      message.channel.send(embed)}).catch((err) => {
        return message.reply('**Ups...** No encontré información suficiente de lo que buscas. Perdón.... Intenta con otro nombre. 😞').then()}).catch((err) => {
          return message.reply('**Ups...** No encontré información suficiente de lo que buscas. Perdón... Intenta con otro nombre. 😞')}).then()}).catch((err) => {
            return message.reply('**Ups...** No encontré información suficiente de lo que buscas. Perdón... Intenta con otro nombre. 😞')}).then()}).catch((err) => {
              return message.reply('**Ups...** No encontré información suficiente de lo que buscas. Perdón... Intenta con otro nombre. 😞')}).then()}).catch((err) => {
                return message.reply('**Ups...** No encontré información suficiente de lo que buscas. Perdón... Intenta con otro nombre. 😞')}).then() 
              })
              let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `anime`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
    .setColor('RANDOM')
    .setFooter(servername, message.guild.iconURL())
    .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)
  })
  } catch(err) {
    message.reply('**Ups...** No encontré información suficiente de lo que buscas. Perdón... 😞')
  } 
}