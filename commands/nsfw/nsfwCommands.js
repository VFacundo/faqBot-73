const COMMANDO = require('discord.js-commando');
const puppeteer = require('puppeteer');


//IMG COMMAND
module.exports = class nsfwCommands extends COMMANDO.Command {
  constructor(client) {
    super(client, {
      name: 'gollum',
      group: 'nsfw',
      memberName: 'gollum',
      nsfw: 'true',
      description: 'ah pero que picaro que sos... :)',
      clientPermissions: [
        'SEND_MESSAGES'
      ],
    })
  }
  async run(commandoMsg, args){

    try{
      commandoMsg.delete();
    }catch(e){
      console.log('ERROR: ' + e);
    }
    //console.log(message.channel.nsfw);
    try{
      const browser = await puppeteer.launch({headless:true});
      const page = await browser.newPage();
      await page.goto('aca/va/la/url', {waitUntil: 'load'});
      //const result = await page.content(); Return everything
      const result = await page.$eval('pre', el => el.textContent);
      await browser.close();
      //console.log(result);
      const data = JSON.parse(result);
      let obj_result = [];
      obj_result = findKey(data,'data',obj_result);
      let rnd = Math.floor(Math.random()*(obj_result.length));

      let videoSnd = obj_result[rnd].url_overridden_by_dest;
      /*
      const embed = new MessageEmbed()
        .setTitle('Opa')
        .setURL(videoSnd)
        .setColor(0xff0000)
        .setImage(videoSnd)
      message.channel.send(embed);
      */
      commandoMsg.channel.send(videoSnd);

    } catch (e) {
      console.log(e);
    }

  }
}


  function findKey(obj, key,result) {
    for ([k, v] of Object.entries(obj)){
        //if (k == key) return v
        if(k == key){
          //console.log(v);
          result.push(v);
        }
        if (typeof v === 'object' &&  v !== null ){
            let found = findKey(v, key,result)
        }
    }
    return result;
  }
