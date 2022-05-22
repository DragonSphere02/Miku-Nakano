const talkedRecently = new Set();

module.exports = (client, message, args) => {
  const Discord = require('discord.js')

  if(talkedRecently.has(message.author.id)){
    message.reply('¡¡Hey, no abuses de este comando!! >:(. Sólo lo puedes usar cada **3 segundos.**').then(message => {
      message.delete({ timeout: 3000 })
    }).catch(error => {console.log(error)})
  } else {
  let text = args.join(' ')
  if (!text) return message.reply('debes escribir el mensaje que quieres que diga.')

  message.delete();
  message.channel.send(text).catch((err) => {
    message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
    console.error(err)
  })

  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id)
  }, 3000);

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
  .setTitle('Comando Logs')
  .setDescription('Se usó el comando `decir`')
  .addField('Mensaje', text)
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
}