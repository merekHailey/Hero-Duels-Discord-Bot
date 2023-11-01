import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import IsCrit from '../Functions/IsCrit'
import RollDice from '../Functions/RollDice'
import { client, nat1Emoji, nat20Emoji, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function Feint(message: Message) {

//Feint
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'feint'|| ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'feint')
    {
        //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Feint')
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
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first feint roll';
        return Formatters.bold("Roll") + " a " + Formatters.bold('Charisma') + " check against your opponent's " + Formatters.bold('Wisdom') + " to feint.";
    }

    //First Feint Roll
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first feint roll' && message.content.toLowerCase() == 'roll')
    {
        //Calculate
        var natRoll = RollDice();
        var P1Roll = natRoll + ProfList[ProfIndex(message.author.id)].activecha - 10;

        //Nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' choose AC';
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' Your feint was a success! Which armor would you like your next attack to target? \nArmor Class' + Formatters.bold(' (A)') + '\nBludgeoning Armor Class' + Formatters.bold(' (B)') + '\nSlashing Armor Class' + Formatters.bold(' (S)') + '\nPiercing Armor Class' + Formatters.bold(' (P)') + '\nMagic Armor Class' + Formatters.bold(' (M)');
            }
            else
            {
                return'You rolled a ' + natRoll + ' and crit with it! Your feint was a success! Which armor would you like your next attack to target? \nArmor Class' + Formatters.bold(' (A)') + '\nBludgeoning Armor Class' + Formatters.bold(' (B)') + '\nSlashing Armor Class' + Formatters.bold(' (S)') + '\nPiercing Armor Class' + Formatters.bold(' (P)') + '\nMagic Armor Class' + Formatters.bold(' (M)');
            }
        }

        //Nat 1
        else if(natRoll == 1)
        {
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber);
            return'You rolled a ' + nat1Emoji + ' Your feint was a failure! ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }

        //Regular roll
        else
        {
            ProfList[ProfIndex(message.author.id)].rollToCompare = P1Roll;
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' feint wait';
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' second feint roll';
            return 'You rolled a ' + natRoll + ', giving you a charisma roll of ' + P1Roll + '. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', ' + Formatters.bold('Roll') + ' your ' + Formatters.bold('Wisdom') + ' check!';
        }
    }

    //Second feint
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' second feint roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var WisRoll = natRoll + ProfList[ProfIndex(message.author.id)].activewis - 10

        //nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            if(natRoll == 20)
            {
            return'You rolled a ' + nat20Emoji + " and passed the check and see your opponent's feint! " + ActionMenu(message.author.id)
            }
            else
            {
                return 'You rolled a ' + natRoll + " and crit with it to pass the check and see your opponent's feint! " + ActionMenu(message.author.id)
            }
            
        }

        //nat 1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' choose AC';
            ProfList[ProfIndex(message.author.id)].lock = 'wait';
            return 'You rolled a ' + nat1Emoji + ' You fall for the feint completely. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', which armor would you like your next attack to target? \nArmor Class' + Formatters.bold(' (A)') + '\nBludgeoning Armor Class' + Formatters.bold(' (B)') + '\nSlashing Armor Class' + Formatters.bold(' (S)') + '\nPiercing Armor Class' + Formatters.bold(' (P)') + '\nMagic Armor Class' + Formatters.bold(' (M)');
        }

        //regular Roll
        else
        {
            //Hit
            if(WisRoll < ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' choose AC';
                ProfList[ProfIndex(message.author.id)].lock = 'wait';
                return 'You rolled a ' + natRoll + ' giving you a ' + WisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + ' You fall for the feint. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', which armor would you like your next attack to target? \nArmor Class' + Formatters.bold(' (A)') + '\nBludgeoning Armor Class' + Formatters.bold(' (B)') + '\nSlashing Armor Class' + Formatters.bold(' (S)') + '\nPiercing Armor Class' + Formatters.bold(' (P)') + '\nMagic Armor Class' + Formatters.bold(' (M)');
            }
            //Block
            else
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
                return 'You rolled a ' + natRoll + ' giving you a ' + WisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare  + ' and passed the check and see that your opponent is trying to feint! ' + ActionMenu(message.author.id);
            }
            
        }
    }
    return null;
}
export {Feint}