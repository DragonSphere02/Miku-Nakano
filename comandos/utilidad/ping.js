module.exports = (client, message) => {
    const Discord = require('discord.js');
    var server = message.guild;
    if (!server) return message.channel.send('¡No puedes usar ese comando aquí, necesitas estar en un **servidor**! (・`ω´・)');
    let ping = Math.floor(message.client.ws.ping);
    message.channel.send({embed: {
        color: 'RANDOM',
        title: "**Pᴏɴɢ**❗",
        description: 'Mis tiempos de respuesta son de:\n' + '`Mensaje: ' + (Date.now() - message.createdTimestamp) +  ' ms`\n' + '`API: ' + ping + ' ms`',
        timestamp: new Date(),
        footer: {
            icon_url: message.author.avatarURL({dynamic: true}),
            text: "Solicitado por " + message.author.username
          }
        }}).catch((err) => {
      message.reply('**Ups...** pasó algo inesperado. Manda el siguiente mensaje a mi desarrollador.\n' + `**__Error:__** ${err}`)
      console.error(err)
      })
}