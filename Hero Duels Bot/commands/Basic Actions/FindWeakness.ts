import DiscordJS, { Formatters, Message } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import IsCrit from '../Functions/IsCrit'
import RollDice from '../Functions/RollDice'
import { nat1Emoji, nat20Emoji, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function FindWeakness(message: Message) {
//Find Weakness
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'find weakness'|| ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'find weakness')
    {
        //Declaration Check
        if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
        {
            if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Find Weakness')
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

        //Reset declaration
        ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first find weakness roll';
        return Formatters.bold("Roll") + " a " + Formatters.bold('Wisdom') + " check against your opponent's " + Formatters.bold('Wisdom') + " to find their weakness.";
    }

    //First Find Weakness
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first find weakness roll' && message.content.toLowerCase() == 'roll')
    {
        //Calculate
        var natRoll = RollDice();
        var P2Roll = natRoll + ProfList[ProfIndex(message.author.id)].activewis - 10;

        //Nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' choose AC';
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'wait';
            if(natRoll == 20)
            {
            return 'You rolled a ' + nat20Emoji + ' You find their weakness! Which armor would you like your next attack to target? \n Armor Class' + Formatters.bold(' (A)') + '\nBludgeoning Armor Class' + Formatters.bold(' (B)') + '\nSlashing Armor Class' + Formatters.bold(' (S)') + '\nPiercing Armor Class' + Formatters.bold(' (P)') + '\nMagic Armor Class' + Formatters.bold(' (M)');
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it! You find their weakness! Which armor would you like your next attack to target? \n Armor Class' + Formatters.bold(' (A)') + '\nBludgeoning Armor Class' + Formatters.bold(' (B)') + '\nSlashing Armor Class' + Formatters.bold(' (S)') + '\nPiercing Armor Class' + Formatters.bold(' (P)') + '\nMagic Armor Class' + Formatters.bold(' (M)');
            }
        }

        //Nat 1
        else if(natRoll == 1)
        {
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return 'You rolled a ' + nat1Emoji + ' You fail to see a weakness in your opponent. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }

        //Regular roll
        else
        {
            ProfList[ProfIndex(message.author.id)].rollToCompare = P2Roll;
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' find weakness wait';
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' second find weakness roll';
            return 'You rolled a ' + natRoll + ', giving you a Wisdom roll of ' + P2Roll + '. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', ' + Formatters.bold('Roll') + ' your ' + Formatters.bold('Wisdom') + ' check!';
        }
    }
    

    //Second find weakness
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' second find weakness roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var WisRoll = natRoll + ProfList[ProfIndex(message.author.id)].activewis - 10

        //nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + " and passed the check and hide your weaknesses deftly. " + ActionMenu(message.author.id);
            }
            else
            {
                return 'You rolled a ' + natRoll + " and crit with it to pass the check and hide your weaknesses deftly. " + ActionMenu(message.author.id);
            }
        }

        //nat 1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' choose AC';
            ProfList[ProfIndex(message.author.id)].lock = 'wait';
            return'You rolled a ' + nat1Emoji + ' You allow your weaknesses to be seen. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', which armor would you like your next attack to target? \n Armor Class' + Formatters.bold(' (A)') + '\nBludgeoning Armor Class' + Formatters.bold(' (B)') + '\nSlashing Armor Class' + Formatters.bold(' (S)') + '\nPiercing Armor Class' + Formatters.bold(' (P)') + '\nMagic Armor Class' + Formatters.bold(' (M)');
        }

        //regular Roll
        else
        {
            //Hit
            if(WisRoll < ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' choose AC';
                ProfList[ProfIndex(message.author.id)].lock = 'wait';
                return 'You rolled a ' + natRoll + ' giving you a ' + WisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + ' You allow your weaknesses to be seen. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', which armor would you like your next attack to target? \n Armor Class' + Formatters.bold(' (A)') + '\nBludgeoning Armor Class' + Formatters.bold(' (B)') + '\nSlashing Armor Class' + Formatters.bold(' (S)') + '\nPiercing Armor Class' + Formatters.bold(' (P)') + '\nMagic Armor Class' + Formatters.bold(' (M)');
            }
            //Block
            else
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
                return 'You rolled a ' + natRoll + ' giving you a ' + WisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare  + ' and passed the check and hide your weaknesses from them. ' + ActionMenu(message.author.id);
            }
            
        }
    }
    return null;
}
export {FindWeakness}