const Discord = require('discord.js');
module.exports = async (client, message, args) => {
  const Canal = message.mentions.channels.first() || message.guild.channels.cache.find(e => e.id == args[0]);
    
  //Permiso para el usuario
  if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply('Dado a que este es un comando exclusivo para que admins y mods publiquen actualizaciones, debes tener **activado** el permiso de **banear miembros** y **expulsar miembros**.');
  if (!message.member.hasPermission('KICK_MEMBERS'))return message.reply('Dado a que este es un comando exclusivo para que admins y mods publiquen actualizaciones, debes tener **activado** el permiso de **banear miembros** y **expulsar miembros**.');
  //Si no menciona canal
  if (!Canal) {
    const nocanal = new Discord.MessageEmbed()
    .setTitle('Eʀʀᴏʀ | Cᴀɴᴀʟ.')
    .setDescription('¿Cuál será el **canal** donde irá el anuncio?\n**Menciona** el canal o **escribe** la ID.')
    .addField('NOTA:', 'Es obligatorio escribir **|** para separar las categorías, así como también **agregar un espacio** entre ellas.')
    .addField('Ejemplo con imagen:', '`!-anuncio #canal Título | Mensaje | URL a imagen`')
    .addField('Ejemplo sin imagen:', '`!-anuncio #canal Título | Mensaje`')
    .addField('NOTAS ADICIONALES:', '⬇')
    .setImage('https://cdn.discordapp.com/attachments/781784051505823744/797391960364285993/unknown.png')
    .setTimestamp()
    .setColor('RED')
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    return message.channel.send(nocanal);
  }

  //Argumentos para el mensaje
  const cmd = args.slice(1).join(' ').split(' | ');

  //Si no hay titulo
  if(!cmd[0]) {
    const notitulo = new Discord.MessageEmbed()
    .setTitle('Eʀʀᴏʀ | Tɪ́ᴛᴜʟᴏ.')
    .setDescription('Debes de **escribir** el título.\n**Recuerda** que **NO** puedes colocar enlaces, o menciones.')
    .addField('NOTA:', 'Es obligatorio escribir **|** para separar las categorías, así como también **agregar un espacio** entre ellas.')
    .addField('Ejemplo con imagen:', '`!-anuncio #canal Título | Mensaje | URL a imagen`')
    .addField('Ejemplo sin imagen:', '`!-anuncio #canal Título | Mensaje`')
    .addField('NOTAS ADICIONALES:', '⬇')
    .setImage('https://cdn.discordapp.com/attachments/781784051505823744/797391960364285993/unknown.png')
    .setTimestamp()
    .setColor('RED')
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    return message.channel.send(notitulo);
  }
  //Si excede caracteres en el titulo
  if(cmd[0].length >= 256){
    let total = cmd[0].length
    const titulo = new Discord.MessageEmbed()
    .setTitle('Eʀʀᴏʀ | Exᴄᴇsᴏ ᴅᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs.')
    .setDescription('Sólo se aceptan **256** caracteres en el titulo.\nEscribiste un total de: ' + '**' + total + '**' + ' caracteres.\nPor favor, escribe un título más corto.')
    .setTimestamp()
    .setColor('RED')
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    return message.channel.send(titulo)
  }
    
  //Si no hay mensaje
  if(!cmd[1]) {
    const nomsj = new Discord.MessageEmbed()
    .setTitle('Eʀʀᴏʀ | Mᴇɴsᴀᴊᴇ.')
    .setDescription('Debes de **escribir** el cuerpo del mensaje.\nMás información útil en la **imagen**.')
    .addField('NOTA:', 'Es obligatorio escribir **|** para separar las categorías, así como también **agregar un espacio** entre ellas.')
    .addField('Ejemplo con imagen:', '`!-anuncio #canal Título | Mensaje | URL a imagen`')
    .addField('Ejemplo sin imagen:', '`!-anuncio #canal Título | Mensaje`')
    .addField('NOTAS ADICIONALES:', '⬇')
    .setImage('https://cdn.discordapp.com/attachments/781784051505823744/797391960364285993/unknown.png')
    .setTimestamp()
    .setColor('RED')
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    return message.channel.send(nomsj);
  }

  //Si excede caracteres en el mensaje
  if(cmd[1].length >= 2048){
    let total = cmd[1].length
    const titulo = new Discord.MessageEmbed()
    .setTitle('Eʀʀᴏʀ | Exᴄᴇsᴏ ᴅᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs.')
    .setDescription('Sólo se aceptan **2048** caracteres en el mensaje.\nEscribiste un total de: ' + '**' + total + '**' + ' caracteres.\nPor favor, acorta más el mensaje o escribe 2 anuncios.')
    .setTimestamp()
    .setColor('RED')
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    return message.channel.send(titulo)
  }

  //Vista previa
  const previo = new Discord.MessageEmbed()
  .setTitle('Vista previa - ' + cmd[0])
  .setColor('RANDOM')
  .setDescription(cmd[1])
  .setImage(cmd[2])
  .setTimestamp()
  .addField('\u200B', '---------------------------------------------')
  .addField('Revisa que todo esté en orden. 😊', `**¡¡Sólo tienes 4 minutos para confirmar!!**\nCanal de destino: ${Canal}`)
  .setFooter('Si hay algún error, ¡no podrás editar el embed!', client.user.avatarURL())
  message.delete();
  message.channel.send(previo).then(emoji => {
    emoji.react('✅');
    emoji.react('❎');
    //Filtra para que solo pueda reaccionar el autor del mensaje
    const Filtro = function(reaction, user) {
      return ['✅', '❎'].includes(reaction.emoji.name) && user.id == message.author.id;
    }
    //Si el tiempo se agota
    emoji.awaitReactions(Filtro, { max: 1, time: 240000, errors: ['time'] }).catch(function() {
      const tempo = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle('Cᴀɴᴄᴇʟᴀᴅᴏ | Tɪᴇᴍᴘᴏ ᴇxᴄᴇᴅɪᴅᴏ ⌛')
      .setDescription('Se ha **_agotado_** el tiempo para confirmar el envío. He **cancelado el anuncio.**')
      .setColor('RANDOM')
      .setTimestamp()
      emoji.edit(tempo);
    }).then(c => {
      const reaccion = c.first();
      // reaccion es el primer emoji al que reaccionan
      if (reaccion.emoji.name === '✅') {
        //Si confirma, será el mensaje en el canal que se envió
        let Confirmo = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setTitle('📢 Nᴜᴇᴠᴏ ᴀɴᴜɴᴄɪᴏ | Cᴏɴғɪʀᴍᴀᴄɪᴏ́ɴ ✅')
        .setDescription('La noticia fue enviada con **éxito** a ' + Canal.toString())
        .setColor('RANDOM')
        .setFooter(`Anuncio enviado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
        .setTimestamp()
        emoji.edit(Confirmo).catch((e) => emoji.channel.send('Algo salió mal... copia este mensaje y envíalo al desarrollador.\n' + e))
     
        //Será el mensaje que escribió el autor
        const anuncio = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
        .setTitle('📢 | ' + cmd[0])
        .setColor('RANDOM')
        .setDescription(cmd[1])
        .setImage(cmd[2])
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.avatarURL())
        
        Canal.send(anuncio).catch((e) => {
          let error = new Discord.MessageEmbed()
          .setTitle('❎ | Error')
          .setColor('RED')
          .setDescription(`Ha ocurrido un error al enviar el anuncio... ¿Tienes los permisos para que pueda enviar mensajes?\n**${e}**`)
          .setTimestamp()
          .setFooter(`Revisa la configuración de los canales.`, client.user.avatarURL())
          emoji.edit(error)
        })
      } else if (reaccion.emoji.name === '❎') {
        //Si reacciona para cancelar
        let NoConfirmo = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
        .setTitle('Cᴀɴᴄᴇʟᴀᴄɪᴏ́ɴ ❎')
        .setDescription('**Has cancelado** el envío del anuncio.')
        .setFooter(`Anuncio cancelado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
        .setColor('RANDOM')
        .setTimestamp()
        emoji.edit(NoConfirmo);
      }
    })
  })
  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  let titulo = cmd[0]
  let des = cmd[1]
  let img = cmd[2]
  const log = new Discord.MessageEmbed()
  .setTitle(titulo)
  .setDescription(des)
  .addField('Usuario:', autor)
  .addField('User ID:', userid)
  .addField('Servidor:', servername)
  .addField('Server ID:', serverid)
  .setImage(img)
  .setColor('RANDOM')
  .setFooter(`Comando anuncio`, message.guild.iconURL({dynamic: true}))
  .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)
}