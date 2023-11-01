import DiscordJS, {Intents} from 'discord.js'
 import {Profile} from "./Objects/Profile";
 const fs = require("fs")
 
 //GLOBAL VARIABLES
 var ProfList = Array(500).fill(Profile)
 var IDcounter = 0;
 var nat20Emoji = '<:nat20:875478326448357498>';
 var nat1Emoji = '<:nat1:875478342118301696>';
 var savedata = JSON.parse(fs.readFileSync("SaveData..json", "utf8"));
 const client = new DiscordJS.Client({
   intents: [
       Intents.FLAGS.GUILDS,
       Intents.FLAGS.GUILD_MESSAGES,
       Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
       Intents.FLAGS.DIRECT_MESSAGES
   ]
})

 //IDcounterUp

 function IDcounterUp()
 {
    IDcounter++;
 }

 export {ProfList, IDcounter, nat20Emoji, nat1Emoji, savedata, IDcounterUp, client}