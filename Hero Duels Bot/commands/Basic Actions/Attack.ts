import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import { client, ProfList, nat1Emoji, nat20Emoji } from "../Global Vars"
import { SearchProfile } from '../Objects/Profile';
import RollDice from '../Functions/RollDice';
import changeTurn from '../Functions/ChangeTurn';
import TakeDamage from '../Functions/TakeDamage';
import EndDuel from '../Functions/EndDuel';
import ActionMenu from '../Functions/Action Menu';
import IsCrit from '../Functions/IsCrit';
import { isValidProfile, ProfIndex } from '../Objects/Profile'
import HasAbility from '../Functions/HasAbility';


function Attack(message: Message) {
//ATTACK
if (ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'attack' || (ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'attack'))
{

    //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'Attack')
        {
               //Grappled?
               if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
               {
                   //Reset declaration
                   ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
                    //Are they Tripped?
                    if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsTripped == true)
                    {
                        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' trip YN';
                        return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn. However, you are grappled and must make a Basic Attack this turn. Your opponent is tripped, would you like to target their ' + Formatters.bold('Armor? Y/N');
                    }
                    //Not Tripped
                    else
                    {
                        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
                        return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn. However, you are grappled and must make a Basic Attack this turn. So you may now ' + Formatters.bold('Roll') + ' to attack.';
                    }
               }
               //Not Grappled
               else
               {
                    return 'You declared that you would use your action to ' + Formatters.bold(ProfList[ProfIndex(message.author.id)].activeDeclaredAction);
               }
        }
    }

    //Are they Tripped?
    if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeIsTripped == true)
    {
        //Reset declaration
        ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' trip YN';
        return 'Your opponent is tripped, would you like to target their ' + Formatters.bold('Armor? Y/N');
    }
    
    else
    {
        //Reset declaration
        ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        //Demoralize Check
        if( ProfList[ProfIndex(message.author.id)].activeDemoralizeCounter < 0)
        {
            ProfList[ProfIndex(message.author.id)].activeDemoralizeCounter -= 1;
        }
        return Formatters.bold('Roll') + ' to attack ' + SearchProfile(ProfList[ProfIndex(message.author.id)].tempPartner, 'username') + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName +'!';
    }
}
//Trip check
//Yes
if (ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' trip YN' && message.content.toLowerCase() == 'yes' || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' trip YN' && message.content.toLowerCase() == 'y')
{
    ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC = 'AC';
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        //Demoralize Check
        if( ProfList[ProfIndex(message.author.id)].activeDemoralizeCounter < 0)
        {
            ProfList[ProfIndex(message.author.id)].activeDemoralizeCounter -= 1;
        }
        return "This attack will target your opponent's " + Formatters.bold('Armor. Roll') + ' to attack ' + SearchProfile(ProfList[ProfIndex(message.author.id)].tempPartner, 'username') + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName +'!'
}
else if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' trip YN' && message.content.toLowerCase() == 'no' || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' trip YN' && message.content.toLowerCase() == 'n')
{
        ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
        //Demoralize Check
        if( ProfList[ProfIndex(message.author.id)].activeDemoralizeCounter < 0)
        {
            ProfList[ProfIndex(message.author.id)].activeDemoralizeCounter -= 1;
        }
        return 'You will continue to hit the AC you were hitting before. ' + Formatters.bold('Roll') + ' to attack ' + SearchProfile(ProfList[ProfIndex(message.author.id)].tempPartner, 'username') + "'s " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName +'!';
}

