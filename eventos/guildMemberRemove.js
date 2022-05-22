const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const Discord = require('discord.js');
const {YamlDatabase} = require('wio.db');
const despedida = new YamlDatabase('despedidasc')
const despedida2 = new YamlDatabase('despedidast')
module.exports = async (client, member) => {
  let canales = despedida.fetch(`bye_${member.guild.id}`)
  if(canales === null) return

  let channel = client.channels.cache.get(canales)
  let data = await canva.welcome(member, {link: 'link', blur: false, block: true})

  let texto = despedida2.fetch(`txt_${member.guild.id}`)
  if(!texto) return 
    
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Un usuario ha salido de ${member.guild.name}`, member.guild.iconURL({dynamic: true}))
  .setColor('RANDOM')
  .attachFiles(data)
  .setDescription(`${texto}`)
  .setFooter(`Ahora somos ${member.guild.memberCount} miembros.`)
  .setTimestamp()
  channel.send(embed)
}