const talkedRecently = new Set();
const Discord = require('discord.js')
const { memeAsync } = require("memejs")
module.exports = (client, message) => {

  if(talkedRecently.has(message.author.id)){
    message.reply('¡¡Hey, no abuses de este comando!! >:(. Sólo lo puedes usar cada **10 segundos.**').then(message => {
      message.delete({ timeout: 10000 })
    }).catch(error => {console.log(error)})
  } else {
    message.channel.send('Buscando imagen...').then(message => {
      message.delete({ timeout: 2500 })
    })
    memeAsync('SpanishMeme').then(async m => {
      const embed = new Discord.MessageEmbed()
      .setAuthor('Meme', message.guild.iconURL({dynamic: true}))
      .setDescription(`[Descargar imagen](${m.url})`)
      .setColor('RANDOM')
      .setImage(m.url)
      .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
      .setTimestamp()
      await message.channel.send(embed).then(m => {
        m.react('👍')
        m.react('👎')
        m.react('😆')
      })
    }).catch((err) => {
      message.reply('**Ups...** pasó algo inesperado. Manda el siguiente mensaje a mi desarrollador.\n' + `**__Error:__** ${err}`)
      console.error(err)
    })

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id)
    }, 10000);

    let servername = message.guild.name
    let serverid = message.guild.id
    let userid = message.author.id
    let autor = message.author.username
    const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `meme`')
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