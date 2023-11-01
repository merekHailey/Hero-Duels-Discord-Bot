import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import { client, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function Menu(message: Message) {
//MENU
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'basic actions' || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'ba')
    {
        //Grappled?
        if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
        {
            return 'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.'
        }
        var BAmenu: string;
        BAmenu = 'Basic Actions:\n' + Formatters.bold('Demoralize\nDisarm\nFeint\nFind Weakness\nTrip');

        //Not Grappling?
        if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsGrappled != true)
        {
            BAmenu += '\n' + Formatters.bold('Grapple')
        }
        BAmenu += '\n' + Formatters.bold('Pass Turn')

        //BONUS ACTION MENU
        BAmenu += '\n\nBonus Actions:';

        //Grappling?
        if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsGrappled == true)
        {
            BAmenu += '\n' + Formatters.bold('Maintain Grapple')
        }
        BAmenu += '\n' + Formatters.bold('Study');

        BAmenu += '\nBack';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu'
        return BAmenu
    }

    //Back
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'back')
    {
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start'
        return ActionMenu(message.author.id);
    }
    return null;
}
export {Menu}