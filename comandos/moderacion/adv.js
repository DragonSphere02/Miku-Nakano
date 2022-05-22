const {YamlDatabase} = require('wio.db');
const db = new YamlDatabase('advertencias');
const Discord = require('discord.js')
module.exports = async (client, message, args) => {
  
  //Permisos
  if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply('Necesitas el permiso de **banear miembros.**');
  if (!message.member.hasPermission('KICK_MEMBERS'))return message.reply('Necesitas el permiso de **expulsar miembros.**');
  
  // Usuario y razón
  let user = message.mentions.members.first();
  let owner = message.guild.ownerID
  let razon = args.slice(1).join(' ');
  
  if(message.mentions.users.size < 1) return message.reply('Menciona a un usuario.') // Si np menciona usuario
  if(message.mentions.users.first().bot) {
    return message.reply('No puedes dar warns a bots.') // Su menciona a un bot
  }

  if(user == owner) {
    return message.reply('No puedes darle warn al admin.') // Si andan de troll con el admin
  }

  if(message.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return message.reply("**No** puedes dar advertencias a ese miembro, puede que tenga un **rol igual o superior** al tuyo.")

  if(!razon) return message.reply('Escribe la razón.') // Si no escribe la razón
  
  if(message.author.id === user.id) {
    return message.reply('No te puedes dar warn a tí mismo.') // Si anda de troll o de tester
  }
  
  let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`) // La db que contiene los warns
  
  if(warnings === 3) {
    return message.reply(`¡${user} ya tiene 3 warns!`) // Si los warns ya son 3
  }

  const embed = new Discord.MessageEmbed() // Lo que se envía al canal
  .setAuthor('Nueva advertencia. ⚠', message.guild.iconURL({dynamic: true}))
  .setColor('YELLOW')
  .setDescription(`👤 ${user} ha obtenido una **advertencia.**\n💬 **Razón:** ${razon}`)
  .setFooter(`Advertencia por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
  .setTimestamp()

  const DM = new Discord.MessageEmbed() // Lo que se envía por DM
  .setAuthor(`Nueva advertencia en ${message.guild.name}`, message.guild.iconURL({dynamic: true}))
  .setColor('YELLOW')
  .setDescription(`👤 Has obtenido una **advertencia.**\n💬 **Razón:** ${razon}`)
  .setFooter(`Advertencia por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
  .setTimestamp()
    
  if(warnings === null) { // Si no tiene warns
    db.add(`warns_${message.guild.id}_${user.id}`, 1)
    db.push(`razon_${message.guild.id}_${user.id}`, razon)
    try { // Trata de enviar el DM
      await user.send(DM)
    } catch(e) { // Si no puede enviar el DM
      return message.channel.send(e)
    }
    await message.channel.send(embed) // Envía al canal
  } else if (warnings !== null) { // Si ya tiene warns anteriores
    db.add(`warns_${message.guild.id}_${user.id}`, 1)
    db.push(`razon_${message.guild.id}_${user.id}`, razon)
    try { // Trata de enviar el DM
      await user.send(DM) //
    } catch(e) { // Si no puede envia DM
      return message.channel.send(e)
    }
    await message.channel.send(embed) // Envia al canal
  }

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
  .setTitle('Comando Logs')
  .setDescription('Se usó el comando `adv`')
  .addField('Usuario:', autor)
  .addField('Razón:', razon)
  .addField('User ID:', userid)
  .addField('Servidor:', servername)
  .addField('Server ID:', serverid)
  .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
  .setColor('RANDOM')
  .setFooter(servername, message.guild.iconURL())
  .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)

}