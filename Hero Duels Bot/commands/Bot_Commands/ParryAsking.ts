import DiscordJS, { Message } from 'discord.js'
import {  ProfList, nat20Emoji } from "../Global Vars"
import RollDice from '../Functions/RollDice';
import changeTurn from '../Functions/ChangeTurn';
import TakeDamage from '../Functions/TakeDamage';
import ActionMenu from '../Functions/Action Menu';
import IsCrit from '../Functions/IsCrit';
import { ProfIndex } from '../Objects/Profile'
 
function ParryAsking(message: Message) {
 //Parry asking
    //yes
    if(ProfList[ProfIndex(message.author.id)].lock == 'parry asking P' + ProfList[ProfIndex(message.author.id)].playerNumber  && message.content.toLowerCase() == 'yes' || ProfList[ProfIndex(message.author.id)].lock == 'parry asking P' + ProfList[ProfIndex(message.author.id)].playerNumber && message.content.toLowerCase() == 'y')
    {
        var natRoll = RollDice();
        var usedATK;
        //Check type
        //Melee?
        if(ProfList[ProfIndex(message.author.id)].activetype == 'melee')
        {
            usedATK = natRoll + ProfList[ProfIndex(message.author.id)].activestr -12;
        }
        //ranged?
        else if(ProfList[ProfIndex(message.author.id)].activetype == 'ranged')
        {
            usedATK = natRoll + ProfList[ProfIndex(message.author.id)].activedex -12;
        }
        //Default
        else
        {
            usedATK =  natRoll + ProfList[ProfIndex(message.author.id)].activestr -12;
        }
        //Same weapon
        if(ProfList[ProfIndex(message.author.id)].activeWeapon == ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeWeapon)
        {
            usedATK += 2;
        }
        var parryRoll = usedATK
        
        
        //Nat 20 only P1
        if(IsCrit(message.author.id, natRoll) == true && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit != '20')
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber);
            if(natRoll == 20)
            {
                return 'You rolled a ' + nat20Emoji + ' You parried the attack! ' + ActionMenu(message.author.id);
            }
            else
            {
                return 'You rolled a ' + natRoll + ' and crit with it! You parried the attack! ' + ActionMenu(message.author.id);
            }
        }
        //Nat 20 tie
        else if (IsCrit(message.author.id, natRoll) == true && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit == '20')
        {
            changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber);
            if(natRoll == 20)
            {
                return 'Both you and your opponent rolled a '+ nat20Emoji + ' You parried the attack! ' + ActionMenu(message.author.id);
            }
            else
            {
                return 'Both you and your opponent crit! But you rolled a ' + natRoll + ' You parried the attack! ' + ActionMenu(message.author.id);
            }
        }
        //Parry fails w/crit
        else if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].crit == '20' && ProfList[ProfIndex(message.author.id)].crit != '20')
        {
            return TakeDamage(ProfList[ProfIndex(message.author.id)].tempPartner, natRoll, parryRoll, true);
        }
        
        //regular compare
        else
        {
            //Parry succeeds
            if(parryRoll >= ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
            {
                changeTurn(message.author.id, ProfList[ProfIndex(message.author.id)].playerNumber);
                return 'You rolled a ' + natRoll + ' giving you a ' + parryRoll + '. You parried the attack! ' + ActionMenu(message.author.id);
            }
            
            //Normal Parry Fail
            else
            {
                if(parryRoll < ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].rollToCompare)
                {
                    return TakeDamage(ProfList[ProfIndex(message.author.id)].tempPartner, natRoll, parryRoll, true);
                }
            }
        }
        
    }
    //no
    if(ProfList[ProfIndex(message.author.id)].lock == 'parry asking P' + ProfList[ProfIndex(message.author.id)].playerNumber && message.content.toLowerCase() == 'no' || ProfList[ProfIndex(message.author.id)].lock == 'parry asking P' + ProfList[ProfIndex(message.author.id)].playerNumber && message.content.toLowerCase() == 'n')
    {
        return TakeDamage(ProfList[ProfIndex(message.author.id)].tempPartner, 0, 0, true);
    }
    return null;
}
export {ParryAsking}