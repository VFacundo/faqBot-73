//Run dotenv
require('dotenv').config();

//Libraries-
const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed} = require('discord.js');
//Event Listener when a user connected to the serve
client.on('ready' , () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Event listener when a user sends a message in the chat
client.on('message', msg =>{
  if(msg.content === 'ping') {
    msg.reply('pong');
  }
  if(msg.content == 'cual es mi avatar?'){
    msg.reply(msg.author.displayAvatarURL());
  }
});

client.on('messageDelete', message => {
  if(!message.partial) {
    const channel = client.channels.cache.get('679561749095383041');
    if(channel){
      const embed = new MessageEmbed()
          .setTitle('Deleted Message')
          .addField('Author', `${message.author.tag} (${message.author.id})`)
          .addField('Channel', `${message.channel.name} (${message.channel.id})`)
          .setDescription(message.content)
          .setTimestamp();
      channel.send(embed);
    }
  }
})


//Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);