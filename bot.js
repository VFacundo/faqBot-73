//Run dotenv
require('dotenv').config();

//Libraries-
const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed} = require('discord.js');
const CMD_PREFIX = ";";
const EMOJI_GRT = "laws";
const EMOJI_TO_GRT = "lawS";
const CHANNEL_INTERVAL = "679561749095383041";

var channel_send_inter = "";
//Event Listener when a user connected to the server
client.on('ready' , () => {
  console.log(`Logged in as ${client.user.tag}!`);

  /*
  //Send msg on a interval
  channel_send_inter = client.channels.cache.find(channel => channel.id === CHANNEL_INTERVAL);
  setInterval(() => {
    channel_send_inter.send("Message sent in an interval");
  },5000000);
 ///////////
 */
});

//Initialize bot by connecting to the server
client.login(process.env.TOKEN);

//Event listener when a user sends a message in the chat
client.on('message', message => {
  var msg;

  if(message.author.bot) return;

/*
  //check if a msg is all uppercase
  if(isUpperCase(message.content)){
    const attachment = new Discord.MessageAttachment('!reglas');
    message.channel.send(`${message.author},`, attachment);
  }
*/
  msg = message.content.toLowerCase();

  if(msg.includes(EMOJI_GRT)){
    helloReaccion(message,EMOJI_TO_GRT);
  }

  if(msg.includes("murio") || msg.includes("rip") || msg.includes("muerto")){
    const attachment = new Discord.MessageAttachment('https://cdn.discordapp.com/emojis/829727739191230504.png');
    message.channel.send(attachment);
  }

  if(checkCommand(message, "help")){
    message.channel.send("Triggered help Command (Under Const.)");
  }
  else if(checkCommand(message, "roles")){
    message.channel.send("Server Roles.");
  }
  else if(checkCommand(message, "avatar")){
    const embed = new MessageEmbed()
      .setTitle('Avatar de '+ message.author.tag)
      .setColor(0xff0000)
      .setImage(message.author.displayAvatarURL());
    message.reply(embed);
  }
});

function helloReaccion(msg, reactEmoji){
  var emojiId;
  emojiId = msg.guild.emojis.cache.find(emoji => emoji.name == reactEmoji);
  msg.react(emojiId.id);
}

function checkCommand(message, commandName){
  return message.content.toLowerCase().startsWith(CMD_PREFIX + commandName);
}

function isUpperCase(str){
  return (/^[A-Z]*$/).test(str);
}
/*
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
*/
