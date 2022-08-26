const COMMANDO = require('discord.js-commando');
const { Client, MessageEmbed, Permissions, MessageAttachment} = require('discord.js');
//const client = new Discord.Client();
var importedClient = require('./../../bot');
//var songsFunction = require('./playCommand').connectionObject;
//import {musicUrls} from './../../bot';


module.exports = class resumesongCommand extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      group: 'music',
      memberName: 'resumesong',
      description: 'Resume the current playlist. :)',
      clientPermissions: [
        'SEND_MESSAGES'
      ],
    })
  }

  async run(commandoMsg){
    //songsFunction.connectionObject.voiceConnection.pause();
    importedClient.dispatcher.resume();
    importedClient.dispatcher.pause();
    importedClient.dispatcher.resume();//QuickFix to the bug. After a pause the bot wont play the song again
    console.log("Player Resume");
  }
}
