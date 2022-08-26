const COMMANDO = require('discord.js-commando');
const { Client, MessageEmbed, Permissions, MessageAttachment} = require('discord.js');
//const client = new Discord.Client();
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const ytpl = require('ytpl');
const streamOptions = {seek: 0, volume: 1};
var importedClient = require('./../../bot');
var songsFunction = require('./playCommand');
//import {musicUrls} from './../../bot';


module.exports = class playnextCommand extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'playnext',
      group: 'music',
      memberName: 'playnext',
      description: 'Skip a song from the current playlist. :)',
      clientPermissions: [
        'SEND_MESSAGES'
      ],
    })
  }

  async run(commandoMsg){
    songsFunction.pauseSong();
  }
}
