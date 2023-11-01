import DiscordJS, { Formatters, Message } from 'discord.js'
import { ProfList } from "../Global Vars"
import { SearchProfile } from '../Objects/Profile';
import changeTurn from '../Functions/ChangeTurn';
import ActionMenu from '../Functions/Action Menu';
import { ProfIndex } from '../Objects/Profile'
import { TiberiusSTH } from '../Objects/HeroCard';
import HasAction from '../Functions/HasAction';
function Rage(message:Message) {
//Stop Raging
    //is raging
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'stop raging' && ProfList[ProfIndex(message.author.id)].activeAction1Status == 'raging')
    {
        //Has Rage
        if (HasAction(message.author.id, 'rage'))
        {
            
            //Grappled?
            if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
            {
                return'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.';
            }
            //Has bonus action
            if (ProfList[ProfIndex(message.author.id)].activeBonusAction == true)
            {
                //Has more than 4HP
                if (ProfList[ProfIndex(message.author.id)].activeHp > 4)
                {
                    ProfList[ProfIndex(message.author.id)].activeAction1Status = 'not raging';
                    ProfList[ProfIndex(message.author.id)].activeHp -= 4;
                    ProfList[ProfIndex(message.author.id)].activeadded_Damage -= 1;
                    ProfList[ProfIndex(message.author.id)].activeAC += 1;
                    //Specialty check
                    //BAC
                    if(ProfList[ProfIndex(message.author.id)].activeBAC != 0)
                    {
                        ProfList[ProfIndex(message.author.id)].activeBAC += 1;
                    }
                    //PAC
                    if(ProfList[ProfIndex(message.author.id)].activePAC != 0)
                    {
                        ProfList[ProfIndex(message.author.id)].activePAC += 1;
                    }
                    //SAC
                    if(ProfList[ProfIndex(message.author.id)].activeSAC != 0)
                    {
                        ProfList[ProfIndex(message.author.id)].activeSAC += 1;
                    }
                    //MAC
                    if(ProfList[ProfIndex(message.author.id)].activeMAC != 0)
                    {
                        ProfList[ProfIndex(message.author.id)].activeMAC += 1;
                    }
                    ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
                    return 'You used your bonus action to stop raging. Your Hp decreases by 4, your damage goes down by 1, and your AC increases by 1! ' + ActionMenu(message.author.id);
                }
                //Has less than 4HP
                else 
                {
                    return 'Your HP is too low to stop raging, doing this would kill you. ' + ActionMenu(message.author.id);
                }
            }
            //No Bonus Action
            else
            {
                return 'You need to have a bonus action to use this action. ' + ActionMenu(message.author.id);
            }
        }
    }

            
    //Rage Action

    if(SearchProfile(message.author.id, 'lock') == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'rage' && ProfList[ProfIndex(message.author.id)].activeAction1Status == 'not raging' && HasAction(message.author.id, 'rage'))
{
    //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Rage')
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
            'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn.';
        }
    }
    //Grappled?
    if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
    {
        return'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.';
    }
        //Reset declaration
        ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';

        ProfList[ProfIndex(message.author.id)].activeHp += 4;
        ProfList[ProfIndex(message.author.id)].activeadded_Damage += 1;
        ProfList[ProfIndex(message.author.id)].activeAC -= 1;
        //Specialty check
                    //BAC
                    if(ProfList[ProfIndex(message.author.id)].activeBAC != 0)
                    {
                        ProfList[ProfIndex(message.author.id)].activeBAC -= 1;
                    }
                    //PAC
                    if(ProfList[ProfIndex(message.author.id)].activePAC != 0)
                    {
                        ProfList[ProfIndex(message.author.id)].activePAC -= 1;
                    }
                    //SAC
                    if(ProfList[ProfIndex(message.author.id)].activeSAC != 0)
                    {
                        ProfList[ProfIndex(message.author.id)].activeSAC -= 1;
                    }
                    //MAC
                    if(ProfList[ProfIndex(message.author.id)].activeMAC != 0)
                    {
                        ProfList[ProfIndex(message.author.id)].activeMAC -= 1;
                    }
        ProfList[ProfIndex(message.author.id)].activeAction1Status = 'raging';
    

    changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber);
    //Tiberius? 
    if(ProfList[ProfIndex(message.author.id)].activeCard == TiberiusSTH)
    {
    return 'Tiberius lets out a terrifying scream! His veins are buldging and fear begins to take his opponents over. The Night Tearer is the least of their worries, as Tiberius is now Raging. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
    }
}
return null;
}
export {Rage}