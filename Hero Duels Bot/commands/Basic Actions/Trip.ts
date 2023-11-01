import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import IsCrit from '../Functions/IsCrit'
import RollDice from '../Functions/RollDice'
import { client, nat1Emoji, nat20Emoji, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function Trip(message: Message) {
//Trip
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'trip'|| ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'trip')
    {
        //Declaration Check
        if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
        {
            if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Trip')
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
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first trip roll';
        return Formatters.bold("Roll") + " a " + Formatters.bold('Stength') + " check against your opponent's " + Formatters.bold('Strength') + " to trip yor opponent.";
    }

    

    //First Trip
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first trip roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var WisRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr - 10

        //nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsTripped = true;
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + " and trip your opponent! You may choose to target their " + Formatters.bold('Armor') + ' instead of their Specialty Armor when you attack untill they ' + Formatters.bold('Recharge ') + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            else
            {
                return'You rolled a ' + natRoll + " and crit with it to trip your opponent! You may choose to target their " + Formatters.bold('Armor') + ' instead of their Specialty Armor when you attack untill they ' + Formatters.bold('Recharge ') + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
        }

        //nat 1
        else if(natRoll == 1)
        {
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return 'You rolled a ' + nat1Emoji + ' You try to trip your opponent, but you stumble over your own foot and the trip fails.' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
            //Regular roll
        else
        {
            ProfList[ProfIndex(message.author.id)].rollToCompare = WisRoll;
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' trip wait';
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' second trip roll';
            return'You rolled a ' + natRoll + ', giving you a Strength roll of ' + WisRoll + '. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', ' + Formatters.bold('Roll') + ' your ' + Formatters.bold('Strength') + ' check!';
        } 
    }

    
    //Second trip
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' second trip roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var WisRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr - 10

        //nat 20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            if(natRoll == 20)
            {
                return'You rolled a ' + nat20Emoji + " and passed the check and backflip over your opponent's attempt to trip you. " + ActionMenu(message.author.id);
            }
            else
            {
                return 'You rolled a ' + natRoll + " and crit with it to passed the check and backflip over your opponent's attempt to trip you. " + ActionMenu(message.author.id);
            }
        }

        //nat 1
        else if(natRoll == 1)
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            ProfList[ProfIndex(message.author.id)].activeIsTripped = true;
            return 'You rolled a ' + nat1Emoji + ' You try to be cool and jump over the trip, but you barely miss it and fall flat on your face. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', You may choose to target their ' + Formatters.bold('Armor') + ' instead of their Specialty Armor when you attack untill they ' + Formatters.bold('Recharge ')  + ActionMenu(message.author.id);
        }

        //regular Roll
        else
        {
            //Hit
            if(WisRoll < ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
                ProfList[ProfIndex(message.author.id)].activeIsTripped = true;
                return 'You rolled a ' + natRoll + ' giving you a ' + WisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + " You neglect to see your opponent's attempt to trip you and you fall to the floor. " + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', You may choose to target their ' + Formatters.bold('Armor') + ' instead of their Specialty Armor when you attack untill they ' + Formatters.bold('Recharge ')  + ActionMenu(message.author.id);
            }
            //Block
            else
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
                return 'You rolled a ' + natRoll + ' giving you a ' + WisRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare  + ' and passed the check. You see your opponent try to trip you and maintain your balance. ' + ActionMenu(message.author.id);
            }
            
        }
    }
    return null
}
export {Trip}