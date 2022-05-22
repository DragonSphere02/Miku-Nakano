const Discord = require('discord.js');
module.exports = (client, message, args) => {

  let permsbot = message.guild.me.hasPermission("MANAGE_MESSAGES");
  if(!permsbot) return message.reply('Necesito tener el permiso de **gestionar mensajes**.');
    
  if(!args[0]){
    const indice = new Discord.MessageEmbed()
    .setAuthor(`Comandos 🆘`, message.guild.iconURL({dynamic: true}))
    .setDescription(`Hola ${message.author.username}.（＾∀＾●）ﾉｼ\nPuedes visualizar mi lista de comandos a través de reacciones. 😊`)
    .addField('')
    .setImage('')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Versión 2.9.0`, message.author.avatarURL({dynamic: true}))

    const mod = new Discord.MessageEmbed()
    .setAuthor(`Moderación 🛑`, message.guild.iconURL({dynamic: true}))
    .setThumbnail(client.user.avatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription('Comandos de moderación.')
    .addField('Info. para anuncios.', '`ayuda anuncios`')
    .addField('Hacer anuncio.', '`anuncio #canal Título | Mensaje`')
    .addField('Info. para la moderación.', '`ayuda mod`')
    .addField('Dar advertencias (warns).', '`adv <@usuario> <razón>` - Deshabilitada')
    .addField('Ver advertencias.', '`veradv <@usuario>` - Deshabilitada')
    .addField('Borrar advertencias.', '`resetadv <@usuario>` - Deshabilitada')
    .addField('Banear a un miembro.', '`banear <@usuario> <razón>`')
    .addField('Borrar mensajes.', '`borrar <número>`')
    .addField('Expulsar miembro.', '`expulsar <@usuario> <razón>`')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 03/02/22`, message.author.avatarURL({dynamic: true}))

    const rol = new Discord.MessageEmbed()
    .setAuthor(`Roles ⚔`, message.guild.iconURL({dynamic: true}))
    .setThumbnail(client.user.avatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription('Comandos de roles.')
    .addField('**Info. para roles.**', '`ayuda roles`')
    .addField('Asignar rol.', '`asignar <@usuario> <@rol>`')
    .addField('Crear rol.', '`crear nombre | razón`')
    .addField('Eliminar rol.', '`eliminar <@rol> <razón>`')
    .addField('Remover rol.', '`remover <@usuario> <@rol>`')
    .addField('Lista de roles.', '`rolist`')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 13/05/21`, message.author.avatarURL({dynamic: true}))

    const util = new Discord.MessageEmbed()
    .setAuthor(`Utilidad 🛠`, message.guild.iconURL({dynamic: true}))
    .setThumbnail(client.user.avatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription('Comandos de utilidad.')
    .addField('Anime de MyAnimeList.', '`anime <anime>`')
    .addField('Mostrar avatar.', '`avatar <@usuario>` - (Sin mención, mostrará el avatar del autor del mensaje.)')
    .addField('Información del bot.', '`botinfo`')
    .addField('Comprobar latencia.', '`ping`')
    .addField('Estatus del servidor.', '`servestatus` - (Útil si tu servidor es una comunidad.)')
    .addField('Icono del servidor.', '`servicon`')
    .addField('Información del servidor.', '`servinfo`')
    .addField('Información de miembros.', '`userinfo <@usuario>` - (Sin mención, mostrará la info. del autor del mensaje.)')
    .addField('¡Vota por Miku!', '`votar`')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 27/05/21`, message.author.avatarURL({dynamic: true}))

    const hanayome = new Discord.MessageEmbed()
    .setAuthor(`Configuración ⚙`, message.guild.iconURL({dynamic: true}))
    .setThumbnail(client.user.avatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription('Comandos de configuración.')
    .addField('Prefix.', '`prefix <nuevo prefix>` - Cambiar prefix.\n`prefix reset` - Regresa al prefix original (**!-**).')
    .addField('Info. para bienvenidas.', '`ayuda bienvenidas`')
    .addField('Ajustar bienvenidas.', '`bienvenida <opción> <opción 2>` - Deshabilitada\n`bienvenida borrar` - Borra los datos y desactiva las bienvenidas. - Deshabilitada')
    .addField('Ajustar despedidas.', '`despedida <opción> <opción 2>` - Deshabilitada\n`despedida borrar` - Borra los datos y desactiva las despedidas. - Deshabilitada')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 03/02/22`, message.author.avatarURL({dynamic: true}))

    const diversion = new Discord.MessageEmbed()
    .setAuthor(`Diversión 🕹`, message.guild.iconURL({dynamic: true}))
    .setThumbnail(client.user.avatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription('El emoji: 🌸 señala que es comando premium.')
    .addField('8ball.', '`8ball <pregunta>`')
    .addField('Conecta 4.', '`conecta4 <@usuario>`')
    .addField('Miku diga un mensaje.', '`decir <texto>`')
    .addField('Miku diga un mensaje con embed.', '`embed <texto>`')
    .addField('Obtener wallpaper anime/waifu/fanarts.', '`gacha`')
    .addField('Meme.', '`meme`')
    .addField('Piedra, papel o tijeras.', '`ppt <elección>`')
    .addField('3 en raya.', '`ttt`')
    .addField('Imágenes waifus/anime/fanarts.', '`waifu`')
    .addField('🌸 Imágenes waifus/anime/fanarts/wallpaper.', '`waifu2 <nombre_waifu>` - Para obtener ayuda, sólo escribe `waifu2` - Deshabilitada')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 03/02/22`, message.author.avatarURL({dynamic: true}))

    const roleplay = new Discord.MessageEmbed()
    .setAuthor(`RolePlay 💬`, message.guild.iconURL({dynamic: true}))
    .setThumbnail(client.user.avatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription('**NOTA:** Puedes agregar algún mensaje **opcional** a la reacción. Sólo hazlo con `reacción <@user> <texto opcional>` ó `reacción <texto opcional>`. También puedes agregar emojis, emojis personalizados, mencionar usuarios o roles. :)')
    .addField('Sin mención.', '`aburrido`, `baile`, `cringe`, `frustrar`, `llorar`, `molesto`, `risa`')
    .addField('Con mención.', '`abrazo`, `animar`, `beso`, `caricia`, `dar5`, `glomp`, `hold`, `matar`, `molestar`, `morder`, `perseguir`')
    .addField('Mención opcional.', '`feliz`, `sonrojo`')
    .addField('Interacción con Miku.', '`m.abrazo <@user>`\n`m.animar <@user>`\n`m.beso <@user>`\n`m.caricia <@user>`\n`m.hold <@user>`')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 13/05/21`, message.author.avatarURL({dynamic: true}))

    const nsfw = new Discord.MessageEmbed()
    .setAuthor(`NSFW 🔞`, message.guild.iconURL({dynamic: true}))
    .setThumbnail(client.user.avatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription('Sin NSFW')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 03/02/22`, message.author.avatarURL({dynamic: true}))

    const soporte = new Discord.MessageEmbed()
    .setAuthor(`Soporte 📤`, message.guild.iconURL({dynamic: true}))
    .setThumnail(client.user.avatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription('Comandos de soporte.')
    .addField('Info. para Miku Nakano+.', '`miku+`')
    .addField('Enviar reportes.', '`reporte <texto>` - (**El mal uso de este comando puede causar el bloqueo del usuario**).')
    .addField('Invitación (bot y servidor de soporte).', '`invitar`')
    .addField('Políticas de privacidad.', '`privacidad`')
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 03/06/21`, message.author.avatarURL({dynamic: true}))
      message.channel.send(indice).then(m => {
        m.react('❓')
        m.react('⚙')
        m.react('🕹')
        m.react('🛑')
        m.react('🔞')
        m.react('💬')
        m.react('⚔')
        m.react('📤')
        m.react('🛠')
        m.awaitReactions((reaction, user) => {
          const userReact = m.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
          if(message.author.id !== user.id) return;
            if(reaction.emoji.name === '❓'){
              try{
                for(const reaction of userReact.values()){
                  reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(indice)
            }
            if(reaction.emoji.name === '🛑'){
              try{
                for(const reaction of userReact.values()){
                  reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(mod)
            }
            if(reaction.emoji.name === '⚔'){
              try{
                for(const reaction of userReact.values()){
                    reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(rol)
            }
            if(reaction.emoji.name === '🛠'){
              try{
                for(const reaction of userReact.values()){
                  reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(util)
            }
            if(reaction.emoji.name === '⚙'){
              try{
                for(const reaction of userReact.values()){
                  reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(hanayome)
            }
            if(reaction.emoji.name === '🕹'){
              try{
                for(const reaction of userReact.values()){
                  reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(diversion)
            }
            if(reaction.emoji.name === '💬'){
              try{
                for(const reaction of userReact.values()({})){
                  reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(roleplay)
            }
            if(reaction.emoji.name === '🔞'){
              try{
                if(!message.channel.nsfw) {
                    for(const reaction of userReact.values()){
                      reaction.users.remove(user.id)
                    }
                    const embed = new Discord.MessageEmbed()
                    .setTitle('NSFW 🔞')
                    .setAuthor(`${client.user.username}`, client.user.avatarURL())
                    .setDescription('Este canal no es NSFW, usa este comando en un **canal NSFW.**')
                    .setColor('RANDOM')
                    .setTimestamp()
                    .setFooter(`Solicitado por ${message.author.username} | Actualizado el 25/11/20`, message.author.avatarURL({dynamic: true}))
                    return m.edit(embed);
                }
                for(const reaction of userReact.values()){
                  reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(nsfw)
            }
            if(reaction.emoji.name === '📤'){
              try{
                for(const reaction of userReact.values()){
                  reaction.users.remove(user.id)
                }
              } catch(error) {console.error(error)}
              m.edit(soporte)
            }

          })
      })
      let servername = message.guild.name
    let serverid = message.guild.id
    let userid = message.author.id
    let autor = message.author.username
    const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `ayuda`')
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

     if(args[0] === 'anuncios') {
      const embed = new Discord.MessageEmbed()
      .setTitle('Aʏᴜᴅᴀ - Aɴᴜɴᴄɪᴏs 🆘')
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(`Hola **${message.author.username}**. Aquí te muestro información de **cómo usar el comando de anuncios**.`)
      .addFields({
        name: 'Cᴏᴍᴀɴᴅᴏs </..>',
        value: '`anuncio #canal Título | Mensaje | URL a imagen` - Anuncio con imagen.\n`anuncio #canal Título | Mensaje` - Anuncio sin imagen.',
      },
      {
        name: 'Pᴇʀᴍɪsᴏs 🛑',
        value: 'Este comando sólo lo pueden usar admin y mods para publicar reglas, avisos, u otro tipo de actualización en el servidor, con ello, el miembro debe tener **activado** los permisos de **banear miembros** y **expulsar miembros**.',
      },
      {
        name: 'Mᴇɴᴄɪᴏɴᴀʀ ᴏ ᴘᴏʀ ID 🆔',
        value: 'Además de mencionar el canal de destino, puedes agregar la **ID**.\nEjemplo: `anuncio 01234567890 Título | Mensaje`',
      },
      {
        name: 'Nᴏᴛᴀs: 📝',
        value: '**1.- No** puedes insertar enlaces, en el **título**, no tendrán efecto alguno.\n**2.- No** puedes agregar bloques de contenido en el **título**.\n**3.-** Puedes agregar emojis o kaomojis.\n**4.-** Puedes agregar los emojis de tu servidor en el **título** o en el **mensaje**.',
      },
      {
        name: 'Mᴀʀᴋᴅᴏᴡɴ ✏',
        value: '`*txt* - Cursiva.\n**txt** - Negritas.\n***txt*** - Cursiva y negritas.\n__txt__ - Subrayado.\n*__txt__* - Cursiva y subrayado.\n**__txt__** - Subrayado y negritas.\n***__txt__*** - Cursiva con subrayado y negritas.\n> txt - Bloque de contenido.\n[Texto](www.sitiowebaqui.com) - Agregar enlaces.`',
      },
      {
        name: 'Eᴊᴇᴍᴘʟᴏ ᴅᴇ ᴄᴏɴᴛᴇɴɪᴅᴏ ✅',
        value: '`!-anuncio #tucanal Aquí va tu título | Aqui va tu **mensaje** :D. | urldetuimagen.com/jpg`'
      })
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter(`Solicitado por ${message.author.username} | Actualizado: 13/05/2021`, message.author.avatarURL({dynamic: true}))
      .addField('Eᴊᴇᴍᴘʟᴏ ʏ ᴅᴇᴛᴀʟʟᴇs ᴀᴅɪᴄɪᴏɴᴀʟᴇs 📑', '⬇')
      .setImage('')
      message.channel.send(embed)

      let servername = message.guild.name
      let serverid = message.guild.id
      let userid = message.author.id
      let autor = message.author.username
      const log = new Discord.MessageEmbed()
      .setTitle('Comando Logs')
      .setDescription('Se usó el comando `ayuda anuncios`')
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

    if(args[0] === 'mod'){
      message.channel.send({embed: {
        color: 'RANDOM',
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL()
        },
        title: "Aʏᴜᴅᴀ - Mᴏᴅᴇʀᴀᴄɪᴏ́ɴ 🆘",
         description: `Hola **${message.author.username}**. Etto, aquí te muestro información de **cómo usar la moderación**.`,
        fields: [{
          name: "Cᴏᴍᴀɴᴅᴏs </..>",
          value: "`expulsar @user razón` - Expulsar a un miembro.\n`banear @user razón` - Banear a un miembro.\n`borrar <número>` - Borrar mensajes.\n`adv @user razón` - Dar warn.\n`veradv @user` - Ver warns de un miembro.\n`resetadv @user` - Borrar warns."
        },
        {
          name: "IMPORTANTE ⚠",
          value: "**1.-** **Verifica los permisos**. Los miembros con **permisos de banear, expulsar, gestionar mensajes y mover miembros**, tendrán **__acceso__** a los 6 comandos.\n\n**2.-** Si quieres desbanear a un miembro, se debe hacer **manualmente**.\n\n**3.-** Miku no es capáz de expulsar o banear a miembros con **rol más alto** al de ella.\n\n**4.-** Sólo se pueden borrar mensajes **no mayores a 14 días** y en cantidad **menor a 100**.\n\n**5.-** No podrás expulsar, banear miembros o dar, ver y eliminar warns con un **rol igual o mayor** que tu.\n\n**6.-** Si eres admin de un servidor, considera hacer un rol **exclusivo para ti**, esto con el fín de evitar errores en los comandos.\n\n• Ejemplo de expulsión: `expulsar @user spam`\n\n• Ejemplo de borrar mensajes: `borrar 5`\n\n**--->** Se recomienda dar los permisos con precaución a un miembro o rol. ⚠"
        }],
        timestamp: new Date(),
        footer: {
          icon_url: message.author.avatarURL({dynamic: true}),
          text: `Solicitado por ${message.author.username} | Actualizado el 23/05/21`
        }
      }})
      let servername = message.guild.name
        let serverid = message.guild.id
        let userid = message.author.id
        let autor = message.author.username
        const log = new Discord.MessageEmbed()
        .setTitle('Comando Logs')
        .setDescription('Se usó el comando `ayuda mod`')
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

    if(args[0] === 'roles'){
      message.channel.send({
        embed: {
          color: 'RANDOM',
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL()
          },
          title: "Aʏᴜᴅᴀ - Rᴏʟᴇs 🆘",
          description: `Hola **${message.author.username}**. Aquí te muestro información de **cómo usar los roles**.`,
          fields: [{
            name: "Cᴏᴍᴀɴᴅᴏs </..>",
            value: "`asignar @user @rol` - Asignar rol a un miembro.\n`crear nombrerol | razón` - Crear rol.\n`eliminar @rol razón` - Eliminar rol.\n`remover @user @rol` - Remover rol a un miembro.\n`rolist` - Mostrar lista de roles."
          },
          {
            name: "IMPORTANTE ⚠",
            value: "**1.- Revisa** los permisos de **gestionar roles**, el miembro o rol que tenga activado este permiso, podrá tener **__acceso__** a los comandos y mover, crear o eliminar **roles inferiores**.\n\n**2.-** **Antes de usar** los roles, **mueve el rol** a Miku, esto para que pueda tener control de los roles. Ya que **no será capáz de asignar, remover, o eliminar** un rol más **alto al de ella.**\n\n**3.-** Si eres **admin del servidor** crea un rol exclusivo para ti y **muévelo al inicio**, ya que de no hacerlo, **no podrás hacer uso del comando**."
          },
          {
            name: "Nota: 📝",
            value: "• **--->** Se recomienda mover el rol de Miku **abajo del rol más alto**, ó al inicio, si se desea tener control total de **todos los roles** (esto afecta al admin del servidor si desea agregar alguien a su mismo rol)."
          }],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.avatarURL({dynamic: true}),
            text: `Solicitado por ${message.author.username} | Actualizado el 13/05/21`
          }
        }
      })

      let servername = message.guild.name
      let serverid = message.guild.id
      let userid = message.author.id
      let autor = message.author.username
      const log = new Discord.MessageEmbed()
      .setTitle('Comando Logs')
      .setDescription('Se usó el comando `ayuda roles`')
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

  if(args[0] === 'bienvenidas') {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Ayuda - Bienvenidas/Despedidas 🆘', message.guild.iconURL({dynamic: true}))
    .setDescription(`Hola **${message.author.username}**. Aquí te muestro información de cómo usar los comandos de despedida y bienvenida.`)
    .setColor('RANDOM')
    .addField('Comandos </..>', '`bienvenida/despedida canal #canal` - Asigna canal de bienvenida/despedida.\n`bienvenida/despedida mensaje Mensaje de despedida` - Crea un mensaje para dar las bienvenidas/despedidas.')
    .addField('IMPORTANTE ⚠', '**1.-** Sólo el/la **admin** del servidor puede ajustar los canales y los mensajes.\n**2.-** Revisa los **permisos** del canal que asignes para que Miku pueda dar las bienvenidas/despedidas.\n**3.-** Es necesario tener registrado el **canal** y el **mensaje**, de lo contrario, dichos eventos **no** se activarán.')
    .addField('Ejemplo:', 'En la siguiente imagen un ejemplo para usar los comandos, en este caso, ajustar la bienvenida a nuevos miembros.')
    .setImage('')
    .setFooter(`Solicitado por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    message.channel.send(embed)
    
    let servername = message.guild.name
      let serverid = message.guild.id
      let userid = message.author.id
      let autor = message.author.username
      const log = new Discord.MessageEmbed()
      .setTitle('Comando Logs')
      .setDescription('Se usó el comando `ayuda bienvenidas`')
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
}
