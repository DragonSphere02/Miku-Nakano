module.exports = (client, message) => {
    const Discord = require('discord.js');
    var server = message.guild;
    if (!server) return message.channel.send('¡No puedo darte la información aquí, necesitas estar en un **servidor**! (・`ω´・)')

    let nivel = { 
        0: "❎ Ninguno",
        1: "✨ **Nivel 1**",
        2: "⭐ **Nivel 2**",
        3: "🌟 **Nivel 3**"
    }

    var index = 0

    let features = { 
        ANIMATED_ICON: "Icono animado.",
        BANNER: "Banner de servidor.",
        COMMERCE: "Acceso para usar funciones comerciales (es decir, crear canales de tienda).",
        COMMUNITY: "El servidor es ahora una comunidad (se puede habilitar la pantalla de bienvenida, la selección de miembros, el descubrimiento, y recibir actualizaciones de la comunidad).",
        DISCOVERABLE: "Servidor en Discord Discovery List.",
        FEATURABLE: "Apto para estar en la lista de destacados.",
        INVITE_SPLASH: "Fondo para invitaciones.",
        NEWS: "Canal de novedades.",
        PARTNERED: "Servidor asociado.",
        RELAY_ENABLED: "Retransmisiones.",
        VANITY_URL: "URL de invitacion personalizada.",
        VERIFIED: "Servidor verificado.",
        VIP_REGIONS: "Acceso para establecer una tasa de bits de 384 kbps en canales de voz.",
        WELCOME_SCREEN_ENABLED: "Mensaje de bienvenida.",
        MEMBER_VERIFICATION_GATE_ENABLED: 'Cibrado de miembros.',
        PREVIEW_ENABLED: 'Vista previa del servidor antes de unirse.'
    }

    mapeo = server.features.map(x => `**${++index} -** ${features[x]}`).join('\n')
    

    const embed = new Discord.MessageEmbed()
    .setAuthor('Estatus del servidor en ' + server.name)
    .setThumbnail(server.iconURL({dynamic: true, size: 4096, format: "jpg" }))
    .setImage(server.splashURL({ size: 4096, format: "jpg" }))
    .setColor('RANDOM')
    .addField('📊 Nivel del boost:', nivel[server.premiumTier], true)
    .addField('🚀 Cantidad de boost:', server.premiumSubscriptionCount === 0 ? "Sin boost"
    : `**${server.premiumSubscriptionCount}** ${
    server.premiumSubscriptionCount === 1 ? "**boost**" : "**boosteos**"}`, true)
    .addField('📝 Descripción del servidor:', server.description)
    .addField('📈 Nivel de MFA:', server.mfaLevel, true)
    .addField('🥇 ¿Servidor asociado?:', server.partnered, true)
    .addField(`📑 Características del servidor:`, server.features.length <= 0
    ? "Ninguna"
    : mapeo)
    .addField('📌 Canal de reglas:', server.rulesChannel, true)
    .addField('📨 Mensajes del sistema:', server.systemChannel, true)
    .addField('✅ ¿Servidor verificado?:', server.verified)
    .setTimestamp()
    .setFooter(`Solicitado por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed)

let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `servestatus`')
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