module.exports = (client, message) => {
    const Discord = require('discord.js')

    var server = message.guild;
    if (!server) return message.channel.send('¡No puedes ver roles aquí, necesitas estar en un **servidor**! (・`ω´・)');

    let rolemap = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(r => r)
    .join(", ");
    if (rolemap.length > 2048) rolemap = "Hay demasiados roles en este servidor. No puedo mostrar tantos.\nPerdón... :(";
    if (!rolemap) rolemap = "No hay roles en este servidor... ¿Por qué no creamos alguno?";

    const embed = new Discord.MessageEmbed()
    .setTitle('Lista de roles en ' + message.guild.name)
    .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png", size: 4096 }))
    .setColor('RANDOM')
    .setDescription(rolemap)
    .setFooter(`Solicitado por ${message.author.username}`, message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    message.channel.send(embed).catch((e) => {
        console.error(e)
        message.channel.send('**Hubo un error**\n' + e) 
    })

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `rolist`')
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