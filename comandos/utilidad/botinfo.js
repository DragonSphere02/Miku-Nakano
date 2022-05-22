module.exports = (client, message) => {
  const Discord = require('discord.js');
  const moment = require("moment");
  require("moment-duration-format");

  let ping = Math.floor(message.client.ws.ping);
  const actividad = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");
  const embed = new Discord.MessageEmbed()
  .setTitle("Iɴғᴏʀᴍᴀᴄɪᴏ́ɴ ᴅᴇʟ ʙᴏᴛ. 🤖")
  .setDescription("Esta es la información acerca de mi. ♪(^∇^*)")
  .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
  .setThumbnail(client.user.avatarURL())
  .setFooter(`Solicitado por ${message.author.username} | ¡Gracias por añadir a Miku!`, message.author.avatarURL({dynamic: true}))
  .setTimestamp()
  .addField('👤 Autor', 'DragonSh#0458', true)
  .addField('</> Desarrollador', '꧁๔คгкภєรร꧂#1226', true)
  .addField('<../> Lenguaje', 'JavaScript', true)
  .addField('🌐 Entorno', 'Node.js\nVersión: 12.22.1', true)
  .addField('📚 Librería', 'Discord.js\nVersión: 12.4.1', true)
  .addField(`🛰 Servidores`, client.guilds.cache.size, true)
  .addField('#️⃣ Canales', client.channels.cache.size, true)
  .addField('🚀 Ping', +ping + ' ms', true)
  .addField('💾 Memoria Usada', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' Mb', true)
  .addField('🕐 Tiempo activa', actividad, true)
  .addField('📤 Última actualización', '03/Feb/2022', true)
  .addField('💠 Versión de Miku', '2.9.0', true)
  .addField('📡 Servidor de soporte', `[🌟 La Casa Nakano 🌟]()`, true)
  .setColor("RANDOM")
  message.channel.send(embed).catch((err) => {
    message.reply('**Ups...** pasó algo inesperado. Manda el siguiente mensaje a mi desarrollador.\n' + `**__Error:__** ${err}`)
    console.error(err)
  })

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `botinfo`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
    .setColor('RANDOM')
    .setFooter(servername, message.guild.iconURL())
    .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)
}