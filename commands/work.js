const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms"); // Importando o ms

module.exports.run = async (client, message, args) => {
    let user = message.author;
    
    let author = await db.fetch(`work_${message.author.id}_${user.id}`)

    let timeout = 180000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        
        let time = ms(timeout - (Date.now() - author));
    
        let embedi = new Discord.MessageEmbed()
        .setColor("#707adc")
        .setDescription(`<:error:875813027163807745> **|** Você já trabalhou recentemente!\n\nTente novamente em **${time.minutes}m ${time.seconds}s**`)
        let embed1 = new Discord.MessageEmbed();
        message.channel.send(`${user}`, embed1);
    } else {

        let replies = ['Programador','Construtor','Agricultor','Garoto(a) de Programa','Garçom','Mecânico','Cozinheiro','Vendedor','Barqueiro','Youtuber','Padeiro','Administração de empresas','Administração de operações e produções','Administração financeira','Ciências Contábeis','Consultor','Logística','Marketing digital','Editor','Ator','TikToker', 'Desenvolvedor de Sites', 'Designer', 'Hack', 'Bug Hunter','Assassino', 'Traficante', 'Mercenário']
  
        let result = Math.floor((Math.random() * replies.length));

        let amount = Math.floor(Math.random() * 15000) + 1;

        let embed1 = new Discord.MessageEmbed()
        .setTitle("<a:work:845620845648412702> **|** Trabalho")
        .setColor("#707adc")
        .setDescription(`:dollar: ${user.username} trabalhou como **${replies[result]}** e ganhou **R$${amount}**`)
        .setTimestamp();

        message.channel.send(`${user}`, embed1);
        
        db.add(`money_${message.author.id}_${user.id}`, amount);
        db.set(`work_${message.author.id}_${user.id}`, Date.now());
    };
}