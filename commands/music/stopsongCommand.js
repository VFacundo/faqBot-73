const COMMANDO = require('discord.js-commando');
const { Client, MessageEmbed, Permissions, MessageAttachment} = require('discord.js');
var importedClient = require('./../../bot'),
    songsFunction = require('./playCommand').connectionObject;

module.exports = class stopsongCommand extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'stop',
      group: 'music',
      memberName: 'stopsong',
      description: 'Stop the current playlist and disconnect from voice :)',
      clientPermissions: [
        'SEND_MESSAGES'
      ],
    })
  }

  async run(commandoMsg){
    //songsFunction.connectionObject.voiceConnection.pause();
    songsFunction.voiceChannel.leave();
    console.log("LEAVE MUSIC CHANNEL: " + voice_channel);
  }
}
