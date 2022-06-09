const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {

  let ownerID = '763553190133366844'
  if(message.author.id !== ownerID) return;

    let user = message.mentions.users.first();

    if (!user) {
        return message.channel.send(` ${message.author}, você precisa mencionar um usuário para adicionar o dinheiro!`);
    };

    if (isNaN(args[1])) {
        return message.channel.send(` ${message.author}, você precisa colocar um número válido!`);
    };

    db.add(`money_${message.author.id}_${user.id}`, args[1]);
    let bal = await db.fetch(`money_${message.author.id}_${user.id}`);

    let moneyEmbed = new Discord.MessageEmbed()
    .setTitle(":dollar: **|** Money Adicionado!")
    .setColor("#707adc")
    .setDescription(`Foi adicionado **$${args[1]}** na conta de ${user}!\n\n:dollar: Dinheiro Atual: **R$${bal}**`)
    .setFooter(`Money foi adicionado!`);
    message.channel.send(moneyEmbed);
}