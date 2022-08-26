const COMMANDO = require('discord.js-commando');
const puppeteer = require('puppeteer');
const { Client, MessageEmbed, Permissions, MessageAttachment} = require('discord.js');

module.exports = class dolarValueCommand extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'dolar',
      group: 'misc',
      memberName: 'dolar',
      description: 'Display the value of U$D. :)',
      clientPermissions: [
        'SEND_MESSAGES'
      ],
    })
  }

  async run(commandoMsg){
    let url = "https://mercados.ambito.com//dolar/informal/variacion";
    try {
      const browser = await puppeteer.launch({headless:true});
      const page = await browser.newPage();
      await page.goto('https://mercados.ambito.com//dolar/informal/variacion', {waitUntil: 'load'});
      //const result = await page.content(); Return everything
      const result = await page.$eval('pre', el => el.textContent);
      //console.log(result);
      const obj = JSON.parse(result);
      //console.log("compra "+obj.compra);

      const embed = new MessageEmbed()
        .setTitle('DOLAR BLUE')
        .setURL('https://www.ambito.com/contenidos/dolar.html')
        .setThumbnail('https://www.ambito.com/css-custom/239/images/up.svg')
        .setColor(0xff0000)
        .addField('Compra: '+obj.compra, '---------',false)
        .addField('Venta: '+obj.venta, '---------',false)
        .addField('Variacion: '+obj.variacion, '---------',false)
      commandoMsg.channel.send(embed);
        } catch (e) {
            console.log(e);
    }
  }
}
