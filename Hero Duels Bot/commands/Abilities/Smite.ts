import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import { client, ProfList } from "../Global Vars"
import ActionMenu from '../Functions/Action Menu';
import { ProfIndex } from '../Objects/Profile'
import { CorkSTH } from '../Objects/HeroCard';
import HasAction from '../Functions/HasAction';

function Smite(message: Message) {

//SMITE
    //Cork is Human
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'smite' && HasAction(message.author.id, 'smite'))
    {
        //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Smite')
        {
            //Grappled?
            if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
            {
                    return'You declared you would use ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn. However, you are grappled and must make a Basic Attack this turn.';
            }
        }
        //Not this action
        else
        {
            return'You declared you would use ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn.';
        }
    }
        //Grappled?
        if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
        {
            return'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.';
        }
        //hasn't used smite yet
        if (ProfList[ProfIndex(message.author.id)].activeAction1Status == 'unused')
        {
            //Has bonus action
            if(ProfList[ProfIndex(message.author.id)].activeBonusAction == true)
            {
                ProfList[ProfIndex(message.author.id)].activeadded_Damage += 6;
                ProfList[ProfIndex(message.author.id)].activeAction1Status = 'used';
                ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
                ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
                //Cork?
                if(ProfList[ProfIndex(message.author.id)].activeCard == CorkSTH)
                return 'Your Trident glows with a brilliant blue light. Gozreh smiles on you. ' + Formatters.bold('Roll') + ' to attack with a +6 to damage!';
            }
            else
            {
                ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
                return 'You need a bonus action to use Smite. ' + ActionMenu(message.author.id);
            }
        }
        //already used
        else
        {
        return 'You have already used this ability this combat. ' + ActionMenu(message.author.id);                  
        }
    }
    return null;
}
export {Smite}