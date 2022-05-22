module.exports = (client, message) => {
  const Discord = require('discord.js');


  const member = message.mentions.members.first() || message.member


    function formatDate (template, date) {
      var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
      date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
      return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item)
      }, template)
    }


    let badges1 = {
        
      'EARLY_SUPPORTER': 'Early Supporter',
      'DISCORD_EMPLOYEE': 'Staff de Discord',
      'DISCORD_PARTNER': 'Discord Partner',
      'HYPESQUAD_EVENTS': 'Hypesquad Events',
      'HOUSE_BRAVERY': 'House of Bravery',
      'HOUSE_BRILLIANCE': 'House of Brilliance',
      'BUGHUNTER_LEVEL_1': 'Bughunter',
      'BUGHUNTER_LEVEL_2': 'Gold Bughunter',
      'VERIFIED_DEVELOPER': 'Desarrollador de bots Verificado',
      'HOUSE_BALANCE': 'House of Balance',
      'VERIFIED_BOT': '✅ | Bot verificado',
    }
    

//Creamos un object, es decir, leerá la badge del usuario y si tiene ese nombre, se ejecutara el let anterior
    

    let obj = {
    "HOUSE_BRAVERY" : "Bravery" , "VERIFIED_BOT" : "Bot verificado" , "VERIFIED_DEVELOPER" : "Desarrollador de bots verificado" , "HOUSE_BRILLIANCE" : "Brilliance" , "DISCORD_PARTNER" : "Socio de discord"
    }

    let rolesmap = member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')

    if(rolesmap.length >= 1024){
      let total = rolesmap.length
      const titulo = new Discord.MessageEmbed()
      .setTitle('Eʀʀᴏʀ | Exᴄᴇsᴏ ᴅᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs.')
      .setDescription('Sólo se aceptan **1024** caracteres en el mensaje.\n¡Hay demasiados roles! :(')
      .setTimestamp()
      .setColor('RED')
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      return message.channel.send(titulo)
  }

    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Iɴғᴏʀᴍᴀᴄɪᴏ́ɴ ᴅᴇʟ ᴜsᴜᴀʀɪᴏ.")
        .setDescription('Esta es la información que he obtenido. (*^▽^*)')
        .addField("**📟 Nombre**:", `${member.user.tag}`, true)//Que envíe el tag del usuario
        .addField("**🆔 ID**:", `${member.user.id}`, true)//Id del usuario
        .addField("**📌 Apodo**:", `${member.nickname !== null ? `${member.nickname}` : 'No tiene apodos.'}`, true) //Si tiene o no apodo el usuario dentro del servidor
        .addField("**🛎 Ingreso al Servidor:**", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.joinedAt), true)//La fecha de ingreso del usuario al servidor
        .addField("**📥 Cuenta Creada:**", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.user.createdAt), true)//Cuando fue creada la cuenta
        .addField("**🚀 ¿Boostea?**:", member.premiumSince ? '**✅ | Boosteando en el servidor**' : '❎ | No está boosteando', true)//si esta o no boosteando el servidor
        .addField("**🏳️ Insignias:**", member.user.flags.toArray().length ? member.user.flags.toArray().map(badge => badges1[badge]).join('\n') : "No tiene insignias")//Lo que hemos definido antes las badges del usuario
        .addField("**🎖 Roles:**", rolesmap)//Los roles que posee dicho usuario(Si la cantidad de roles del usuario excede el numero de caracteres que soporta un field, dará un error de sintaxis a la consola, si es así encuentren una manera de hacerlo ustedes mismos)
        .setThumbnail (member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))//y el avatar del usuario
        .setFooter(`Solicitado por ${message.author.username}`, `${message.author.displayAvatarURL({dynamic: true})}`)
        .setTimestamp()
     message.channel.send(embed)

     let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `userinfo`')
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