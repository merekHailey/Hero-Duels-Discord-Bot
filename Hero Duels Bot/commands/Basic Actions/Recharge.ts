import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import { client, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function Recharge(message: Message) {

//RECHARGE FOR DISARM
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'recharge' && ProfList[ProfIndex(message.author.id)].activeDisarmCounter != 0)
    {
        //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Recharge')
        {
            //Grappled?
            if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
            {
                return'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn. However, you are grappled and must make a Basic Attack this turn.';
            }
        }
        //Not this action
        else
        {
            return'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn.';
        }
    }
        //Grappled?
        if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
        {
            return 'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.';
        }
        
        changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)   
        ProfList[ProfIndex(message.author.id)].activeDisarmCounter -= 1;
        if(ProfList[ProfIndex(message.author.id)].activeDisarmCounter == 0)
        {
            ProfList[ProfIndex(message.author.id)].activeadded_Damage += ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeFameMod

        }
        return 'You recharged. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
    }

    //RECHARGE FOR Trip
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'recharge' && ProfList[ProfIndex(message.author.id)].activeIsTripped == true)
    {
        //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Recharge')
        {
            //Grappled?
            if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
            {
                return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn. However, you are grappled and must make a Basic Attack this turn.';
            }
        }
        //Not this action
        else
        {
            return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn.';
        }
    }
        //Grappled?
        if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
        {
            return 'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.';
        }
        ProfList[ProfIndex(message.author.id)].activeIsTripped = false;
        changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber) 
        return 'You recharged. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner); 
        
    }
    return null;
}
export {Recharge}