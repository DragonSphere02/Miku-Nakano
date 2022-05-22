module.exports = (client, message, args) => {
    const Discord = require('discord.js');
    var server = message.guild;
    if (!server) return message.channel.send('¡No puedo asignar roles aquí, necesitas estar en un **servidor**! (・`ω´・)');
    let miembro = message.mentions.members.first();
    let owner = message.guild.ownerID
    let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[2])
    let permsbot = message.guild.me.hasPermission("MANAGE_ROLES");
    if (!permsbot) return message.reply(";;w;; Etto... no tengo permiso para asignar roles, verifica que tengo activado el permiso de **gestionar roles**.");
    let perms = message.member.hasPermission("MANAGE_ROLES");
    if (!perms) return message.reply("`Acceso denegado` **no tienes permiso** para agregar roles.\n\nNecesitas el permiso de **gestionar roles**.");
    if (message.mentions.users.size < 1) return message.reply('debes **mencionar a un miembro**. 📢👥\nEjemplo: `!-rol @user @rol`').catch(console.error);
    if (!role) return message.reply('**Menciona un rol** que desees agregar.\nEjemplo: `!-rol @user @rol`');
    if (miembro == owner) return message.reply("**No** puedes añadir roles al/a la dueñ@ del servidor.")
    if (role.comparePositionTo(message.member.roles.highest) >= 0) return message.reply("**No** puedes añadir un rol **igual o superior** al tuyo.")
    if (!role.editable) return message.reply("Rol más alto que el mío.\n\n**Mueve mi rol** para poder asignar roles superiores al mío.")
    if (miembro.roles.cache.has(role.id)) return message.reply("El miembro **ya cuenta** con ese rol.")
    if (message.member.roles.highest.comparePositionTo(miembro.roles.highest) < 0) return message.reply("**No** puedes añadir roles a ese miembro, puede que tenga un **rol igual o superior** al tuyo.")
    miembro.roles.add(role).catch(console.error);
    message.channel.send({
      embed: {
        color: 976154,
        title: "¡Nᴜᴇᴠᴏ ʀᴏʟ! ⬆",
        description: `🟢 **${miembro.user.username}** obtuvo el rol de **${role.name}**. `,
        timestamp: new Date(),
        footer: {
          icon_url: message.author.displayAvatarURL({dynamic: true}),
          text: `Rol otorgado por ${message.author.username}`
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
    .setDescription('Se usó el comando `asignar`')
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