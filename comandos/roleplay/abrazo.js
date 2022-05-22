module.exports = async (client, message, args) => {
  const Discord = require('discord.js');
  let { gif }  = require('./86!hsK4p%#K&fsEl.js');

  var server = message.guild;
  if (!server) return message.channel.send('¡Los gifs solo se pueden usar en un servidor! (・`ω´・)')

  let mencion = message.mentions.users.first()
  if (!mencion) return message.reply('¡debes mencionar a alguien!')
  if(mencion === message.author) return message.reply('¿Te vas a abrazar a ti mism@?\nVeo que estás muy sól@. :(')

  let txt = args.slice(1).join(' ')
  message.delete();
  const img = await gif('hug');
  const em = new Discord.MessageEmbed()
  .setTitle(`${message.author.username} abrazó a ${mencion.username}. (p≧w≦q)`)
  .setDescription(txt)
  .setColor('RANDOM')
  .setImage(img)
  .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
  .setTimestamp()
  message.channel.send(em).catch((err) => {
    message.reply('**Ups...** pasó algo inesperado. Manda el siguiente mensaje a mi desarrollador.\n' + `**__Error:__** ${err}`)
    console.error(err)
  })

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
  .setTitle('Comando Logs')
  .setDescription('Se usó el comando `abrazo`\n**Texto: **'+ txt)
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