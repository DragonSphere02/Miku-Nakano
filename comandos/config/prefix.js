const Discord = require('discord.js')
const {YamlDatabase} = require('wio.db');
const db = new YamlDatabase('prefixes'); // Librerías, llamamos y creamos una db 
module.exports = async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Solo el o la admin del servidor puede cambiar el prefix.') // Si no tiene permisos de admin

  if(!args[0]) return message.reply('¿Cuál será mi nuevo prefix?') // Si no agrega argumentos

  if(args[1]) return message.reply('No puedes agregar más de 2 argumentos.') // Si pone espacio para agregar más texto

  if(args[0] === db.get(`prefix_${message.guild.id}`)) return message.reply('Ya tengo ese prefix.') // Si trata de agregar el mismo prefix de nuevo

  if(args[0] === '!-') return message.reply('No puedes agregar mi prefix por default.') // Si trata de agregar el prefix por default

  if(args[0] === 'reset') { // Si el comando es reset
    if(db.get(`prefix_${message.guild.id}`) === null) { // Si pone reset pero no hay nada agregado... 
        return message.reply('No tienes prefix agregado.') // Retorna
    } else {
      db.delete(`prefix_${message.guild.id}`) // Si hay datos registrados, lo borra

      const embed = new Discord.MessageEmbed()
      .setAuthor(`Cambio de prefix.`, message.guild.iconURL({dynamic: true}))
      .setColor('RANDOM')
      .setDescription(`✅ | Mi prefix volvió a ser: **!-**`)
      .setFooter(`Cambio de prefix por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      await message.reply(embed)
      delete embed 
      
      let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `prefix reset`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
    .setColor('RANDOM')
    .setFooter(servername, message.guild.iconURL())
    .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)
      return undefined;
    }
  }

  if(args[0].length > 3) return message.reply('Mi nuevo prefix no puede exceder los **3 caracteres.**') // Si el argumento es más alla de 3 caracteres

  db.set(`prefix_${message.guild.id}`, args[0]) // Si cumple ok, lo agrega

  const embed = new Discord.MessageEmbed()
  .setAuthor(`Cambio de prefix.`, message.guild.iconURL({dynamic: true}))
  .setColor('RANDOM')
  .setDescription(`✅ | Ahora mi nuevo prefix es: **${args[0]}**\nSi olvidas mi prefix, sólo mencióname. 🌸`)
  .setFooter(`Cambio de prefix por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
  .setTimestamp()
  await message.channel.send(embed) // Mensaje de confirmación
  delete embed;

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `prefix`')
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