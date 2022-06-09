const Discord = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: `blacklist`,
    run: async (client, message, args) => {
        try {
            if (message.author.id !== "763553190133366844") return;
            let user = message.mentions.users.first() || client.users.cache.get(args[1])
            if (!user) return;

            if (args[0] === "add") {
                db.set(`blacklist/${user.id}`, true)
                message.channel.send(`Acabo de colocar o \`${user.tag}\` na blacklist!`)
            }
            if (args[0] === "remove") {
            
                db.delete(`blacklist/${user.id}`)
                message.channel.send(`Acabo de retirar o \`${user.tag}\` da blacklist!`)
            }
        } catch (e) {
            console.log(e)
        }
  }
  }