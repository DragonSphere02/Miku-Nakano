module.exports = (client, message, args) => {
    const Discord = require('discord.js');
    var server = message.guild;
    if (!server) return message.channel.send('¡No p-puedo remover roles aquí, necesitas estar en un **servidor**! (・`ω´・)');
    let miembro = message.mentions.members.first();
    let owner = message.guild.ownerID
    let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
    let permsbot = message.guild.me.hasPermission("MANAGE_ROLES");
    if (!permsbot) return message.reply(";;w;; Etto... N-no tengo permiso para remover roles, verifica que tengo activado el permiso de **gestionar roles**.");
    let perms = message.member.hasPermission("MANAGE_ROLES");
    if (!perms) return message.reply("`Acceso denegado` **no tienes permiso** para remover roles.\n\nNecesitas el permiso de **gestionar roles**.");
    if (message.mentions.users.size < 1) return message.reply('**debes mencionar a un miembro**. 📢👥\nEjemplo: `!-rerol @username @rol`').catch(console.error);
    if (!role) return message.reply('Debes **mencionar** el rol.\nEjemplo: `!-rerol @user @rol`');
    if (miembro == owner) return message.reply("No puedes remover roles al dueño del servidor.");
    if (role.comparePositionTo(message.member.roles.highest) === 0) return message.reply("No puedes quitarte tu rol mas alto.")
    if (!role.editable) return message.reply("Rol más alto que el mío.\n**Mueve mi rol** para poder remover roles superiores al mío.")
    if (!miembro.roles.cache.has(role.id)) return message.reply("El miembro no tiene ese rol.")
    if (message.member.roles.highest.comparePositionTo(miembro.roles.highest) < 0) return message.reply("No puedes remover roles a ese miembro, puede que tenga un rol igual o superior al tuyo.");
    miembro.roles.remove(role).catch(console.error);
    message.channel.send({
      embed: {
        color: (0xd8122f),
        title: "¡Rᴏʟ ʀᴇᴍᴏᴠɪᴅᴏ! ⬇",
        description: `🔴 **${miembro.user.username}** perdió el rol de **${role.name}**. `,
        timestamp: new Date(),
        footer: {
          icon_url: message.author.displayAvatarURL({dynamic: true}),
          text: `Rol removido por ${message.author.username}`
        }
      }
    }).catch((err) => {
      message.reply('**Ups...** pasó algo inesperado. Manda el siguiente mensaje a mi desarrollador.\n' + `**__Error:__** ${err}`)
      console.error(err)
      })

      let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `remover`')
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