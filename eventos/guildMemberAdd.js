const { CanvasSenpai } = require("canvas-senpai")
const Discord = require('discord.js');
const canva = new CanvasSenpai();
const {YamlDatabase} = require('wio.db');
const welcome = new YamlDatabase('bienvenidasc')
const welcome2 = new YamlDatabase('bienvenidast')
module.exports = async (client, member) => {
    let canales = welcome.fetch(`welcomes_${member.guild.id}`)
    if(canales === null) return
    let channel = client.channels.cache.get(canales)
    let links = []
    let res = links[Math.floor(Math.random() * links.length)]
    let data = await canva.welcome(member,{link: res, blur: false, block: true})
    let texto = welcome2.fetch(`txt_${member.guild.id}`)
    if(!texto) return 
    // Enviamos el mensaje a un canal segun el ID-CANAL
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Un nuevo miembro ha entrado a ${member.guild.name}`, member.guild.iconURL({dynamic: true}))
    .setColor('RANDOM')
    .attachFiles(data)
    .setDescription(`${texto}`)
    .setFooter(`Ahora somos ${member.guild.memberCount} miembros.`)
    .setTimestamp()
    channel.send(embed)
    delete canales
    delete channel
    delete res 
    delete data
    delete texto
    delete embed
}