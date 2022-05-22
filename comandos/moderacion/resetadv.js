const {YamlDatabase} = require('wio.db');
const db = new YamlDatabase('advertencias'); // Librerías, llamamos y creamos una db 
const Discord = require('discord.js')

module.exports = async (client, message) => {

   //Permisos
  if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply('Necesitas el permiso de **banear miembros.**');
  if (!message.member.hasPermission('KICK_MEMBERS'))return message.reply('Necesitas el permiso de **expulsar miembros.**');

  // Usuarios
  let user = message.mentions.members.first()
  let owner = message.guild.ownerID
  if(!user) return message.reply('Debes mencionar a alguien.')

  if(user == owner) {
    return message.reply('El/la admin no puede tener warns.') // Si andan de troll con el admin
  }

  if(message.author.id === user.id) {
    return message.reply('Puede que tengas permiso de dar warns, pero **no** puedes borrar tus warns. Solamente el/la **admin** o alguien con un **rol mayor** al tuyo puede hacerlo.') // Si anda de troll o de tester
  }

  // Troll con bots
  if(message.mentions.users.first().bot) return message.reply('Los bots somos inmunes a las advertencias. UwU')

  if(message.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return message.reply("**No** puedes borrar las advertencias a ese miembro, puede que tenga un **rol igual o superior** al tuyo.")

  // Llamamos la db
  let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`)

  // Si no hay retorna
  if(warnings === null) {
    return message.reply(`${user} no tiene warns`)
  }

  // Si hay, los borra
  await db.delete(`warns_${message.guild.id}_${user.id}`)
  await db.delete(`razon_${message.guild.id}_${user.id}`)

  // Mensaje para el canal
  const channel = new Discord.MessageEmbed()
  .setAuthor(`Reseteo de advertencias.`, message.guild.iconURL({dynamic: true}))
  .setColor('GREEN')
  .setDescription(`✅ Se han eliminado las advertencias de ${user}.`)
  .setFooter(`Eliminados por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
  .setTimestamp()

  // Mensaje para DM
  const DM = new Discord.MessageEmbed()
  .setAuthor(`Reseteo de advertencias en ${message.guild.name}`, message.guild.iconURL({dynamic: true}))
  .setColor('GREEN')
  .setDescription(`✅ Se han eliminado tus advertencias.`)
  .setFooter(`Eliminados por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
  .setTimestamp()

  try { // Trata de enviar el msj
  await user.send(DM)
  } catch(e) { // Si no puede retirna
      return message.channel.send(e)
  }
  await message.channel.send(channel) // Envia el msj al canal

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
  .setTitle('Comando Logs')
  .setDescription('Se usó el comando `resetadv`')
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