import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import HasAction from '../Functions/HasAction'
import { client, ProfList } from "../Global Vars"
import Heal from '../Functions/Heal'
import TempBoostAbilityScore from '../Functions/TempBoostAbilityScore'
import ActionMenu from '../Functions/Action Menu'
import { ProfIndex } from '../Objects/Profile'

function QuickBrew(message: Message) {

//Quick Brew
if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'quick brew' && HasAction(message.author.id, 'quick brew') || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'qb' && HasAction(message.author.id, 'quick brew'))
{
    //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Quick Brew')
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
    return ('You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.');
}
    //No Bonus Action
    if(ProfList[ProfIndex(message.author.id)].activeBonusAction == false)
    {
        return 'You do not have a bonus action.';
    }
    ProfList[ProfIndex(message.author.id)].lock = 'quick brew menu';
    return'You quickly use your ingredients to create a concoction. What do you create?\n' + Formatters.bold('Bomb') + ' Use ' + Formatters.bold('INT') + ' for damage. Change damage type to element of your choice. \n' + Formatters.bold('Mutate') + ' Gain ' + Formatters.bold('+1') + ' to an ' + Formatters.bold('Ability Score') + ' until your next turn\n' + Formatters.bold('Potion') + ' Heal ' + Formatters.bold('4 HP');
}

//QB Menu
if(ProfList[ProfIndex(message.author.id)].lock == 'quick brew menu')
{
    //Bomb
    if(message.content.toLowerCase() == 'bomb')
    {
        //Declaration Check
        if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
        {
            if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'Attack')
            {
                //Grappled?
                if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
                {
                    ProfList[ProfIndex(message.author.id)].lock = 'bomb menu';
                    
                    //Reset declaration
                    ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
                    return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn. However, you are grappled and must make a Basic Attack this turn. You create a bomb to deal damage! What damage type is the bomb? \n' + Formatters.bold('FIRE COLD ELECTRIC ACID POISON SONIC MENTAL');
                }
                else 
                {
                    //Reset declaration
                    ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
                    return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn.';
                }
            }
        }
        ProfList[ProfIndex(message.author.id)].lock = 'bomb menu';
        ProfList[ProfIndex(message.author.id)].activeDealt_Damage_Type = 'magic';
        return 'You create a bomb to deal damage! What damage type is the bomb? \n' + Formatters.bold('FIRE COLD ELECTRIC ACID POISON SONIC MENTAL');
    }

    //Mutate
    if(message.content.toLowerCase() == 'mutate')
    {
        ProfList[ProfIndex(message.author.id)].lock = 'mutate menu';
        return'Your body begins to shift and mutate. Which Ability Score do you improve by 1? \n' +Formatters.bold('STR DEX INT WIS CON CHA');
    }

    //Potion
    if(message.content.toLowerCase() == 'potion')
    {
        Heal(message.author.id, 4);
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
        return 'You heal 4 Hp and are left with ' + ProfList[ProfIndex(message.author.id)].activeHp + ' HP. ' + ActionMenu(message.author.id);
    }
}

