const Discord = require('discord.js')
const TicTacToe = require('discord-tictactoe')
const game = new TicTacToe({ language: 'es'})
const {YamlDatabase} = require('wio.db')
const db = new YamlDatabase('blacklist')
module.exports = (client, message) => {

  /*if(db.exists(`blacklist_${message.guild.id}`)) return message.channel.send('El servidor no tiene acceso a este comando debido a su abuso.\nSolicita el desbloqueo en el servidor de soporte.')*/

  if(message.mentions.users.first()) {
    return message.reply('🤦‍♀️ ¿En que parte del comando dice que puedes jugar con alguien?') // Su menciona a un usuario
  }

  game.handleMessage(message)

  let servername = message.guild.name
    let serverid = message.guild.id
    let userid = message.author.id
    let autor = message.author.username
    const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `ttt`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
    .setColor('RANDOM')
    .setFooter('C-ID:' + message.channel.id)
    .setTimestamp()
    client.channels.cache.get(process.env.COMMAND).send(log)
}