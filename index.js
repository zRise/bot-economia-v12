const Discord = require("discord.js");
const { Client, Collection, Intents } = require('discord.js');
const db = require("quick.db");
const config = require("./config.json");
const bot = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [ 'GUILDS','GUILD_MEMBERS','GUILD_BANS', 'GUILD_MEMBER_ADD', 'GUILD_CREATE', 'GUILD_EMOJIS_AND_STICKERS','GUILD_INTEGRATIONS','GUILD_WEBHOOKS','GUILD_INVITES','GUILD_VOICE_STATES','GUILD_PRESENCES','GUILD_MESSAGES','GUILD_MESSAGE_REACTIONS','GUILD_MESSAGE_TYPING','DIRECT_MESSAGES','DIRECT_MESSAGE_REACTIONS','DIRECT_MESSAGE_TYPING' ] });
const express = require("express");
const fs = require("fs");

const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); //Recebe solicitações que o deixa online

bot.on("message", msg => {
  if(msg.content === `<@${bot.user.id}>`)
  msg.channel.send(`Olá! Meu prefixo é \`!\`.`) 
})

bot.on("message", msg => {
  if(msg.content === `<@!${bot.user.id}>`)
  msg.channel.send(`Olá! Meu prefixo é \`!\`.`) 
})

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	}
});


bot.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'channel') return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) return;

  if (db.get(`blacklist/${message.author.id}`) !== null) return; 

  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)//puxando a pasta comands + o comando
    commandFile.run(bot, message, args);
  } catch (err) {
    return message.channel.send(`Não encontrei este comando.`);
  }
});

//Status
bot.on('ready', () => {
  console.log('Estou online');
  var tabela = [
    { name: `Economizando por aí...`, type: 'PLAYING' },
    { name: `Cuidando de ${bot.users.cache.size} usuários`, type: 'PLAYING' },
  ];

  function setStatus() {
    var altstatus = tabela[Math.floor(Math.random() * tabela.length)]
    bot.user.setActivity(altstatus)
  }
  setStatus("online")
  setInterval(() => setStatus(), 10000)
})

bot.login(config.token);
