import DiscordJS, { TextChannel, Formatters, Message } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import IsCrit from '../Functions/IsCrit'
import RollDice from '../Functions/RollDice'
import { client, nat1Emoji, nat20Emoji, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function Study(message: Message) {

 //STUDY
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'study' || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'study')
    {

        //Grappled?
        if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
        {
            return 'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.'
        }

        //Bonus action?
        if(ProfList[ProfIndex(message.author.id)].activeBonusAction == false)
        {
            return 'You do not have a bonus action.';
        }

        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first study roll';
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        return Formatters.bold('Roll') + ' an ' + Formatters.bold('Intelligence Check') + " against your opponent's " + Formatters.bold('Wisdom');
    }
    //Fist study Roll
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first study roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var intRoll = natRoll + ProfList[ProfIndex(message.author.id)].activeint - 10
        ProfList[ProfIndex(message.author.id)].rollToCompare = intRoll;

        //Nat20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsStudied = true;
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
            if(natRoll == 20)
            {
            return 'You rolled a ' + nat20Emoji + " You study your opponent and know exactly what they will do. Your opponent must declare their next action at the beginning of your next turn. " + ActionMenu(message.author.id);
            }
            else
            {
                return 'You rolled a ' + natRoll + " and crit with it! You study your opponent and know exactly what they will do. Your opponent must declare their next action at the beginning of your next turn. " + ActionMenu(message.author.id);
            } 
            
        }

        //Nat1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
            return 'You rolled a ' + nat1Emoji + ' You get distracted by something shiny. ' + ActionMenu(message.author.id);
        }
        
        //Regular roll
        else
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' second study roll'
            ProfList[ProfIndex(message.author.id)].lock = 'wait';
            return 'You rolled a ' + natRoll + ' giving you a ' + intRoll + '. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', you must now make a wisdom ' + Formatters.bold('Roll');
        }
    }

    //Second Study
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' second study roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var wisRoll = natRoll + ProfList[ProfIndex(message.author.id)].activewis - 10;

        //nat20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' turn start'
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' wait';
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' You detect your opponent trying to read your movements. The study failed. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it! You detect your opponent trying to read your movements. The study failed. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
        }

        //Nat 1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(message.author.id)].activeIsStudied = true;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' turn start';
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' wait';
            return 'You rolled a ' + nat1Emoji + " You give away what you're doing next. You must declare your next action at the beginning of your opponent's next turn. " + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }

        //regular Roll
        else
        {
            //Block
            if(wisRoll >= ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' turn start';
                ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' wait';
                return 'You rolled a ' + natRoll + ' giving you a ' + wisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + ' You detect your opponent trying to read your movements. The study failed. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            //Hit
            else
            {
                ProfList[ProfIndex(message.author.id)].activeIsStudied = true;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' turn start';
                ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' wait';
                return 'You rolled a ' + natRoll + ' giving you a ' + wisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + ". You give away what you're doing next. You must declare your next action at the beginning of your opponent's next turn. " + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
        }
    }
    return null;
}
export {Study}