// attack roll
if (ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll' && message.content.toLowerCase() == 'roll')
{
    var natRoll = RollDice();
    //Critset
    if(IsCrit(message.author.id, natRoll) == true)
    {
        ProfList[ProfIndex(message.author.id)].crit = '20';
    }

    var attackRoll = 0;
    
    //Melee attack roll
    if(ProfList[ProfIndex(message.author.id)].activetype == 'melee')
    {
        attackRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr + ProfList[ProfIndex(message.author.id)].activeAttackMod + ProfList[ProfIndex(message.author.id)].activeTempAttackMod - 10;
    }
    //Ranged attack roll
    else if(ProfList[ProfIndex(message.author.id)].activetype == 'ranged')
    {
        attackRoll = natRoll + ProfList[ProfIndex(message.author.id)].activedex + ProfList[ProfIndex(message.author.id)].activeAttackMod + ProfList[ProfIndex(message.author.id)].activeTempAttackMod - 10;
    }


    //Alternative for a turn
    if(ProfList[ProfIndex(message.author.id)].activeAlternativeAttackModType != 'none')
    {
        //STR
        if(ProfList[ProfIndex(message.author.id)].activeAlternativeAttackModType == 'str')
        {
            attackRoll = natRoll + ProfList[ProfIndex(message.author.id)].activestr + ProfList[ProfIndex(message.author.id)].activeAttackMod + ProfList[ProfIndex(message.author.id)].activeTempAttackMod - 10;
        }
        //DEX
        else if(ProfList[ProfIndex(message.author.id)].activeAlternativeAttackModType == 'dex')
        {
            attackRoll = natRoll + ProfList[ProfIndex(message.author.id)].activedex + ProfList[ProfIndex(message.author.id)].activeAttackMod + ProfList[ProfIndex(message.author.id)].activeTempAttackMod - 10;
        }
        //INT
        else if(ProfList[ProfIndex(message.author.id)].activeAlternativeAttackModType == 'int')
        {
            attackRoll = natRoll + ProfList[ProfIndex(message.author.id)].activeint + ProfList[ProfIndex(message.author.id)].activeAttackMod + ProfList[ProfIndex(message.author.id)].activeTempAttackMod - 10;
        }
        //WIS
        else if(ProfList[ProfIndex(message.author.id)].activeAlternativeAttackModType == 'wis')
        {
            attackRoll = natRoll + ProfList[ProfIndex(message.author.id)].activewis + ProfList[ProfIndex(message.author.id)].activeAttackMod + ProfList[ProfIndex(message.author.id)].activeTempAttackMod - 10;
        }
        //CON
        else if(ProfList[ProfIndex(message.author.id)].activeAlternativeAttackModType == 'con')
        {
            attackRoll = natRoll + ProfList[ProfIndex(message.author.id)].activecon + ProfList[ProfIndex(message.author.id)].activeAttackMod + ProfList[ProfIndex(message.author.id)].activeTempAttackMod - 10;
        }
        //CHA
        else if(ProfList[ProfIndex(message.author.id)].activeAlternativeAttackModType == 'cha')
        {
            attackRoll = natRoll + ProfList[ProfIndex(message.author.id)].activecha + ProfList[ProfIndex(message.author.id)].activeAttackMod + ProfList[ProfIndex(message.author.id)].activeTempAttackMod - 10;
        }
        ProfList[ProfIndex(message.author.id)].activeAlternativeAttackModType = 'none'
    }
    
    

    ProfList[ProfIndex(message.author.id)].activeTempAttackMod = 0;

    //Nat20 w/parry
    if (IsCrit(message.author.id, natRoll) == true && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeBonusAction == true)
    {
        ProfList[ProfIndex(message.author.id)].crit = '20';
        ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'parry asking P' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber;
        ProfList[ProfIndex(message.author.id)].lock = 'parry ask P' + ProfList[ProfIndex(message.author.id)].playerNumber + ' wait';
        if(natRoll == 20)
        {
        return 'You rolled a ' + nat20Emoji + ' ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', would you like to attempt a Parry Bonus action?';
        }
        else
        {
            return 'You rolled a ' + natRoll + ' and crit with it! ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', would you like to attempt a Parry Bonus action?';
        }
    }
    //Nat20 w/o parry
    else if(IsCrit(message.author.id, natRoll) == true && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeBonusAction == false)
    {
        return TakeDamage(message.author.id, natRoll, attackRoll, false);
    }
    //Nat1 
    else if (natRoll == 1)
    {
        //You're coming with me (Second) Miss
        if(ProfList[ProfIndex(message.author.id)].activeAbility1Status == 'YCWM attacking')
        {
            return 'You rolled a ' + nat1Emoji + '... ' + ProfList[ProfIndex(message.author.id)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(message.author.id, 0);
        }
        changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber);
        return 'You rolled a ' + nat1Emoji + ' Your attack does not go through. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
    }
    //regular check
    else
    {
        var usedAC: number;
        //Specialty Set
        if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC != 'none')
        {
            //Bludgeoning match?
            if(ProfList[ProfIndex(message.author.id)].activeDealt_Damage_Type == 'bludgeoning' && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeBAC != 0)
            {
                usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeBAC
            }
            //Slashing match?
            else if(ProfList[ProfIndex(message.author.id)].activeDealt_Damage_Type == 'slashing' && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeSAC != 0)
            {
                usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeSAC
            }
            //Piercing match?
            else if(ProfList[ProfIndex(message.author.id)].activeDealt_Damage_Type == 'piercing' && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activePAC != 0)
            {
                usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activePAC
            }
            //Magic match?
            else if(ProfList[ProfIndex(message.author.id)].activeDealt_Damage_Type == 'magic' && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeMAC != 0)
            {
                usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeMAC
            }
            //regular AC
            else 
            {
                usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeAC
            }
        }
        //Chosen Case
        else
        {
            //Bludgeoning 
            if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC == 'BAC')
            {
                
                //Speacial AC?
                if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeBAC != 0)
                {
                    usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeBAC
                }
                //Regular AC
                else
                {
                    usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeAC
                }
            }
            //Slashing 
            if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC == 'SAC')
            {
                //Speacial AC?
                if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeSAC != 0)
                {
                    usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeSAC
                }
                //Regular AC
                else
                {
                    usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeAC
                }
            }
            //Piercing 
            if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC == 'PAC')
            {
                //Speacial AC?
                if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activePAC != 0)
                {
                    usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activePAC
                }
                //Regular AC
                else
                {
                    usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeAC
                }
            }
            //Magic 
            if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC == 'MAC')
            {
                //Speacial AC?
                if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeMAC != 0)
                {
                    usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeMAC
                }
                //Regular AC
                else
                {
                    usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeAC
                }
            }
            //Regular AC 
            else
            {
                usedAC = ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeAC
            }
            //Reset Chosen AC
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC = 'none';
        }
        
        //reg hit w/parry
        if (attackRoll >= usedAC && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeBonusAction == true)
        {
            ProfList[ProfIndex(message.author.id)].rollToCompare = attackRoll;
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'parry asking P' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber;
            ProfList[ProfIndex(message.author.id)].lock = 'parry ask P' + ProfList[ProfIndex(message.author.id)].playerNumber + ' wait';
            return 'You rolled a ' + natRoll + ' giving you a ' + attackRoll + ', that hits the AC! ' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ', would you like to attempt a Parry Bonus action?';
        }
        //hit w/o parry
        else if(attackRoll >= usedAC && ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeBonusAction == false)
        {
            return TakeDamage(message.author.id, natRoll, attackRoll, false);
        }

        //miss
        else
        {
            //You're coming with me (Second)
            if(ProfList[ProfIndex(message.author.id)].activeAbility1Status == 'YCWM attacking')
            {
                return 'You rolled a ' + natRoll + ' giving you a ' + attackRoll + ' which does not hit the AC. '  + ProfList[ProfIndex(message.author.id)].activeName + "'s" + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(message.author.id, 0);
            }
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber);
            return 'You rolled a ' + natRoll  + ' giving you a ' + attackRoll + '. That does not hit the AC. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
    }
}
return null;
}
export default Attack