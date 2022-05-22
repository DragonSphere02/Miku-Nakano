const Discord = require('discord.js');
module.exports = async (client, message, args) => {
  let permsbot = message.guild.me.hasPermission("MANAGE_MESSAGES");
  if (!permsbot) return message.reply("No tengo permiso para eliminar mensajes, verifica que tengo activado el permiso de **gestionar mensajes**.")

  let perms = message.member.hasPermission("MANAGE_MESSAGES");
  if (!perms) return message.reply("No tienes permiso para eliminar mensajes.\nDebes tener el permiso de **gestionar mensajes**.")

  let cantidad = args[0]
  if (!args[0]) return message.reply("Debes escribir el **número** de mensajes a borrar.\nDebe ser **menor a 100** y **mayor a 0**.")
  if (isNaN(cantidad)) return message.reply('Debes ingresar **números**, no letras o símbolos.')
  cantidad = parseInt(cantidad)
  if (cantidad >= 100 || cantidad <= 0) return message.reply('el valor no es correcto.\nDebe ser **menor a 100** y **mayor a 0**.')

  try {
    await message.channel.bulkDelete(cantidad + 1)
    let servername = message.guild.name
    let serverid = message.guild.id
    let userid = message.author.id
    let autor = message.author.username
    const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `borrar`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
    .setColor('RANDOM')
    .setFooter(servername, message.guild.iconURL())
    .setTimestamp()
    client.channels.cache.get(process.env.COMMAND).send(log)
  } catch (err) {
    return message.reply('`Error` | Sólo puedes borrar mensajes que **no excedan los 14 días.** O **no tengo permisos** suficientes para borrar mensajes en este canal.\nRevisa la configuración del canal si los mensajes no son mayores a 14 días.')
    console.error(err)
  } 
  message.channel.send(({
    embed: {
      color: 751684,
      description: "**Bᴏʀʀᴀʀ ᴍᴇɴsᴀᴊᴇs**❗\nHe borrado " + cantidad + " mensaje(s). 🗑",
      timestamp: new Date(),
      footer: {
        icon_url: message.author.displayAvatarURL({dynamic: true}),
        text: `Mensaje(s) borrado(s) por ${message.author.username}`
      }
    }
  })).then(message => {
    message.delete({ timeout: 5000 })
  }).catch((err) => {
    message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
    console.error(err)
  })
}