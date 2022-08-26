const COMMANDO = require('discord.js-commando');
const { Client, MessageEmbed, Permissions, MessageAttachment} = require('discord.js');
//const client = new Discord.Client();
var importedClient = require('./../../bot');
var songsFunction = require('./playCommand').connectionObject;
//import {musicUrls} from './../../bot';


module.exports = class pausesongcommand extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      group: 'music',
      memberName: 'pausesong',
      description: 'Pause the current playlist. :)',
      clientPermissions: [
        'SEND_MESSAGES'
      ],
    })
  }

  async run(commandoMsg){
    //songsFunction.connectionObject.voiceConnection.pause();
    importedClient.dispatcher.pause();
    console.log("Player Paused");
  }
}
