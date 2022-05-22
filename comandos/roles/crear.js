module.exports = (client, message, args) => {
    const Discord = require('discord.js');
    var server = message.guild;
    if (!server) return message.channel.send('¡No puedes crear roles aquí, necesitas estar en un **servidor**! (・`ω´・)');

    let permsbot = message.guild.me.hasPermission("MANAGE_ROLES");
    if (!permsbot) return message.reply(";;w;; Etto... No tengo permiso para crear roles, verifica que tengo activado el permiso de **gestionar roles**.");
    let perms = message.member.hasPermission("MANAGE_ROLES");
    if (!perms) return message.reply("`Acceso denegado` **no tienes permiso** para remover roles.\n\nNecesitas el permiso de **gestionar roles**.");

    let cmd = args.join(' ').split(' | ')
    if(!cmd[0]) return message.reply('Escribe el **nombre** del rol a crear.\n**EJEMPLO:** `!-crear Nombre rol | Necesitamos un rol para gente cool.`\n**NOTA:** Son **obligatorios** los **|** para separar el nombre y la razón.')
    if(!cmd[1]) return message.reply('Escribe la **razón** de la creación del rol.\n**EJEMPLO:** `!-crear Nombre rol | Necesitamos un rol para gente cool.`\n**NOTA:** Son **obligatorios** los **|** para separar el nombre y la razón.')
    
    try {
    message.guild.roles.create({
        data: {
            name: cmd[0],
            color: 'RANDOM',
            hoist: false,
            position: '1',
            mentionable: false,
        },
        reason: cmd[1],
    })
    const embed = new Discord.MessageEmbed()
    .setTitle('¡Nᴜᴇᴠᴏ ʀᴏʟ ᴄʀᴇᴀᴅᴏ! ✅')
    .setDescription('¡He **creado** el rol con **éxito**!\n**Datos del rol creado:** ⬇\n')
    .addField('⚔ Nombre del rol:', cmd[0]+'.')
    .addField('🎨 Color:', 'Aleatorio.')
    .addField('🗂 Separar miembros de otros roles:', 'No separar.')
    .addField('#️⃣ Posición: 1', '(El conteo de los roles, es de **abajo hacia arriba.** Por lo tanto, el rol `@everyone` es posición 0).')
    .addField('📢 Mencionable:', 'No mencionable.')
    .addField('📄 Razón de la creación:', cmd[1]+'.')
    .addField('📝 Notas adicionales: ', '**1.-** Puedes cambiar **toda** la configuración del rol creado, haciéndolo manualmente.\n**2.-** Puedes ver más detalles del rol creado en el **registro de auditoría** (sólo si tienes permiso de acceder).')
    .setTimestamp()
    .setColor('GREEN')
    .setFooter(`Rol creado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
    message.channel.send(embed)

    let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `crear`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
    .setColor('RANDOM')
    .setFooter(servername, message.guild.iconURL())
    .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)

    } catch (err) {
        console.error(err)
        message.channel.send('Hubo un error... Envía este mensaje a mi desarrollador.\n' + err)
    }
}