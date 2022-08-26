const COMMANDO = require('discord.js-commando');

module.exports = class deleteLastCommand extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'deletelast',
      group: 'mods',
      memberName: 'deletelast',
      description: 'Delete the last N msg of the current channel. :)',
      userPermissions: [
        'MANAGE_MESSAGES'
      ],
      clientPermissions: [
        'MANAGE_MESSAGES'
      ],
      argsType: 'multiple',
    })
  }
  async run(commandoMsg, args){
    
    let msgQuantity = parseInt(args[0]);
    if(msgQuantity>=100){
      msgQuantity = 99;
    }

    try {
      async function clear(){
        commandoMsg.delete();
        //const fetched = await message.channel.fetch({limit: 3});
        await commandoMsg.channel.bulkDelete(msgQuantity+1);
      }
      clear();
    }catch (e) {
      console.log("ERROR DELETELAST: "+ e);
    }

  }
}
