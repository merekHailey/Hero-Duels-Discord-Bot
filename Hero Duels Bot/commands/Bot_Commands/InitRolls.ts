import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import { client, ProfList, nat1Emoji, nat20Emoji } from "../Global Vars"
import { SearchProfile } from '../Objects/Profile';
import RollDice from '../Functions/RollDice';
import changeTurn from '../Functions/ChangeTurn';
import ActionMenu from '../Functions/Action Menu';
import IsCrit from '../Functions/IsCrit';
import { isValidProfile, ProfIndex } from '../Objects/Profile'

function InitRolls(message: Message) {
//Init rolls
    //Player 1
    if (SearchProfile(message.author.id, 'lock') == 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' initiative' && message.content.toLowerCase() == 'roll')
    {
        var natRoll = RollDice();
        var initRoll = natRoll + ProfList[ProfIndex(message.author.id)].activedex - 10;
        ProfList[ProfIndex(message.author.id)].rollToCompare = initRoll;
        if (ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare != 0)
        {
            //High crit only one
            if (IsCrit(message.author.id, natRoll) == true && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit != '20')
            {
                
                
                ProfList[ProfIndex(message.author.id)].rollToCompare = 0;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare = 0;
                ProfList[ProfIndex(message.author.id)].crit = 'no';
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit = 'no';
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber);
                if(natRoll == 20)
                {
                    return Formatters.userMention(message.author.id) + ', you rolled a ' + nat20Emoji + ' You have the initiative! ' + ActionMenu(message.author.id);
                }
                else
                {
                    return Formatters.userMention(message.author.id) + ', you rolled a ' + natRoll + ' and crit with it! You have the initiative! ' + ActionMenu(message.author.id)
                }
            }
            //lost to nat20
            else if(natRoll != 20 && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit == '20')
            {
                ProfList[ProfIndex(message.author.id)].rollToCompare = 0;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare = 0;
                changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber);
                return Formatters.userMention(message.author.id) + ', you rolled a ' + natRoll + ', giving you a total of ' + initRoll + "! But it doesn't beat your opponent's crit. " + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ' has the initiative! ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            //nat 20 tie
            else if(IsCrit(message.author.id, natRoll) == true && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit == '20')
            {
                ProfList[ProfIndex(message.author.id)].rollToCompare = 0;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare = 0;
                ProfList[ProfIndex(message.author.id)].crit = 'no';
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit = 'no';
                if(natRoll == 20)
                {
                    return 'You rolled a ' + nat20Emoji + ' But so did your opponent! That is insane! ' + Formatters.bold('Roll') + ' again, ' + Formatters.userMention(message.author.id) + ' and ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + '!';
                }
                else
                {
                    return 'You rolled a ' + natRoll + ' and crit with it! But your opponent crit as well! WOW! ' + Formatters.bold('Roll') + ' again, ' + Formatters.userMention(message.author.id) + ' and ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + '!';
                }
            }
            //nat 1 only one
            else if(natRoll == 1 && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit != '1')
            {
                ProfList[ProfIndex(message.author.id)].rollToCompare = 0;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare = 0;
                ProfList[ProfIndex(message.author.id)].crit = 'no';
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit = 'no';
                changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber);
                return Formatters.userMention(message.author.id) + ', you rolled a ' + nat1Emoji + ' How unfortunate... ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', you have the initiative! ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
            //nat 1 tie
            else if(natRoll == 1 && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit == '1')
            {
                ProfList[ProfIndex(message.author.id)].rollToCompare = 0;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare = 0;
                ProfList[ProfIndex(message.author.id)].crit = 'no';
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit = 'no';
                return Formatters.userMention(message.author.id) + ', you rolled a ' + nat1Emoji + ' How unfortunate... but so did your opponent! So you both get to ' + Formatters.bold('Roll') + ' again!';
            }
            // Player 1 win
            else if (initRoll > ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                ProfList[ProfIndex(message.author.id)].rollToCompare = 0;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare = 0;

                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber);
                return Formatters.userMention(message.author.id) + ', you rolled a ' + natRoll.toString() + ', giving you a total of ' + initRoll + '! You have the initiative! ' + ActionMenu(message.author.id);
            }
            // tie
            else if (initRoll == ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                ProfList[ProfIndex(message.author.id)].rollToCompare = 0;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare = 0;
                return 'You rolled a ' + natRoll.toString() + ', giving you a total of ' + initRoll + '! You both got the same roll! ' + Formatters.bold('Roll') + ' again, ' + Formatters.userMention(message.author.id) + ' and ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + '.';
            }
            //Player 1 loss
            else
            { 
                ProfList[ProfIndex(message.author.id)].rollToCompare = 0;
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare = 0;

                changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber);
                return Formatters.userMention(message.author.id) + ', you rolled a ' + natRoll.toString() + ', giving you a total of ' + initRoll + '! ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ' has the initiative! ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
            }
        }
        // first to roll
        else 
        //high crit
        if(IsCrit(message.author.id, natRoll) == true)
        {
            ProfList[ProfIndex(message.author.id)].crit = '20';
            if(natRoll == 20)
            {
                    return Formatters.userMention(message.author.id) + ', you rolled a ' + nat20Emoji;
            }
            else
            {
                return Formatters.userMention(message.author.id) + ', you rolled a ' + natRoll + ' and crit with it!';
                
            }
        }
        //nat 1
        else if(natRoll == 1)
        {
            ProfList[ProfIndex(message.author.id)].crit = '1';
            return Formatters.userMention(message.author.id) + ', you rolled a ' + nat1Emoji;
        }
        //regular roll
        else
        {
            return Formatters.userMention(message.author.id) + ', you rolled a ' + natRoll + ', giving you a total of ' + initRoll + '!';
        }
        
    }
    return null;
        
}
export {InitRolls}