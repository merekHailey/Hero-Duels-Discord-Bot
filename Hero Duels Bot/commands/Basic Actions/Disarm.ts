import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import IsCrit from '../Functions/IsCrit'
import RollDice from '../Functions/RollDice'
import { client, nat1Emoji, nat20Emoji, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'
function Disarm(message: Message) {

//DISARM
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'disarm' || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'disarm')
    {
        //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Disarm')
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
            return'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.';
        }
        
        //Already disarmed
        if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeDisarmCounter != 0)
        {
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
            return'Your opponent is already disarmed. ' + ActionMenu(message.author.id);
        }
        //Not already
        else
        {
            //Reset declaration
            ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first disarm roll';
            return Formatters.bold('Roll ') + " a " + Formatters.bold('Dexterity ') + "check against your opponent's " + Formatters.bold("Strength");
        }
    }
    //P1 Dex Roll
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first disarm roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice()
        var dexRoll = natRoll + ProfList[ProfIndex(message.author.id)].activedex - 10;
        
        //Nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
           
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeDisarmCounter = 2;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeadded_Damage -= ProfList[ProfIndex(message.author.id)].activeFameMod;
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' Your opponent now has a -' + ProfList[ProfIndex(message.author.id)].activeFameMod.toString() + ' to their ' + Formatters.bold('Damage') + ' and they must ' + Formatters.bold('Recharge Twice') + ' to regain their damage.' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner)
            
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it! Your opponent now has a -' + ProfList[ProfIndex(message.author.id)].activeFameMod.toString() + ' to their ' + Formatters.bold('Damage') + ' and they must ' + Formatters.bold('Recharge Twice') + ' to regain their damage.' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            
            }
        }
        //Nat1
        else if(natRoll == 1)
        {
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return 'You rolled a ' + nat1Emoji + ' Your disarm failed. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }

        //Regular roll
        else
        {
            ProfList[ProfIndex(message.author.id)].rollToCompare = dexRoll;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' str roll';
            ProfList[ProfIndex(message.author.id)].lock = 'wait';
            return 'You rolled a ' + natRoll + ' giving you a Dexterity roll of ' + dexRoll + '. Now, ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ' it is your turn to ' + Formatters.bold('Roll') + ' your ' + Formatters.bold('Strength') + ' check!';
        }
    }

    //Strength Roll
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' str roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice()
        var strRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr - 10

        //Nat20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            if(natRoll == 20)
            {
            return 'You rolled a ' + nat20Emoji + ' The disarm failed. ' + ActionMenu(message.author.id);
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it The disarm failed. ' + ActionMenu(message.author.id)
            }
        }

        //Nat1
        else if (natRoll == 1)
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber);
            ProfList[ProfIndex(message.author.id)].activeDisarmCounter = 2;
            ProfList[ProfIndex(message.author.id)].activeadded_Damage -= ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeFameMod;
            return 'You rolled a ' + nat1Emoji + ' You have a -' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeFameMod.toString() + ' to your ' + Formatters.bold('Damage') + ' and you must ' + Formatters.bold('Recharge Twice') + ' to regain your damage.' + ActionMenu(message.author.id);
        }

        //Regular roll
        else
        {
            //Block
            if(strRoll >= ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber);
                return 'You rolled a ' + natRoll + ' giving you a ' + strRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare.toString() + '. The disarm failed. ' + ActionMenu(message.author.id);
            }

            //Hit
            else
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
                ProfList[ProfIndex(message.author.id)].activeDisarmCounter = 2;
                ProfList[ProfIndex(message.author.id)].activeadded_Damage -= ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeFameMod;
                return 'You rolled a ' + natRoll + ' giving you a ' + strRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare.toString() + ' You have a -' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeFameMod.toString() + ' to your ' + Formatters.bold('Damage') + ' and you must ' + Formatters.bold('Recharge Twice') + ' to regain your damage. ' + ActionMenu(message.author.id);
            }
        }
    }
    return null;
}
export {Disarm}