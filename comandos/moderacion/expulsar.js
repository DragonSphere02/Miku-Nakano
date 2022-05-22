const Discord = require('discord.js');
module.exports = (client, message, args) => {
  let user = message.mentions.members.first();
  let razon = args.slice(1).join(' ');

  let permsbot = message.guild.me.hasPermission("KICK_MEMBERS");
  if (!permsbot) return message.reply(";;w;; Etto... No tengo permiso para expulsar miembros, verifica que tengo activado el permiso de **expulsar miembros**.");

  let perms = message.member.hasPermission("KICK_MEMBERS");
  if (!perms) return message.reply("**no tienes permiso** para expulsar miembros.\nDebes tener activado el permiso de **expulsar miembros**.");

  if (message.mentions.users.size < 1) return message.reply('debes **mencionar a un miembro**. 📢👥\nEjemplo: `!-expulsar @usuario razón`')
  if (!razon) return message.reply('**escribe la razón** de la expulsión. 💬⚠\nEjemplo: `!-expulsar @usuario insultar a miembros`');

  if (message.author.id == user.id) return message.reply('No te puedes expulsar a tí mism@. xD')
  if (message.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return message.reply("No puedes expulsar a ese miembro, puede que tenga un rol igual o superior al tuyo.")
  if (!message.guild.member(user).kickable) return message.reply('No puedo expulsar al usuario mencionado.\nPuede que tenga un rol más alto que el mío o el tuyo... ￣へ￣');

  const embed = new Discord.MessageEmbed()
  .setAuthor('Confirmar expulsión. ❓')
  .setDescription(`¿Estás **segur@** de que quieres **expulsar** a ${user.user}?\n**Razón:** ${razon}`)
  .setFooter('Tienes 1 minuto para confirmar. ')
  .setColor('RANDOM')
  .setTimestamp()
  message.reply(embed).then(m => {
    m.react('✅')
    m.react('❎')
    const filtro = (reaction, user) => {
      return ["✅", "❎"].includes(reaction.emoji.name) && user.id == message.author.id;
    };
    m.awaitReactions(filtro, { max: 1, time: 60000, errors: ["time"] }).catch(() => {
      const tempo = new Discord.MessageEmbed()
      .setAuthor('Tiempo agotado. ⌛')
      .setDescription('❎ ¡**No confirmaste a tiempo**!, he __cancelado__ la expulsión.')
      .setTimestamp()
      .setColor('RANDOM')
      .setFooter(`Expulsión cancelada por ${client.user.username}`, client.user.avatarURL({dynamic: true}))
      m.edit(tempo);
    }).then(coleccionado => {
      const reaccion = coleccionado.first()
      if(reaccion.emoji.name === '✅'){
        message.guild.member(user).kick(razon);
        const exp = new Discord.MessageEmbed()
        .setAuthor('¡Mɪᴇᴍʙʀᴏ ᴇxᴘᴜʟsᴀᴅᴏ! ⛔')
        .setDescription(`🔴 He expulsado correctamente a **${user.user}** del servidor, **debido a**: ${razon}.`)
        .setColor('0xd8122f')
        .setTimestamp()
        .setFooter(`Expulsado por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        m.edit(exp).catch((err) => {
          message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
          console.error(err)
        })
        let servername = message.guild.name
        let serverid = message.guild.id
        let userid = message.author.id
        let autor = message.author.username
        const log = new Discord.MessageEmbed()
        .setTitle('Comando Logs')
        .setDescription('Se usó el comando `expulsar`')
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
        .setTitle('Expulsión cancelada. ❎')
        .setColor('RANDOM')
        .setDescription('He **cancelado** la expulsión con __éxito__. ♪(^∇^*)')
        .setTimestamp()
        .setFooter(`Expulsión cancelada por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        m.edit(cancel).catch((err) => {
          message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
          console.error(err)
        })
      }
    })
  })
}