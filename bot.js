#!/usr/bin/env node
//Run dotenv
require('dotenv').config();

//Libraries-
const Discord = require('discord.js');
//https://discord.js.org/#/docs/commando/master
const COMMANDO = require('discord.js-commando');
const PATH = require('path');
const discClient = new Discord.Client();
const client = new COMMANDO.CommandoClient({
  owner: '407297053559881748',
  commandPrefix: ';'
});
const { Client, MessageEmbed, Permissions, MessageAttachment} = require('discord.js');
//const CMD_PREFIX = ";";
const EMOJI_GRT = "laws";
const EMOJI_TO_GRT = "lawS";
const CHANNEL_INTERVAL = "679561749095383041";
const REGLAS_CHANNEL =  '-Respeto entre todos \n' +
                        '- No spam de ningún tipo \n' +
                        '- No enviar un mensaje completamente en mayúsculas \n' +
                        '- No spoilers de ningún tipo \n' +
                        '-No pasar links a no ser que se pidan \n';

const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const streamOptions = {seek: 0, volume: 1};
const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const JIMP = require('jimp');
//const musicUrls = [];

var channel_send_inter = "",
    dispatcher = " ",
    flagTyping = true,
    playlist = {
      musicUrls : [],
    };

    module.exports = {
      discClient : client,
      playlist : playlist,
      dispatcher: dispatcher,
    };

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

client.on("voiceStateUpdate", (oldState, newState) => {//When the bot is discc from voiceChannel clean the Playlist
  //console.log(newState);
  if(newState.channel == null){
    playlist.musicUrls = [];
  }
});

//Initialize bot by connecting to the server
client.login(process.env.TOKEN);

client.registry.registerGroups([
  ['mods', 'mods commands'],
  ['misc', 'misc commands'],
  ['nsfw', 'nsfw commands'],
  ['music', 'music commands']
]).registerDefaults()
.registerCommandsIn(PATH.join(__dirname, 'commands'));

client.on('typingStart', (channel, user) => {
  //console.log(`${user.username} is typing in ${channel.name}`)
  if((user.username == 'Xiampa') && (flagTyping)){
    channel.send("Atención, Xiampa va a escribir!");
    flagTyping = false;
  }
  if(!flagTyping){
    console.log("Typing en timeout");
  }
  setTimeout(function(){
    flagTyping = true;
  },3600000);
});

/*
//Detects if a user ghost typing
client.on('typingStart', async (channel, user) =>{
  var flagGhosting = true;;
  //channel.send("...");}
  console.log("1- "+user.username +" is typing..");
  client.on('message', message => {
    console.log("2- incoming message from: "+message.author.username);
    if(message.author.id == user.id){
      //Mando un mensaje...
      flagGhosting = false;
      console.log("2.1- after typing "+user.username+" sends a message");
    }
  });
  setTimeout(function(){
    if(flagGhosting){
    //  channel.send("....");
      console.log("2.2- "+user.username+" is ghosting");
    }
  },10000);
});
*/

client.on('message', async message => {
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
});


//////////////////// FUNCTIONS ///////////////////////////

function getNames(obj, key) {
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if ("object" == typeof(obj[key])) {
        console.log("RECUR");
        getNames(obj[key], name);
      } else if (key == name) {
        //obj_result.push(obj[key]);
        console.log("RESULTADO: "+obj[key]);
      }
    }
  }
}

async function songInfo(url,message,description){
  const info = await ytdl.getBasicInfo(url);

  const embed = new MessageEmbed()
    .setColor(0xff0000)
    //.setDescription(description)
    .setTitle(info.videoDetails.title)
    .setURL(url)
    .setDescription("Author: " + info.videoDetails.author.name)
    .setTimestamp()
    .setFooter(description, 'https://i.imgur.com/AfFp7pu.png');
  message.channel.send(embed);
}

function getVoiceChannel(message){//Obtain current voice channel from user that invokes music bot
  let voice_channel = null;
  try {
    let voice_channel_id = message.guild.members.cache.get(message.author.id).voice.channel.id;
    voice_channel = message.guild.channels.cache.find(channel => channel.id === voice_channel_id);
  } catch (e) {
    console.log('User is not in a VoiceChannel');
  }

return voice_channel;
}

async function playSong(messageChannel, voiceConnection, voice_channel){//Play a song from the queue after 5s play next
  const stream = ytdl(musicUrls[0], { quality: 'highestaudio',filter:'audioonly' });
  const dispatcher = voiceConnection.play(stream, streamOptions);

  dispatcher.on('finish', () => {
    musicUrls.shift();//Remove first element from array of songs
  /*
  ytdl(youtube_url)
  .on('info', (info) => {
    console.log(info.title); // the video title
  });
  */
    if(musicUrls.length == 0){
      voice_channel.leave();
      console.log("LEAVE MUSIC CHANNEL: " + voice_channel);
    }
      else{
        setTimeout(() =>{
            playSong(messageChannel, voiceConnection, voice_channel);
        },5000);//wait 5sec and play next song
      }
  })
}

function helloReaccion(msg, reactEmoji){//Add a greeting emoji
  var emojiId;
  emojiId = msg.guild.emojis.cache.find(emoji => emoji.name == reactEmoji);
  msg.react(emojiId.id);
}

function checkCommand(message, commandName){//Check if a msg is a command w/ prefix
  return message.content.toLowerCase().startsWith(CMD_PREFIX + commandName);
}

function isUpperCase(str){//check if a msg if fully mayus
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
