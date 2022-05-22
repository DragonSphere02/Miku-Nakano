module.exports = (client, message, args) => {
    const Discord = require('discord.js');
    var server = message.guild;
    if (!server) return message.channel.send('¡No puedo mandar reportes por MD, necesitas estar en un **servidor**! (・`ω´・)');
    let prohibidos = ["ID1", "ID2"];
    if (prohibidos.includes(message.author.id)) return message.channel.send("¡Tienes prohibido usar este comando por mal uso!");
    let bug = args.join(" ");
    if (!bug) return message.reply("¡Escribe el mensaje a enviar!");
    let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let min = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let may = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    let MAY = may[Math.floor(Math.random() * may.length)] // Opcion aleatoria de letras mayúsculas
    let nums = num[Math.floor(Math.random() * num.length)] // Opcion aleatoria de numeros
    let mina = min[Math.floor(Math.random() * min.length)] // Opcion aleatoria de letras minúsculas
    let nums2 = num[Math.floor(Math.random() * num.length)] // Opcion aleatoria de numeros2
    let MAY2 = may[Math.floor(Math.random() * may.length)] // Opcion aleatoria de letras mayúsculas2
    let nums3 = num[Math.floor(Math.random() * num.length)] // Opcion aleatoria de numeros2

    let folio = `${MAY}${nums}${mina}${nums2}${MAY2}${nums3}`

    let bugc = new Discord.MessageEmbed()
      .setColor(0xffff00)
      .setTitle("¿Estás segur@ que quieres enviar este reporte?")
      .addField("Tú reporte:", bug)
      .setFooter("¡Tienes 60 segundos para confirmar o cancelar el mensaje!")
    message.channel.send(bugc).then(m => {
      m.react("✅")
      m.react("❎")
      const filtro = (reaction, user) => {
        return ["✅", "❎"].includes(reaction.emoji.name) && user.id == message.author.id;
      };
      m.awaitReactions(filtro, { max: 1, time: 60000, errors: ["time"] }).catch(() => {
        m.edit("¡No confirmaste a tiempo!, tu reporte ha sido cancelado.");
      }).then(coleccionado => {
        const reaccion = coleccionado.first();
        if (reaccion.emoji.name === "✅") {
          let canal = client.channels.cache.get(process.env.REPORTE);
          let bugco = new Discord.MessageEmbed()
            .setColor(0x2d572c)
            .setTitle("¡He enviado tu reporte!")
            .setDescription('Puede que se envíe un mensaje en **este canal** con respuesta del desarrollador.')
            .addField("Tu reporte:", bug)
            .addField("Folio:", folio)
            .setFooter(`Enviado por ${message.author.username} | ¡Gracias por tu reporte!`, message.author.avatarURL({dynamic: true}))
            .setTimestamp()
          m.edit(bugco)
          let bugre = new Discord.MessageEmbed()
            .setTitle('¡Ha llegado un nuevo reporte!')
            .setColor(0xff0000)
            .addField("Mensaje enviado:", bug)
            .addField('Folio:', folio)
            .setFooter(`Reporte enviado por ${message.author.tag} | U-ID: ${message.author.id} | C-ID: ${message.channel.id} | S-ID: ${message.guild.id}`)
            .setTimestamp()
          canal.send(bugre)
        }
        else if (reaccion.emoji.name === "❎") {
          m.edit("Reporte cancelado.")
        }
      })
    })
} 