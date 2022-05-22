const Discord = require('discord.js')
module.exports = (client, message, args) => {

  let text = args.join(' ')
  if (!text) return message.reply('debes escribir el mensaje que quieres que diga.')

  if(text.length >= 2048){
    let total = text.length
    const titulo = new Discord.MessageEmbed()
    .setTitle('Eʀʀᴏʀ | Exᴄᴇsᴏ ᴅᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs.')
    .setDescription('Sólo se aceptan **2048** caracteres en el mensaje.\nEscribiste un total de: ' + '**' + total + '**' + ' caracteres.')
    .setTimestamp()
    .setColor('RED')
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    return message.channel.send(titulo)
  }

  message.delete();
  const embed = new Discord.MessageEmbed()
  .setDescription(text)
  .setTimestamp()
  .setColor('RANDOM')
  message.channel.send(embed).catch((err) => {
    message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
    console.error(err)
  })


  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
  .setTitle('Comando logs - Embed')
  .setDescription(text)
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