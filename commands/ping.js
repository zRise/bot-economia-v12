const ms = require("ms")
const Discord = require("discord.js")

module.exports = {
name: "ping",
run: async(client, message, args) => {
let msg = await message.channel.send(`🏓 Pong... (aguarde)`)
  let time = 3*500
  setTimeout(function(){
    msg.edit(`⚡ **Ping:** \`${client.ws.ping}\``)
  }, time)
  time += 3*500
  setTimeout(function(){
    msg.edit(`⚡ **Ping:** \`${client.ws.ping}\``)
   }, time)
  time += 3*500
  setTimeout(function(){
    msg.edit(`⚡ **Ping:** \`${client.ws.ping}\``)
  }, time)
}
}