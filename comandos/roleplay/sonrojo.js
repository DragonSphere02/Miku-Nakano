module.exports = async (client, message, args) => {
    const Discord = require('discord.js');
    let { gif } = require('./86!hsK4p%#K&fsEl.js');

    var server = message.guild;
    if (!server) return message.channel.send('¡Los gifs solo se pueden usar en un servidor! (・`ω´・)')
    let mencion = message.mentions.users.first()
    if(mencion === message.author) return message.reply('¿Cómo es que te vas a sonrojar a tí mism@? 🤔')
    if (!mencion) {
      let txt = args.join(' ')
      message.delete()
      const img = await gif('blush');
      const em = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} se sonrojó. (O///O)`)
        .setDescription(txt)
        .setColor('RANDOM')
        .setImage(img)
        .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
        .setTimestamp()
      message.channel.send(em).catch((err) => {
      message.reply('**Ups...** pasó algo inesperado. Manda el siguiente mensaje a mi desarrollador.\n' + `**__Error:__** ${err}`)
      console.error(err)
      })
    } else {
      let txt = args.slice(1).join(' ')
        message.delete()
        const img = await gif('blush');
        const em = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} sonrojó a ${mencion.username}. (O///O)`)
          .setDescription(txt)
          .setColor('RANDOM')
          .setImage(img)
          .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
          .setTimestamp()
        message.channel.send(em).catch((err) => {
      message.reply('**Ups...** pasó algo inesperado. Manda el siguiente mensaje a mi desarrollador.\n' + `**__Error:__** ${err}`)
      console.error(err)
      })
    }

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `sonrojo`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL())
    .setColor('RANDOM')
    .setFooter(servername, message.guild.iconURL({dynamic: true, size: 1024}))
    .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)
}