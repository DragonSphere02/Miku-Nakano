const talkedRecently = new Set();
const Discord = require('discord.js')
const booru = require("booru")
module.exports = (client, message, args) => {
  if(talkedRecently.has(message.author.id)){
    message.reply('Espera **15 segundos** antes de volver a usar este comando. :D')
  } else {
  let tag = args.slice(0).join(' ');
  if(!tag) return message.reply('Puedes usar este comando de estas formas:\nPara agregar espacios es necesario añadir un **guión bajo.**\nEjemplo: `waifu2 nakano_miku`\n\nPara agregar tags es añadiendo **espacios.**\nEjemplo: `waifu2 eula_(genshin_impact) smile blue_hair`\n⚠ Los tags son en inglés.')
  if(tag.length > 256){
    let total = tag.length
    const titulo = new Discord.MessageEmbed()
    .setTitle('Eʀʀᴏʀ | Exᴄᴇsᴏ ᴅᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs.')
    .setDescription('Sólo se aceptan **256** caracteres en los tags.\nEscribiste un total de: ' + '**' + total + '**' + ' caracteres.')
    .setTimestamp()
    .setColor('RED')
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    return message.channel.send(titulo)
  }
  booru.search('sb', tag, {limit: 1, random: true}).then(posts => {
    for (let post of posts) {
      const embed = new Discord.MessageEmbed()
      .setAuthor(`Resultado de la búsqueda => ${tag}`, message.guild.iconURL({dynamic: true}))
      .setDescription(`**Tags:** ${post.tags}\n**Puntuación de usuarios:** ${post.score}\n**Sauce:** ${post.source}\n**Fecha:** ${post.createdAt}`)
      .setColor('RANDOM')
      .setImage(post.fileUrl)
      .setTimestamp()
      .setFooter(`Solicitado por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(embed).catch((e) => message.channel.send(`Hubo un error.\n${e}`))
      let servername = message.guild.name
          let serverid = message.guild.id
          let userid = message.author.id
          let autor = message.author.username
          const log = new Discord.MessageEmbed()
          .setTitle('Comando Logs')
          .setDescription('Se usó el comando `waifu2`')
          .addField('Usuario:', autor)
          .addField('User ID:', userid)
          .addField('Servidor:', servername)
          .addField('Server ID:', serverid)
          .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
          .setColor('RANDOM')
          .setFooter(servername, message.guild.iconURL())
          .setTimestamp()
          client.channels.cache.get(process.env.COMMAND).send(log)
          delete tag
          delete embed
          delete log
    }
  }).catch((e) => {
    message.channel.send(`Hubo un error.\n${e}`)
  })
  talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id)
  }, 7000);
  }
}