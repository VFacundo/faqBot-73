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
const REGLAS_CHANNEL =  '-Respeto entre todos \n' +
                        '- No spam de ningún tipo \n' +
                        '- No enviar un mensaje completamente en mayúsculas \n' +
                        '- No spoilers de ningún tipo \n' +
                        '-No pasar links a no ser que se pidan \n';

const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

var channel_send_inter = "";
//Event Listener when a user connected to the server
client.on('ready' , () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //Set PLAYING Message
  client.user.setActivity('Path of Exile', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
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

client.on('typingStart', (channel, user) => {
  //console.log(`${user.username} is typing in ${channel.name}`)
  if(user.username == 'FAQLXXIII'){
    msg = new Discord.message(client);
    msg.channel.send("works");
    console.log("es faq");
  }
});

//Event listener when a user sends a message in the chat
client.on('message', message => {
  var msg;

// do bot typing
/*
  if(message.channel.startTyping()){
    console.log("hola");
  }
*/
  if(message.author.bot) return;

  //check if a msg is all uppercase
  //firts check if is an image
  if(!(message.attachments.size>0)){
    if(isUpperCase(message.content)){
      const attachment = new Discord.MessageAttachment('!reglas');
      message.reply("!reglas ;reglas")
        .then(() => console.log(`Mayus Detected: ${message.author.username}`))
        .catch(console.error);
    }
  }

  msg = message.content.toLowerCase();

  if(msg.includes(EMOJI_GRT) || msg.includes("buenas") || msg.includes("buenos dias") || msg.includes("buen dia") || msg.includes("hola") || msg.includes("hello")){
    helloReaccion(message,EMOJI_TO_GRT);
  }

  if(msg.includes("murio") || msg.includes(" rip ") || msg.includes("muerto") || msg === "rip"){
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
  }else if(checkCommand(message, "reglas")){
    const embed = new MessageEmbed()
      .setTitle('Reglas')
      .setColor(0xff0000)
      .setDescription(REGLAS_CHANNEL);
    message.reply(embed);
  }else if(checkCommand(message, "play")){
    //console.log(message.guild.members.cache.get(message.author.id).voice.channel.id);
    try{
      var voice_channel_id = message.guild.members.cache.get(message.author.id).voice.channel.id;
          voice_channel = message.guild.channels.cache.find(channel => channel.id === voice_channel_id);

      if(voice_channel != null){
        console.log(voice_channel.name + " was found" + "id: "+ voice_channel.type);
        voice_channel.join()
        .then(connection =>{
          console.log("Bot joined to the channel: " + voice_channel.name);
          const stream = ytdl('https://youtu.be/91v2pbodKNY', { quality: 'highestaudio' });
          const dispatcher = connection.play(stream, streamOptions);
        })

      }
    } catch(e){
      message.reply("No estas en un canal de Voz");
    }
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
  var upper = 0, total_Upper = 0, arrayPhase;

  arrayPhase = str.split(" ");

  if(arrayPhase.length <= 1){
    //no se considera mayus, exit
    return false;
  }

  for (var i = 0; i < str.length; i++) {
    if((/^[A-Z]*$/).test(str[i])){
      upper++;
    }
  }
  //console.log("Lenght VAR:" +str.length);
  //console.log("UpperCASE: "+upper);
  total_Upper = (upper*100)/(str.length);
  //console.log("%: "+total_Upper);
  return (total_Upper>=75) ? true : false;
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
