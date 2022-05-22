const { MessageEmbed } = require('discord.js')
const {YamlDatabase} = require('wio.db');
const despedida = new YamlDatabase('despedidasc')
const despedida2 = new YamlDatabase('despedidast')
module.exports = (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Solo el/la admin del servidor puede configurar las despedidas.')

  if(!args[0]) return message.reply('Escribe si vas a editar el canal o el mensaje.\n**Ejemplo:** `despedida canal #canal`')
  if(args[0] === 'canal') {
    const Canal = message.mentions.channels.first() || message.guild.channels.cache.find(e => e.id == args[1]);
    if(!Canal) return message.reply('Debes mencionar el canal donde daré las despedidas. :)')
    let canales = despedida.fetch(`bye_${message.guild.id}`)
    if(canales === null) {
      despedida.set(`bye_${message.guild.id}`, Canal.id)
      message.reply('✅ | El canal ha sido registrado.\nVerifica que tenga los **permisos activados de ese canal** para poder mandar mensajes.')
    } else {
      despedida.delete(`bye_${message.guild.id}`)
      despedida.set(`bye_${message.guild.id}`, Canal.id)
      message.reply('✅ | El canal ha sido actualizado con éxito.\nVerifica que tenga los **permisos activados de ese canal** para poder mandar mensajes.')
    }
  }
  if(args[0] === 'mensaje') {
    let txt = args.slice(1).join(' ')
    if(!txt) return message.reply('Debes colocar el mensaje de despedida.')
    if(txt.length > 300){
      let total = txt.length
      const titulo = new MessageEmbed()
      .setTitle('Eʀʀᴏʀ | Exᴄᴇsᴏ ᴅᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs.')
      .setDescription('Sólo se aceptan **300** caracteres en el mensaje.\nEscribiste un total de: ' + '**' + total + '**' + ' caracteres.\nEscribe un mensaje más corto.')
      .setTimestamp()
      .setColor('RED')
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      return message.channel.send(titulo)
    }
    let texto = despedida2.fetch(`txt_${message.guild.id}`)
    if(texto === null) {
      despedida2.push(`txt_${message.guild.id}`, txt)
      message.reply('✅ | El mensaje ha sido registrado.')
    } else {
      despedida2.delete(`txt_${message.guild.id}`)
      despedida2.push(`txt_${message.guild.id}`, txt)
      message.reply('✅ | El mensaje ha sido actualizado con éxito.')
    }
    let servername = message.guild.name
    let serverid = message.guild.id
    let userid = message.author.id
    let autor = message.author.username
    const log = new MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `despedida`')
    .addField('Mensaje', txt)
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
  if(args[0] === 'borrar') {
    let canales = despedida.fetch(`bye_${message.guild.id}`)
    let text = despedida2.fetch(`txt_${message.guild.id}`)
    if(canales === null && text === null) {
      return message.reply('No tienes datos guardados.')
    } else if(canales !== null && text === null) {
      despedida.delete(`bye_${message.guild.id}`)
      return message.reply('He borrado el canal con éxito.')
    } else if(canales === null && text !== null) {
      despedida2.delete(`txt_${message.guild.id}`)
      return message.reply('He borrado el mensaje con éxito.')
    } else {
      despedida2.delete(`txt_${message.guild.id}`)
      despedida.delete(`bye_${message.guild.id}`)
      message.reply('✅ | Los datos han sido borrados con éxito y las despedidas están desactivadas.')
    
    }
  }
}