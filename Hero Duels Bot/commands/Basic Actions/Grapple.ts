import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import IsCrit from '../Functions/IsCrit'
import RollDice from '../Functions/RollDice'
import { client, nat1Emoji, nat20Emoji, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function Grapple(message: Message) {

//GRAPPLE
//Action
    
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'grapple' && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsGrappled == false || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'grapple' && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsGrappled == false)
    {
        //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Grapple')
        {
            //Grappled?
            if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
            {
                    return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn. However, you are grappled and must make a Basic Attack this turn.'
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
            return'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.';
        }

    //Bonus Action
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + '  basic action menu' && message.content.toLowerCase() == 'maintain grapple' && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsGrappled == true && ProfList[ProfIndex(message.author.id)].activeBonusAction == true || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'maintain grapple' && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsGrappled == true && ProfList[ProfIndex(message.author.id)].activeBonusAction == true)
    {
        //Grappled?
        if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
        {
            return 'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.'
        }
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + '  first grapple roll BA';
            ProfList[ProfIndex(message.author.id)].activeBonusAction = false;
            return Formatters.bold('Roll') + ' a ' + Formatters.bold('Strength Check') + " against your opponent's " + Formatters.bold('Strength');
    }

    //Reset declaration
    ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
    ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first grapple roll';
    return Formatters.bold('Roll') + ' a ' + Formatters.bold('Strength Check') + " against your opponent's " + Formatters.bold('Strength');      
    }

    //First Grapple Roll
    //Action
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first grapple roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var strRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr - 10
        ProfList[ProfIndex(message.author.id)].rollToCompare = strRoll;

        //Nat20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsGrappled = true;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeGrappleIsMaintained = true;
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' Your opponent loses their ' + Formatters.bold('Bonus Action') + ' and can only take a ' + Formatters.bold('Basic Attack') + ' action on their next turn and loses ' + Formatters.bold('-2 Attack') + ' for the turn. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it! Your opponent loses their ' + Formatters.bold('Bonus Action') + ' and can only take a ' + Formatters.bold('Basic Attack') + ' action on their next turn and loses ' + Formatters.bold('-2 Attack') + ' for the turn. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }            
        }

        //Nat1
        else if(natRoll == 1)
        {
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return 'You rolled a ' + nat1Emoji + ' You do not grapple ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName + '. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
        
        //Regular roll
        else
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' second grapple roll'
            ProfList[ProfIndex(message.author.id)].lock = 'wait';
            return 'You rolled a ' + natRoll + ' giving you a ' + strRoll + '. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', you must now make a strength ' + Formatters.bold('Roll');
        }
    }

    //Bonus action
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' first grapple roll BA' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var strRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr - 10
        ProfList[ProfIndex(message.author.id)].rollToCompare = strRoll;

        //Nat20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsGrappled = true;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeGrappleIsMaintained = true;
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' Your opponent loses their ' + Formatters.bold('Bonus Action') + ' and can only take a ' + Formatters.bold('Basic Attack') + ' action on their next turn and loses ' + Formatters.bold('-2 Attack') + ' for the turn. ' + ActionMenu(message.author.id);
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it! Your opponent loses their ' + Formatters.bold('Bonus Action') + ' and can only take a ' + Formatters.bold('Basic Attack') + ' action on their next turn and loses ' + Formatters.bold('-2 Attack') + ' for the turn. ' + ActionMenu(message.author.id);
            }
        }

        //Nat1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start';
            return 'You rolled a ' + nat1Emoji + ' You do not grapple ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName + '. ' + ActionMenu(message.author.id);
        }
        
        //Regular roll
        else
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' second grapple roll BA'
            ProfList[ProfIndex(message.author.id)].lock = 'wait';
            return 'You rolled a ' + natRoll + ' giving you a ' + strRoll + '. ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', you must now make a strength ' + Formatters.bold('Roll');
        }
    }

    //Second Grapple Rolls
    //Action
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' second grapple roll' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var strRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr - 10;

        //nat20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' You avoided the grapple. ' + ActionMenu(message.author.id)
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it! You avoided the grapple. ' + ActionMenu(message.author.id)
            }
        }

        //Nat 1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(message.author.id)].activeIsGrappled = true;
            ProfList[ProfIndex(message.author.id)].activeGrappleIsMaintained = true;
            ProfList[ProfIndex(message.author.id)].activeTempAttackMod -= 2;
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
            return 'You rolled a ' + nat1Emoji + '. You are grappled and ' + Formatters.bold('lose your bonus action') + ' and can only make a ' + Formatters.bold('Basic Attack') + ' and you lose a ' + Formatters.bold('-2') + ' on your attack for the turn. ' + ActionMenu(message.author.id);
        }

        //regular Roll
        else
        {
            //Block
            if(strRoll >= ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
                return 'You rolled a ' + natRoll + ' giving you a ' + strRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + ' You avoided the grapple. ' + ActionMenu(message.author.id);
            }
            //Hit
            else
            {
                ProfList[ProfIndex(message.author.id)].activeIsGrappled = true;
                ProfList[ProfIndex(message.author.id)].activeGrappleIsMaintained = true;
                ProfList[ProfIndex(message.author.id)].activeTempAttackMod -= 2;
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber)
                return 'You rolled a ' + natRoll + ' giving you a ' + strRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + '. You are grappled and ' + Formatters.bold('lose your bonus action') + ' and can only make a ' + Formatters.bold('Basic Attack') + ' and you lose a ' + Formatters.bold('-2') + ' on your attack for the turn. ' + ActionMenu(message.author.id);
            }
        }
    }

    //Bonus Action
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' second grapple roll BA' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var strRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr - 10;

        //nat20
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' turn start';
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' You avoided the grapple. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it! You avoided the grapple. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
        }

        //Nat 1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(message.author.id)].activeIsGrappled = true;
            ProfList[ProfIndex(message.author.id)].activeGrappleIsMaintained = true;
            ProfList[ProfIndex(message.author.id)].activeTempAttackMod -= 2;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' turn start';
            return 'You rolled a ' + nat1Emoji + '. You are grappled and ' + Formatters.bold('lose your bonus action') + ' and can only make a ' + Formatters.bold('Basic Attack') + ' and you lose a ' + Formatters.bold('-2') + ' on your attack for the turn. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }

        //regular Roll
        else
        {
            //Block
            if(strRoll >= ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' turn start';
                return 'You rolled a ' + natRoll + ' giving you a ' + strRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + ' You avoided the grapple. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            //Hit
            else
            {
                ProfList[ProfIndex(message.author.id)].activeIsGrappled = true;
                ProfList[ProfIndex(message.author.id)].activeGrappleIsMaintained = true;
                ProfList[ProfIndex(message.author.id)].activeTempAttackMod -= 2;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' turn start';
                return 'You rolled a ' + natRoll + ' giving you a ' + strRoll + " against your opponent's " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare + '. You are grappled and ' + Formatters.bold('lose your bonus action') + ' and can only make a ' + Formatters.bold('Basic Attack') + ' and you lose a ' + Formatters.bold('-2') + ' on your attack for the turn. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
        }
    }
    return null;
}
export {Grapple}