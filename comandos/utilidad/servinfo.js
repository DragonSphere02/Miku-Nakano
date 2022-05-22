module.exports = (client, message) => {
    const Discord = require('discord.js');
    var server = message.guild;
    if (!server) return message.channel.send(';;w;; ¡No puedo d-darte la información aquí, necesitas estar en un **servidor**! (・`ω´・)');
    const embed = new Discord.MessageEmbed()
      .setTitle("Iɴғᴏʀᴍᴀᴄɪᴏ́ɴ ᴅᴇʟ sᴇʀᴠɪᴅᴏʀ. ⚙")
      .setDescription("Estos son los datos del servidor. ^w^")
      .setAuthor(server.name, server.iconURL({dynamic: true, size: 1024}))
      .setThumbnail(server.iconURL({dynamic: true, size: 1024}))
      .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
      .setTimestamp()
      .addField('🌎 Región', server.region, true)
      .addField('📥 Miku ingresó', server.joinedAt.toDateString(), true)
      .addField('👥 Núm. Miembros', server.memberCount, true)
      .addField('🟢 ¿Servidor está online?', server.available, true)
      .addField('🛑 Nivel de verificación', server.verificationLevel, true)
      .addField('⚔ Núm. Roles', server.roles.cache.size, true)
      .addField('😀 Núm. Emojis', server.emojis.cache.size, true)
      .addField('🚀 Boost al servidor', server.premiumSubscriptionCount, true)
      .setColor('RANDOM')
      .addField('🔊 Usuarios en c. voz', server.voiceStates.cache.size, true)
      .addField('📆 Server creado', server.createdAt.toDateString(), true)
      .addField('🔈 Canal AFK', server.afkChannel, true)
      .addField('🕐 Tiempo para AFK', server.afkTimeout / 60 + ' minutos', true)
      .addField(`🔢 Núm. Canales (${server.channels.cache.size})`, `Categorías: **${server.channels.cache.filter(x => x.type === "category").size}**\nTexto: **${server.channels.cache.filter(x => x.type === "text").size}**\nVoz: **${server.channels.cache.filter(x => x.type === "voice").size}**`, true)
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
    .setDescription('Se usó el comando `servinfo`')
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