import DiscordJS, { Formatters } from 'discord.js'
import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import HasAction from './HasAction'
import { TiberiusSTH, CorkSTH, FrizzagiggSTH, GrauSTH } from "../Objects/HeroCard";

function GetTurnActions(IDofTurnStart: string): string
{
    var menu: string = '';
    
    //Grapple Maintained?
    if(ProfList[ProfIndex(IDofTurnStart)].activeGrappleIsMaintained == true)
    {
        //Grappled?
        if (ProfList[ProfIndex(IDofTurnStart)].activeIsGrappled == true && ProfList[ProfIndex(IDofTurnStart)].tempPartner != undefined)
        {
            menu += Formatters.bold('\nAttack')
            return menu;
        }
    }
    
    //regular turn
    else
    {
        
        //Attack and Basic Actions
        menu += Formatters.bold('\nAttack\nBasic Actions');
        
        //Rage 
        if (HasAction(IDofTurnStart, 'rage'))
        {
            //Not Raging
            if(ProfList[ProfIndex(IDofTurnStart)].activeAction1Status != 'raging')
            {
                menu += '\n' + Formatters.bold('Rage')
            }
            //activeBonusAction
            if(ProfList[ProfIndex(IDofTurnStart)].activeBonusAction == true)
            {
                //is raging
                if (ProfList[ProfIndex(IDofTurnStart)].activeAction1Status == 'raging')
                {
                    menu += '\n' + Formatters.bold('Stop Raging');
                }
            }            
        }

        //Smite
        if (HasAction(IDofTurnStart, 'smite') == true && ProfList[ProfIndex(IDofTurnStart)].activeBonusAction == true)
        {
            menu += '\n' + Formatters.bold('Smite')
        }

        //Ground Slam
        if (HasAction(IDofTurnStart, 'ground slam') == true)
        {
            menu += '\n' + Formatters.bold('Ground Slam')
        }
        

        //Quick Brew
        if(HasAction(IDofTurnStart, 'quick brew') == true)
        {
            menu += '\n' + Formatters.bold('Quick Brew');
        }

        //Option to recharge?
        if (ProfList[ProfIndex(IDofTurnStart)].activeDisarmCounter != 0)
        {
            menu += '\n' + Formatters.bold('Recharge')
        }

        else if(ProfList[ProfIndex(IDofTurnStart)].activeIsTripped == true)
        {
            menu += '\n' + Formatters.bold('Recharge')
        } 
    }
    return menu;
}
export default GetTurnActions