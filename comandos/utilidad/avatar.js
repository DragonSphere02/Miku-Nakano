module.exports = (client, message, args) => {
    const Discord = require('discord.js')
    var server = message.guild;
      if (!server) return message.channel.send('¡No puedes usar ese comando aquí, necesitas estar en un **servidor**! (・`ω´・)');
      let miembro = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      if (miembro.avatarURL() === null) return message.reply(`**¡Ups!**, ${miembro.username} no tiene avatar :(.`)
      if (miembro) {
        const embed = new Discord.MessageEmbed()
          .setTitle(`Avatar de ${miembro.username}. 🖼`)
          .setDescription(`\n[Descargar Avatar](${miembro.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 4096
          })})`)
          .setImage(`${miembro.avatarURL({ dynamic: true, format: "png", size: 4096 })}`)
          .setColor('RANDOM')
          .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
          .setTimestamp()
        message.channel.send(embed).then(m => {
          m.react('❤')
          m.react('👎')
        }).catch((err) => {
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
    .setDescription('Se usó el comando `avatar`')
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