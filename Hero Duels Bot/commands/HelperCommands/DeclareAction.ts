import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import ValidAction from '../Functions/ValidAction'
import { client, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function DeclareAction(message:Message) {
//DECLARE ACTION
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' declare action' && message.author.bot == false)
    {
        if(ValidAction(message.author.id, message.content.toLowerCase()) == true)
        {
            
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' wait'
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber);
            ProfList[ProfIndex(message.author.id)].activeIsStudied = false;
            ProfList[ProfIndex(message.author.id)].activeIsStudyPrimed = false;
            return "You must select " + Formatters.bold(message.content) + ' as your next action. You may still choose your bonus action if you so desire. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
        // else
        // {
        //     (client.channels.cache.get(message.channelId) as TextChannel)
    
        //     .send("You must select a valid action that you are able to perform.")
        // }
    }
    return null;
}
export {DeclareAction}
