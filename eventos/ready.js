const { client } = require("discord.js");

module.exports = (client) => {
  client.user.setPresence({
    status: 'online'
  });

  /////HORA DE INICIO/////
  let today = new Date();
  let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(`Miku se ha conectado.\nFecha: ${date} - Hora: ${time}\n`)

  /*client.channels.cache.get(process.env.CON).send('Estoy online y conectada en ' + client.guilds.cache.size + ' servidores y con ' + client.users.cache.size + ' usuarios.\nFecha: ' + date + '- Hora: ' + time)*/

  /////ESTATUS/////
  setInterval(() => {
    // Listado de los mensajes a mostrar en el estado
    let MSGS = [
      `${client.guilds.cache.size} servidores | !-ayuda`,
      `!-ayuda | @Miku Nakano`,
      `!-ayuda | ¡Ten un buen día! :)`,
      `!-ayuda | No olvides tu cubrebocas`,
      `!-ayuda | Da lo mejor en tus clases`,
      `@Miku Nakano | Lava tus manos o usa gel`,
      `@Miku Nakano | Recuerda beber agua ^-^`,
      `@Miku Nakano | Preparando pan`,
      `@Miku Nakano | ¿Gacha o waifu?`,
    ];

    client.user.setActivity(MSGS[~~(Math.random() * MSGS.length)], {
      type: 'WATCHING',
    })

  }, 20000);
}