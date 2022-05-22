//Variables y librerías//
const Discord = require('discord.js');
const client = new Discord.Client({intents: 32767});
const AutoPoster = require('topgg-autoposter')
const ap = AutoPoster(process.env.dblToken, client)
let { readdirSync } = require('fs');
client.comandos = new Discord.Collection();
const keepAlive = require('./server');
const Monitor = require('ping-monitor');

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!\n')
})

//Estatus reserva//
keepAlive();
const monitor = new Monitor({
	website: 'anyhosthere.com',
	interval: 30 // minutes
});
monitor.on('up', res => console.log(`${res.website} está encedido.\n`));
monitor.on('down', res =>
	console.log(`${res.website} se ha caído - ${res.statusMessage}\n`)
);
monitor.on('stop', website => console.log(`${website} se ha parado.\n`));
monitor.on('error', error => console.log(error));

//Controlador de comandos - Ayuda//
for (const file of readdirSync('./comandos/ayuda')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/ayuda/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - configuración //
for (const file of readdirSync('./comandos/config')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/config/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - Diversión//
for (const file of readdirSync('./comandos/diversion')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/diversion/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - Moderación//
for (const file of readdirSync('./comandos/moderacion')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/moderacion/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - NSFW//
for (const file of readdirSync('./comandos/nsfw')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/nsfw/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos privados//
for (const file of readdirSync('./comandos/priv')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/priv/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - RolePlay//
for (const file of readdirSync('./comandos/roleplay')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/roleplay/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - RolePlay2//
for (const file of readdirSync('./comandos/roleplay2')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/roleplay2/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - Roles//
for (const file of readdirSync('./comandos/roles')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/roles/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - Soporte//
for (const file of readdirSync('./comandos/soporte')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/soporte/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de comandos - Utilidad//
for (const file of readdirSync('./comandos/utilidad')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./comandos/utilidad/${file}`);
		client.comandos.set(fileName, fileContents);
	}
}

//Controlador de eventos//
for (const file of readdirSync('./eventos/')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
		let fileContents = require(`./eventos/${file}`);
		client.on(fileName, fileContents.bind(null, client));
		//delete require.cache[require.resolve(`./eventos/${file}`)];
	}
}

//evento temporal me sirve para que no se apague cuando ay un error
process.on('unhandledRejection', error => {
  console.log(error) // Pues vaya que evita que se apague xd JAJAJA
})

//Login//
client.login(process.env.TOKEN).then(() => {
	console.log('Ingresando a Discord en ' + client.guilds.cache.size + ' servidores\n')}).catch(error => {
		console.error('Error al iniciar el bot: ' + error);
});