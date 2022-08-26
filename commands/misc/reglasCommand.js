const COMMANDO = require('discord.js-commando');
const { Client, MessageEmbed, Permissions, MessageAttachment} = require('discord.js');
const REGLAS_CHANNEL =  '-Respeto entre todos \n' +
                        '- No spam de ningún tipo \n' +
                        '- No enviar un mensaje completamente en mayúsculas \n' +
                        '- No spoilers de ningún tipo \n' +
                        '-No pasar links a no ser que se pidan \n';

module.exports = class reglasValueCommand extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'reglas',
      group: 'misc',
      memberName: 'reglas',
      description: 'Display the rules of the crew. :)',
      clientPermissions: [
        'SEND_MESSAGES'
      ],
    })
  }

  async run(commandoMsg){
    const embed = new MessageEmbed()
      .setTitle('Reglas')
      .setColor(0xff0000)
      .setDescription(REGLAS_CHANNEL);
    commandoMsg.channel.send(embed);
  }
}
