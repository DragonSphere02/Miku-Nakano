const talkedRecently = new Set();

module.exports = (client, message, args) => {
  const Discord = require('discord.js')

  if(talkedRecently.has(message.author.id)){
    message.reply('¡¡Hey, no abuses de este comando!! >:(. Sólo lo puedes usar cada **8 segundos.**').then(message => {
      message.delete({ timeout: 8000 })
    }).catch(error => {console.log(error)})
  } else {
    let res = ['Sí. 😊', 'No. 🙃', 'Tal vez. 👍', '¿Tú qué opinas? 🤔', 'No sé. 😶', 'Por su puesto que sí.', 'Pregúntale a otro miembro. 😐', '¡Claro que NO! 🤬', 'Pregúntame después. 😒', 'Shi. UwU', 'Khé? O.o', 'Tal vez sí, tal vez no.', 'Definitivamente si', 'WTF con tu pregunta xD', 'Pa que quieres saber eso, jaja salu2', 'Obvio no', '¡Claro que si! :D', 'Pregunta algo mejor. xd', 'Puede ser... no lo sé.', 'xD', 'Sipi. UwU', 'Nop. c:', 'Qué flojera responderte.', 'Chi. :3', 'Nopi. :3', 'Ya cállate.', 'Preguntas mucho, ya cállate, aburres.', 'Mmmm... yo digo que sí.', 'Mmmm... yo digo que no.', 'Mmmmm... díficil, no lo sé.', 'Mmmmm... ¿Tú que dices? ¿un sí?', '¿Por qué preguntas mucho?, déjame respirar un poco 😒', '¡Siempre sí!', '¡Siempre nop!', '...', 'Claro.', 'No me preguntes nada, y mejor respóndeme esto:\n¿Me quieres?', 'Jaja, sí. :P', 'Jaja, nel. xD', 'Tal vez sí.', 'Talvez no.']

    let ask = args.join(' ')

    if (!ask) return message.reply('¡Te falta escribir la pregunta!\nEjemplo: `!-8ball ¿Quieres desayunar en la noche?`')

    message.reply(res[Math.floor(Math.random() * res.length)]).catch((err) => {
      message.reply('**Ups...** pasó algo inesperado.\n' + `**__Error:__** ${err}`)
      console.error(err)
    })

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id)
    }, 8000);

    let servername = message.guild.name
    let serverid = message.guild.id
    let userid = message.author.id
    let autor = message.author.username
    const log = new Discord.MessageEmbed()
    .setTitle('Comando Logs')
    .setDescription('Se usó el comando `8ball`')
    .addField('Usuario:', autor)
    .addField('User ID:', userid)
    .addField('Servidor:', servername)
    .addField('Server ID:', serverid)
    .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
    .setColor('RANDOM')
    .setFooter(servername, message.guild.iconURL())
    .setTimestamp()
    client.channels.cache.get(process.env.COMMAND).send(log)
    delete log
  }
}