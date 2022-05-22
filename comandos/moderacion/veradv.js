const {YamlDatabase} = require('wio.db');
const db = new YamlDatabase('advertencias'); // Librerías, llamamos y creamos una db 
const Discord = require('discord.js')

module.exports = async (client, message) => {

  //Permisos
  if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply('Necesitas el permiso de **banear miembros.**');
  if (!message.member.hasPermission('KICK_MEMBERS'))return message.reply('Necesitas el permiso de **expulsar miembros.**');

  //Usuario
  let user = message.mentions.members.first()
  let owner = message.guild.ownerID
  if(!user) return message.reply('Menciona a un usuario.') // Si no menciona usuario

  if(message.mentions.users.first().bot) {
    return message.reply('Nosotros los bots somos inmunes a las advertencias. UwU') // Su menciona a un bot
  }

  if(user == owner) {
    return message.reply('El/la admin no puede tener warns.') // Si andan de troll con el admin
  }

  if(message.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return message.reply("**No** puedes ver las advertencias a ese miembro, puede que tenga un **rol igual o superior** al tuyo.")

  let warns = db.fetch(`razon_${message.guild.id}_${user.id}`)
  let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`)

  if(warnings === null) {
    return message.reply(`${user} no tiene warns`)
  } else {
    const datos = new Discord.MessageEmbed()
    .setAuthor(`Datos de advertencias.`, message.guild.iconURL({dynamic: true}))
    .setColor('RANDOM')
    .setDescription(`👤 **Miembro:** ${user}\n🔢 **Número de advertencias:** ${warnings}\n⚠ **Razones:\n** ${warns.join('\n')}`)
    .setFooter(`Solicitado por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    message.channel.send(datos)
  }

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
  .setTitle('Comando Logs')
  .setDescription('Se usó el comando `veradv`')
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