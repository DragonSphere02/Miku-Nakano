module.exports = (client, message, args) => {
    const Discord = require('discord.js');
    var server = message.guild;
    if (!server) return message.channel.send('¡No puedes eliminar roles aquí, necesitas estar en un **servidor**! (・`ω´・)');

    let permsbot = message.guild.me.hasPermission("MANAGE_ROLES");
    if (!permsbot) return message.reply(";;w;; Etto... No tengo permiso para crear roles, verifica que tengo activado el permiso de **gestionar roles**.");
    let perms = message.member.hasPermission("MANAGE_ROLES");
    if (!perms) return message.reply("`Acceso denegado` **no tienes permiso** para remover roles.\n\nNecesitas el permiso de **gestionar roles**.");
    let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[0])
    if (!role) return message.reply('**Menciona o escribe la ID** del rol que desees eliminar.\nEjemplo: `!-eliminar @rol <razón>`');
    let razon = args.slice(1).join(' ');
    if(!razon) return message.reply('Ingresa la **razón** de la eliminación del rol.\nEjemplo: `!-eliminar @rol duplicado`')
    
    role.delete(razon).then(deleted => {
    const embed = new Discord.MessageEmbed()
    .setTitle('¡Rᴏʟ ᴇʟɪᴍɪɴᴀᴅᴏ! ❎')
    .setDescription('¡He **eliminado** el rol con **éxito**!\n**Datos del rol eliminado:** ⬇\n')
    .addField('⚔ Rol:', deleted.name)
    .addField('📄 Razón de la eliminación:', razon)
    .setTimestamp()
    .setColor('RED')
    .setFooter(`Rol eliminado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
    message.channel.send(embed)

    let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `eliminar`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
    .setColor('RANDOM')
    .setFooter(servername, message.guild.iconURL())
    .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)

    }).catch((e) => {
        console.error(e)
        message.channel.send('Hubo un error... Sí el problema persiste, contacta al servidor de soporte.\n' + e)
    })
}