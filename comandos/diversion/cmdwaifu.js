const talkedRecently = new Set();
const {YamlDatabase} = require('wio.db');
const db = new YamlDatabase('premium');
const Discord = require('discord.js')
const { memeAsync } = require("memejs")
module.exports = (client, message) => {

  if(!db.has(`premium_${message.author.id}`)) {
    if(talkedRecently.has(message.author.id)){
      message.reply('Sólo puedes usar este comando cada **1 minuto.**')
    } else {
      message.channel.send('Buscando imagen...').then(message => {
        message.delete({ timeout: 2500 })
      })
      memeAsync('awwnime').then(async m => {
        let res = ('https://saucenao.com/search.php?db=999&url='+m.url)
        const embed = new Discord.MessageEmbed()
        .setAuthor('Waifu', message.guild.iconURL({dynamic: true}))
        .setDescription('Has obtenido:\n' + '**' + m.title + `**\n\n[Descargar imagen](${m.url}) | [Buscar sauce](${res})`)
        .setColor('RANDOM')
        .setImage(m.url)
        .setFooter(`solicitado por ${message.author.username}`, message.author.avatarURL())
        .setTimestamp()
        await message.channel.send(embed).then(m => {
          m.react('👍')
          m.react('❤')
          m.react('👎')
          delete res
          delete embed
          let servername = message.guild.name
          let serverid = message.guild.id
          let userid = message.author.id
          let autor = message.author.username
          const log = new Discord.MessageEmbed()
          .setTitle('Comando Logs')
          .setDescription('Se usó el comando `waifu`')
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
      }).catch((err) => {
        message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
      })
      talkedRecently.add(message.author.id);
      setTimeout(() => {
          talkedRecently.delete(message.author.id)
      }, 69000);
    }
  } else {
    if(talkedRecently.has(message.author.id)){
      message.reply('Espera **7 segundos** antes de volver a usar este comando. :D')
    } else {
      message.channel.send('Buscando imagen...').then(message => {
        message.delete({ timeout: 2500 })
      })
      memeAsync('awwnime').then(async m => {
        let res = ('https://saucenao.com/search.php?db=999&url='+m.url)
        const embed = new Discord.MessageEmbed()
        .setAuthor('Waifu', message.guild.iconURL({dynamic: true}))
        .setDescription('Has obtenido:\n' + '**' + m.title + `**\n\n[Descargar imagen](${m.url}) | [Buscar sauce](${res})`)
        .setColor('RANDOM')
        .setImage(m.url)
        .setFooter(`solicitado por ${message.author.username}`, message.author.avatarURL())
        .setTimestamp()
        await message.channel.send(embed).then(m => {
          m.react('👍')
          m.react('❤')
          m.react('👎')
          delete res
          delete embed
        })
      }).catch((err) => {
        message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
        console.error(err)
      })
      talkedRecently.add(message.author.id);
      setTimeout(() => {
          talkedRecently.delete(message.author.id)
      }, 7000);
    }

  }
}