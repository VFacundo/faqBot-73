const COMMANDO = require('discord.js-commando');
const { Client, MessageEmbed, Permissions, MessageAttachment} = require('discord.js');
//const client = new Discord.Client();
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const ytpl = require('ytpl');
const streamOptions = {seek: 0, volume: 1};
var connectionObject = {
  voiceConnection : " ",
  messageChannel : " ",
  voiceChannel : " ",
  //dispatcher : " ",
};
var importedClient = require('./../../bot');
//import {musicUrls} from './../../bot';

module.exports = class playCommand extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Play a song from YT URL. :)',
      clientPermissions: [
        'SEND_MESSAGES'
      ],
    })
  }

  async run(commandoMsg){
    let args = commandoMsg.content.split(" ");
    let url = args[1];
    let voice_channel = getVoiceChannel(commandoMsg);

    try{
      commandoMsg.delete();
    }catch(e){
      console.log('ERROR: ' + e);
    }

    if(ytdl.validateURL(url)){
      console.log("Valid URL!");
      var flag = importedClient.playlist.musicUrls.some(element => element === url);

      if(!flag){

        if(ytpl.validateID(url)){
          console.log("Es una playlist");
          const playlist = await ytpl(url);
          playlist['items'].forEach((item, i) => {
            //console.log(item['url']);
            let url = item['url'];
            if(!(importedClient.playlist.musicUrls.some(element => element === url))){
              importedClient.playlist.musicUrls.push(url);
              //console.log("ITEM NRO: " + i);
            }
          });
          songInfo(url,commandoMsg,"Successfully added " + playlist['items'].length + " songs to the queue!")
          url = importedClient.playlist.musicUrls[0];
          //console.log(playlist['items']);
        }else{
          importedClient.playlist.musicUrls.push(url);
        }
        //songInfo(url,commandoMsg,'Playing..');
        let isConnectedToVoice = false;
        //console.log("voice channel = " + voice_channel);
        //console.log(client.voice.connections);
        //for(let [key,value] of client.voice.connections){
        //  console.log('KEY: ' + key);
        //}
        //console.log(importedClient.discClient.voice.connections);
        importedClient.discClient.voice.connections.forEach(function(value, key) {
          if(value['channel'] == voice_channel){
            isConnectedToVoice = true;
            console.log("The Bot is playing in this Channel " + voice_channel);
          }
        });
        if(voice_channel != null){
            //if(voice_channel.connection){
          if(isConnectedToVoice){
            songInfo(url,commandoMsg,"Successfully added to the queue!");
          }else{
            songInfo(url,commandoMsg,'Playing..');
              try{
                connectionObject.voiceConnection = await voice_channel.join();
                await playSong(commandoMsg.channel, connectionObject.voiceConnection, voice_channel);
              }catch(ex){
                console.log(ex);
              }
          }
        }else {
          commandoMsg.reply('Please join to a voice channel!');
        }
      }else{
        commandoMsg.reply('This song is already in the playlist!');
      }
    }else {
      commandoMsg.reply('not valid URL!');
    }
  }
}
module.exports.connectionObject = connectionObject;

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

async function playSong(messageChannel, voiceConnection, voice_channel){//Play a song from the queue after 5s play next
  const stream = ytdl(importedClient.playlist.musicUrls[0], { quality: 'highestaudio',filter:'audioonly' });
   importedClient.dispatcher = connectionObject.voiceConnection.play(stream, streamOptions);

   importedClient.dispatcher.on('finish', () => {
    importedClient.playlist.musicUrls.shift();//Remove first element from array of songs
  /*
  ytdl(youtube_url)
  .on('info', (info) => {
    console.log(info.title); // the video title
  });
  */
    if(importedClient.playlist.musicUrls.length == 0){
      voice_channel.leave();
      console.log("LEAVE MUSIC CHANNEL: " + voice_channel);
    }
      else{
        setTimeout(() =>{
            playSong(messageChannel, connectionObject.voiceConnection, voice_channel);
        },5000);//wait 5sec and play next song
      }
  })
}
