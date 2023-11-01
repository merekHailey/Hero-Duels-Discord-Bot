import DiscordJS, { Formatters, Message } from 'discord.js'
import { ProfList, IDcounterUp, IDcounter } from "../Global Vars"
import RewriteSave from '../Functions/Rewrite_Save'
import { Profile } from '../Objects/Profile'

function Start(message: Message) {
    if (message.content.toLowerCase() === 'hd start') 
    {
        var i = 0;
        while (message.author.id !== ProfList[i].id)
        {
            if (i !== 499)
            {
                i = i + 1;
            }
            else
            {
                    const newName = Object.create(Profile)
                newName.username = message.author.username;
                newName.id = message.author.id;
                newName.index = IDcounter;
                newName.lock = 'none';
                ProfList[IDcounter] = newName;
                IDcounterUp();
                RewriteSave(message.author.id)
                return 'Welcome to ' + Formatters.bold('Hero Duels ') + Formatters.userMention(message.author.id) + ', you are now registered to play.';
            }
        }
        return 'You have already registered, if you do not know what to do, use ' + Formatters.bold(' HD help ') + 'for options';
        
            
    }
    return;
}

export default Start