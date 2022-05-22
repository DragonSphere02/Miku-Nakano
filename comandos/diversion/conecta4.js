const Discord = require('discord.js')
module.exports = (client, message) => {
const game = require('./6fUYqCN&@VX3wm5c')
const Conecta4 = new game()

  if(message.mentions.users.first().bot) {
    return message.reply('No puedes jugar conmigo ni con otros bots.') // Su menciona a un bot
  }

Conecta4.iniciarJuego(message)

let servername = message.guild.name
let serverid = message.guild.id
let userid = message.author.id
let autor = message.author.username
const log = new Discord.MessageEmbed()
.setTitle('Comando Logs')
.setDescription('Se usó el comando `conecta4`')
.addField('Usuario:', autor)
.addField('User ID:', userid)
.addField('Servidor:', servername)
.addField('Server ID:', serverid)
.setImage(message.guild.iconURL({dynamic: true, size: 1024}))
.setColor('RANDOM')
.setFooter(servername, message.guild.iconURL())
.setTimestamp()
client.channels.cache.get(process.env.COMMAND).send(log)
delete log
}