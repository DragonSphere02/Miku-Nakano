const Discord = require("discord.js");
module.exports = async (client, message, args) => {

  const moves = { piedra: 0, papel: 1, tijera: 2 };

  function wrapIndex(i, i_max) {
    return ((i % i_max) + i_max) % i_max;
  }

  function determine_win(inputs) {
    let i = moves[inputs[0]],
    j = moves[inputs[1]];
    return wrapIndex(i + -j, 3);
  }

  //Cambia minúscula por mayúscula
  function uppercase_first(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  if(!args[0]) return message.reply("Elige entre piedra, papel o tijera.\n**Ejemplo:** `!-ppt piedra`");
  if (!args[0] in moves){
  return message.reply("Elige una opcion valida")
  }

  let machineInput = Object.keys(moves)[Math.floor(Math.random() * 3)];
  let winner = determine_win([args[0], machineInput]);

  const embed = new Discord.MessageEmbed()
  .setAuthor('Piedra, papel o tijera', message.guild.iconURL({dynamic: true}))
  .addFields(
  {
    name: `${message.author.username} eligió:`,
    value: uppercase_first(args[0]),
    inline: true
  },
  {
    name: `Miku eligió:`,
    value: uppercase_first(machineInput), 
    inline: true
  })
  .setColor(message.guild.me.displayColor)
  .setFooter("Jugué con " + message.author.username, message.author.avatarURL({dynamic: true}))
  .setTimestamp()

  let servername = message.guild.name
  let serverid = message.guild.id
  let userid = message.author.id
  let autor = message.author.username
  const log = new Discord.MessageEmbed()
  .setTitle('Comando Logs')
  .setDescription('Se usó el comando `ppt`')
  .addField('Usuario:', autor)
  .addField('User ID:', userid)
  .addField('Servidor:', servername)
  .addField('Server ID:', serverid)
  .setImage(message.guild.iconURL({dynamic: true, size: 1024}))
  .setColor('RANDOM')
  .setFooter(servername, message.guild.iconURL())
  .setTimestamp()
  client.channels.cache.get(process.env.COMMAND).send(log)
  
  if (winner == 0) {
    embed.setDescription("**_¡Hubo un empate!_**");
    return message.channel.send({ embed });
  } else if (winner == 1) {
    embed.setDescription("**_¡Has ganado, felicidades!_**");
    return message.channel.send({ embed });
  } else if (winner == 2) {
    embed.setDescription("**_¡Miku ha ganado!_**");
    return message.channel.send({ embed });
  }
};