const Discord = require('discord.js');
module.exports = (client, message, args) => {
  let user = message.mentions.members.first()
  let razon = args.slice(1).join(' ');

  let permsbot2 = message.guild.me.hasPermission("MANAGE_MESSAGES");
  if(!permsbot2) return message.reply('Necesito tener el permiso de **gestionar mensajes**.');
  let permsbot = message.guild.me.hasPermission("BAN_MEMBERS");
  if (!permsbot) return message.reply(";;w;; Etto... N-no tengo permiso para banear miembros, verifica que tengo activado el permiso de **banear miembros**.");

  let perms = message.member.hasPermission("BAN_MEMBERS");
  if (!perms) return message.reply("**No tienes permiso** para banear miembros.\nDebes tener el permiso de **banear miembros**.");

  if (message.mentions.users.size < 1) return message.reply('debes **mencionar a un miembro**. 📢👥\nEjemplo: `!-banear @usuario razón`');
  if (!razon) return message.reply('**escribe la razón** del baneo.  💬⚠\nEjemplo: `!-banear @usuario spam`');

  if (message.author.id == user.id) return message.reply('No te puedes banear a tí mism@. xD')

  if (message.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return message.reply("No puedes banear a ese miembro, puede que tenga un rol igual o superior al tuyo.")

  if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.\nPuede que tenga un rol más alto que el mío o el tuyo... ￣へ￣');

  const embed = new Discord.MessageEmbed()
  .setAuthor('Confirmar baneo. ❓')
  .setDescription(`¿Estás **segur@** de que quieres **banear** a ${user.user}?\n**Razón:** ${razon}`)
  .setFooter('Tienes 1 minuto para confirmar. ')
  .setColor('RANDOM')
  .setTimestamp()
  message.reply(embed).then(m => {
    m.react('✅')
    m.react('❎')
    const filtro = (reaction, user) => {
      return ["✅", "❎"].includes(reaction.emoji.name) && user.id == message.author.id;
    };
    m.awaitReactions(filtro, { max: 1, time: 60000, errors: ["time"]}).catch(() => {
      const tempo = new Discord.MessageEmbed()
      .setAuthor('Tiempo agotado. ⌛')
      .setDescription('❎ ¡**No confirmaste a tiempo**!, he __cancelado__ el baneo.')
      .setTimestamp()
      .setColor('RANDOM')
      .setFooter(`Baneo cancelado por ${client.user.username}`, client.user.avatarURL())
      m.edit(tempo);
    }).then(coleccionado => {
      const reaccion = coleccionado.first()
      if(reaccion.emoji.name === '✅'){
        message.guild.member(user).ban({ razon })
        const ban = new Discord.MessageEmbed()
        .setAuthor('¡Mɪᴇᴍʙʀᴏ ʙᴀɴᴇᴀᴅᴏ! 🚫')
        .setDescription(`🔴 He baneado correctamente a **${user.user}** del servidor, **debido a**: ${razon}. `)
        .setColor('0xd8122f')
        .setTimestamp()
        .setFooter(`Baneado por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        m.edit(ban).catch((err) => {
          message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
        console.error(err)
        })

        let servername = message.guild.name
        let serverid = message.guild.id
        let userid = message.author.id
        let autor = message.author.username
        const log = new Discord.MessageEmbed()
        .setTitle('Comando Logs')
        .setDescription('Se usó el comando `banear`')
        .addField('Usuario:', autor)
        .addField('User ID:', userid)
        .addField('Servidor:', servername)
        .addField('Server ID:', serverid)
        .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
        .setColor('RANDOM')
        .setFooter(servername, message.guild.iconURL())
        .setTimestamp()
        client.channels.cache.get(process.env.COMMAND).send(log)
      } else if (reaccion.emoji.name === "❎") {
        const cancel = new Discord.MessageEmbed()
        .setAuthor('Baneo cancelado. ❎')
        .setColor('RANDOM')
        .setDescription('He **cancelado** el baneo con __éxito__. ♪(^∇^*)')
        .setTimestamp()
        .setFooter(`Baneado cancelado por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        m.edit(cancel).catch((err) => {
          message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
          console.error(err)
        })
      }
    })
  })
}