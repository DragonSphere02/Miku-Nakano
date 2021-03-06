const {YamlDatabase} = require('wio.db');
const db = new YamlDatabase('prefixes');
const db2 = new YamlDatabase('blacklist')
module.exports = (client, message) => {

  //Evita que el bot responda a otros//
  if(message.author.bot) return;
  if(!message.guild) return

  //Prefix
  const prefix = db.fetch(`prefix_${message.guild.id}`) || '!-'

  let RegMention = new RegExp(`^<@!?${client.user.id}>( |)$`); //Este es el RegExp que utilizaremos
  if (message.content.match(RegMention)) { //Creamos la condicional
    message.reply(`¡Hola! :3, Mi prefix es: **${prefix}**\nPara lista de comandos usa: **${prefix}ayuda**\n🎧🌟`)
  }

  //Evita que el bot responda a otros//
  if(!message.content.startsWith(prefix)) return;

  //Definición de los comandos//
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

/*
  if (message.author.id !== 'id') {  
    return message.channel.send('Estoy en mantenimiento, por lo tanto no puedes usar mis comandos. Vuelve más tarde c:')
  }*/

  if(db2.exists(`blacklist_${message.guild.id}`)) return message.channel.send('El servidor ha quedado **bloqueado permanentemente.**')

  //Manejo de los eventos//
  let cmd = client.comandos.get(command);
  if (!cmd) return;
  //Ejecutor de de los comandos enviados al --client-- mensaje y argumentos//
  cmd(client, message, args);
}