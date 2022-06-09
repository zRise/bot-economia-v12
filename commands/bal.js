const db = require('quick.db');
const Discord = require('discord.js');

exports.run = async (bot, message, args) => {

      let user = bot.users.cache.get(args[0]) || message.mentions.users.first() ||  message.author;

    let money = db.fetch(`money_${message.author.id}_${user.id}`)
    if(money === null) money = 0;
  
    let bank = db.fetch(`bank_${message.author.id}_${user.id}`)
    if(bank === null) bank = 0;

    const embed = new Discord.MessageEmbed()
    .setColor("#707adc")
    .setTitle("Informação Banco")
    .setDescription(`**${user.username}**, veja as informações da sua carteira:` +
    `\n\n💰 Dinheiro: **R$${money}**` +
    `\n🏦 Banco: **R$${bank}**`)
    .setFooter("Informações da sua carteira!")
    .setTimestamp();

    message.channel.send(`${user}`, embed);
}

