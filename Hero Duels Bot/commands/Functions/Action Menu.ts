import DiscordJS, { Formatters } from 'discord.js'
import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import HasAction from './HasAction'
import { TiberiusSTH, CorkSTH, FrizzagiggSTH, GrauSTH } from "../Objects/HeroCard";

function ActionMenu(IDofTurnStart: string): string
{
    //Study check
    if(ProfList[ProfIndex(ProfList[ProfIndex(IDofTurnStart)].tempPartner)].activeIsStudyPrimed == true)
    {
        //P1
        if(ProfList[ProfIndex(ProfList[ProfIndex(IDofTurnStart)].tempPartner)].playerNumber == '1')
        {
            ProfList[ProfIndex(ProfList[ProfIndex(IDofTurnStart)].tempPartner)].lock = 'player 1 declare action'
            ProfList[ProfIndex(IDofTurnStart)].lock = 'wait'
        }
        //P2
        if(ProfList[ProfIndex(ProfList[ProfIndex(IDofTurnStart)].tempPartner)].playerNumber == '2')
        {
            ProfList[ProfIndex(ProfList[ProfIndex(IDofTurnStart)].tempPartner)].lock = 'player 2 declare action'
            ProfList[ProfIndex(IDofTurnStart)].lock = 'wait'
        }
        
        ProfList[ProfIndex(ProfList[ProfIndex(IDofTurnStart)].tempPartner)].activeIsStudyPrimed = false;
        return Formatters.userMention(ProfList[ProfIndex(IDofTurnStart)].tempPartner) + ' must declare their next action.'
    }
    else
    {
        var menu: string = Formatters.userMention(IDofTurnStart) + ', it is your turn. Your available actions are:';
        //Recharge?
        if (ProfList[ProfIndex(IDofTurnStart)].activeCondition == 'recharge' && ProfList[ProfIndex(IDofTurnStart)].tempPartner != undefined)
        {
            //Grappled?
            if(ProfList[ProfIndex(IDofTurnStart)].activeIsGrappled == true)
            {
                if(ProfList[ProfIndex(IDofTurnStart)].activeGrappleIsMaintained == false)
                {
                    ProfList[ProfIndex(IDofTurnStart)].activeIsGrappled = false;
                }
            }
            
            
            return Formatters.userMention(IDofTurnStart) + ', you must recharge this turn. ' + ActionMenu(ProfList[ProfIndex(IDofTurnStart)].tempPartner);
        }


        //Grapple Maintained?
        else if(ProfList[ProfIndex(IDofTurnStart)].activeGrappleIsMaintained == true)
        {
            //Grappled?
            if (ProfList[ProfIndex(IDofTurnStart)].activeIsGrappled == true && ProfList[ProfIndex(IDofTurnStart)].tempPartner != undefined)
            {
                ProfList[ProfIndex(IDofTurnStart)].activeGrappleIsMaintained = false;
                menu += Formatters.bold('\nAttack')
                ProfList[ProfIndex(IDofTurnStart)].activeBonusAction = false;
                return menu;
            }
        }
        
        //regular turn
        else
        {
            //Lose Grapple
            ProfList[ProfIndex(IDofTurnStart)].activeIsGrappled = false;
            
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
}
export default ActionMenu