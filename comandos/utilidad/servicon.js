module.exports = (client, message) => {
    const Discord = require('discord.js');

    var server = message.guild;
    if (!server) return message.channel.send(';;w;; ¡No puedo d-darte la información aquí, necesitas estar en un **servidor**! (・`ω´・)');
    if (message.guild.iconURL() === null) return message.reply('el servidor no tiene ícono. :(')
    const embed = new Discord.MessageEmbed()
      .setTitle('Iᴄᴏɴᴏ ᴅᴇʟ sᴇʀᴠɪᴅᴏʀ. 📷')
      .setDescription('Puedes hacer click en la imagen y descargar el ícono del servidor. 😊 🖼')
      .setColor('RANDOM')
      .setImage(message.guild.iconURL({ dynamic: true, format: "png", size: 4096 }))
      .setTimestamp()
      .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
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
    .setDescription('Se usó el comando `servicon`')
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