//Mutate Menu
if(ProfList[ProfIndex(message.author.id)].lock == 'mutate menu')
{
    if(message.content.toLowerCase() == 'str')
    {
        TempBoostAbilityScore(message.author.id, 'str', 1);
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
        return 'Your muscles begin to swell as you feel new strength course through you! Your Strength is now ' + ProfList[ProfIndex(message.author.id)].activestr + ' ' + ActionMenu(message.author.id);
    }

    else if(message.content.toLowerCase() == 'dex')
    {
        TempBoostAbilityScore(message.author.id, 'dex', 1);
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
        return 'You begin to feel more agile and quick on your feet!  Your Dexterity is now ' + ProfList[ProfIndex(message.author.id)].activedex + ' ' + ActionMenu(message.author.id);
    }

    else if(message.content.toLowerCase() == 'int')
    {
        TempBoostAbilityScore(message.author.id, 'int', 1);
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
        return 'You feel your mind sharpen and thinking becomes more clear to you!  Your Intelligence is now ' + ProfList[ProfIndex(message.author.id)].activeint  + ' ' + ActionMenu(message.author.id);
    }
    else if(message.content.toLowerCase() == 'wis')
    {
        TempBoostAbilityScore(message.author.id, 'wis', 1);
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
        return 'Your mind begins to fill with solutions and possible actions, giving you a confidence you have rarely experienced! Your Wisdom is now ' + ProfList[ProfIndex(message.author.id)].activewis + ' ' + ActionMenu(message.author.id);
    }
    else if(message.content.toLowerCase() == 'con')
    {
        TempBoostAbilityScore(message.author.id, 'con', 1);
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
        return 'Your skin begins to toughen up, and you feel much more sturdy. Your Constitution is now ' + ProfList[ProfIndex(message.author.id)].activecon + ' ' + ActionMenu(message.author.id);
    }
    else if(message.content.toLowerCase() == 'cha')
    {
        TempBoostAbilityScore(message.author.id, 'cha', 1);
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
        return 'Your body mutates into a form that can be trusted and you feel your thoughts start to have a charismatic twist to them. Your Charisma is now ' + ProfList[ProfIndex(message.author.id)].activecha + ' ' + ActionMenu(message.author.id);
    }
}

//Bomb Menu
if(ProfList[ProfIndex(message.author.id)].lock == 'bomb menu')
{
    if(message.content.toLowerCase() == 'fire')
    {
        ProfList[ProfIndex(message.author.id)].activeMagicType = 'fire';
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].activeAlternativeDamageMod = 'int';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        return 'You craft and throw a ' + Formatters.bold('Fire Bomb.') + ' ' + Formatters.bold('Roll') + ' to hit ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].username + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName;
    }

    if(message.content.toLowerCase() == 'cold')
    {
        ProfList[ProfIndex(message.author.id)].activeMagicType = 'cold';
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].activeAlternativeDamageMod = 'int';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        return 'You craft and throw a ' + Formatters.bold('Cold Bomb.') + ' ' + Formatters.bold('Roll') + ' to hit ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].username + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName;
    }

    if(message.content.toLowerCase() == 'electric')
    {
        ProfList[ProfIndex(message.author.id)].activeMagicType = 'electric';
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].activeAlternativeDamageMod = 'int';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        return'You craft and throw an ' + Formatters.bold('Electric Bomb.') + ' ' + Formatters.bold('Roll') + ' to hit ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].username + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName;
    }

    if(message.content.toLowerCase() == 'acid')
    {
        ProfList[ProfIndex(message.author.id)].activeMagicType = 'acid';
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].activeAlternativeDamageMod = 'int';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        return 'You craft and throw an ' + Formatters.bold('Acid Bomb.') + ' ' + Formatters.bold('Roll') + ' to hit ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].username + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName;
    }

    if(message.content.toLowerCase() == 'poison')
    {
        ProfList[ProfIndex(message.author.id)].activeMagicType = 'poison';
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].activeAlternativeDamageMod = 'int';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        return 'You craft and throw a ' + Formatters.bold('Poison Bomb.') + ' ' + Formatters.bold('Roll') + ' to hit ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].username + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName;
    }

    if(message.content.toLowerCase() == 'sonic')
    {
        ProfList[ProfIndex(message.author.id)].activeMagicType = 'sonic';
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].activeAlternativeDamageMod = 'int';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        return 'You craft and throw a ' + Formatters.bold('Sonic Bomb.') + ' ' + Formatters.bold('Roll') + ' to hit ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].username + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName;
    }

    if(message.content.toLowerCase() == 'mental')
    {
        ProfList[ProfIndex(message.author.id)].activeMagicType = 'mental';
        ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
        ProfList[ProfIndex(message.author.id)].activeAlternativeDamageMod = 'int';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        return 'You craft and throw a ' + Formatters.bold('Mental Bomb.') + ' ' + Formatters.bold('Roll') + ' to hit ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].username + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName;
    }
}
return null;
}

export {QuickBrew}