import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import IsCrit from '../Functions/IsCrit'
import RollDice from '../Functions/RollDice'
import { client, nat1Emoji, nat20Emoji, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function Demoralize(message: Message) {
//DEMORALIZE
                        
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'demoralize'|| ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'demoralize')
    {
        //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Demoralize')
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
        //Reset declaration
        ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first demoralize roll';
        return Formatters.bold("Roll") + " a " + Formatters.bold('Charisma') + " check against your opponent's " + Formatters.bold('Wisdom') + " to demoralize.";
    }

    //First Demoralize Roll
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first demoralize roll' && message.content.toLowerCase() == 'roll')
    {
        //Calculate
        var natRoll = RollDice();
        var P1Roll = natRoll + ProfList[ProfIndex(message.author.id)].activecha - 10;

        //Nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(message.author.id)].activeTempAttackMod = 2;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeTempAttackMod = -2;
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' Your demoralize was a success! Your next attack has a ' + Formatters.bold('+2') + ' and ' +  Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + "'s next attack has a " + Formatters.bold('-2') + ' on their next attack!' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            else 
            {
                return 'You rolled a ' + natRoll + ' and crit with it! Your demoralize was a success! Your next attack has a ' + Formatters.bold('+2') + ' and ' +  Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + "'s next attack has a " + Formatters.bold('-2') + ' on their next attack!' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
        }

        //Nat 1
        else if(natRoll == 1)
        {
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return 'You rolled a ' + nat1Emoji + ' Your demoralize was a failure! ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }

        //Regular roll
        else
        {
            ProfList[ProfIndex(message.author.id)].rollToCompare = P1Roll;
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' demoralize wait';
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' demoralize roll';
            return 'You rolled a ' + natRoll + ', giving you a charisma roll of ' + P1Roll + '. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', ' + Formatters.bold('Roll') + ' your ' + Formatters.bold('Wisdom') + ' check!';
        }
    }

    // Second Demoralize
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' demoralize roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var WisRoll = natRoll + ProfList[ProfIndex(message.author.id)].activewis - 10

        //nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' and passed the check and did not get demoralized! ' + ActionMenu(message.author.id);
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it to pass the check and did not get demoralized! ' + ActionMenu(message.author.id);
            }
        }

        //nat 1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(message.author.id)].activeTempAttackMod = -2;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeTempAttackMod = 2;
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            return 'You rolled a ' + nat1Emoji + ' and failed the check... ' + Formatters.userMention(message.author.id) + "'s Hero gets a " + Formatters.bold('-2')  + ' on their next attack, and ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + "'s Hero gets a " + Formatters.bold('+2')  + ' on their next attack!' + ActionMenu(message.author.id);
        }

        //regular Roll
        else
        {
            //Hit
            if(WisRoll < ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                ProfList[ProfIndex(message.author.id)].activeTempAttackMod = -2;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeTempAttackMod = 2;
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
                return 'You rolled a ' + natRoll + ' giving you a ' + WisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + ' and failed the check! ' + Formatters.userMention(message.author.id) + "'s Hero gets a " + Formatters.bold('-2')  + ' on their next attack, and ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + "'s Hero gets a " + Formatters.bold('+2')  + ' on their next attack!' + ActionMenu(message.author.id);
            }
            //Block
            else
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber);
                return'You rolled a ' + natRoll + ' giving you a ' + WisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare  + ' and passed the check and did not get demoralized! ' + ActionMenu(message.author.id)
            }
        }
    }
    return null;
}
export {Demoralize}
