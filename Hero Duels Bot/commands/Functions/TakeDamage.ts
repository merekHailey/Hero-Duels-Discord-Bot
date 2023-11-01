import { nat20Emoji, ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import HasAbility from "./HasAbility";
import CheckLoss from "./CheckLoss";
import changeTurn from "./ChangeTurn";
import DiscordJS, { Formatters } from 'discord.js'
import ActionMenu from "./Action Menu";
import EndDuel from "./EndDuel";

function TakeDamage(IDofAttacker: string, natRoll: number, alteredRoll: number, parry: boolean)
{
    var NextTurnNumb: number;
    //next turns for parry
    if (ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].lock == 'parry asking P1')
    {
        NextTurnNumb = 1;
    }
    else if (ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].lock == 'parry asking P2')
    {
        NextTurnNumb = 2;
    }
    //next turns for regular attack
    else if (ProfList[ProfIndex(IDofAttacker)].lock == 'player 1 attack roll')
    {
        NextTurnNumb = 2;
    }
    else if (ProfList[ProfIndex(IDofAttacker)].lock == 'player 2 attack roll')
    {
        NextTurnNumb = 1;
    }
    else 
    {
        NextTurnNumb = 3;
    }
    
    var added_Damage: number = ProfList[ProfIndex(IDofAttacker)].activeadded_Damage;
    //Set Damage
    var weaponHandsValue: number = 0;
    //one handed
    if(ProfList[ProfIndex(IDofAttacker)].activeWeapon == 'Trident' || ProfList[ProfIndex(IDofAttacker)].activeWeapon == 'Slingshot')
    {
        weaponHandsValue = 1
    }
    //two handed
    else if(ProfList[ProfIndex(IDofAttacker)].activeWeapon == 'Greatsword')
    {
        weaponHandsValue = 2
    }
    //BOOM! check
    if(HasAbility(IDofAttacker, 'BOOM!') == true && ProfList[ProfIndex(IDofAttacker)].activeMagicType == 'fire')
    {
        added_Damage += 1
    }
    //Tough Skin check
    if(HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'tough skin') == true && ProfList[ProfIndex(IDofAttacker)].activeMagicType == 'fire')
    {
        added_Damage -= 1
    }

    //Alternative Damage Mod
    var damageVal = 0;
    if(ProfList[ProfIndex(IDofAttacker)].activeAlternativeDamageMod != 'none')
    {
        //STR
        if(ProfList[ProfIndex(IDofAttacker)].activeAlternativeDamageMod == 'str')
        {
            damageVal = weaponHandsValue + ProfList[ProfIndex(IDofAttacker)].activestr - 10 + added_Damage;
        }
        //DEX
        else if(ProfList[ProfIndex(IDofAttacker)].activeAlternativeDamageMod == 'dex')
        {
            damageVal = weaponHandsValue + ProfList[ProfIndex(IDofAttacker)].activedex - 10 + added_Damage;
        }
        //INT
        else if(ProfList[ProfIndex(IDofAttacker)].activeAlternativeDamageMod == 'int')
        {
            damageVal = weaponHandsValue + ProfList[ProfIndex(IDofAttacker)].activeint - 10 + added_Damage;
        }
        //WIS
        else if(ProfList[ProfIndex(IDofAttacker)].activeAlternativeDamageMod == 'wis')
        {
            damageVal = weaponHandsValue + ProfList[ProfIndex(IDofAttacker)].activewis - 10 + added_Damage;
        }
        //CON
        else if(ProfList[ProfIndex(IDofAttacker)].activeAlternativeDamageMod == 'con')
        {
            damageVal = weaponHandsValue + ProfList[ProfIndex(IDofAttacker)].activecon - 10 + added_Damage;
        }
        //CHA
        else if(ProfList[ProfIndex(IDofAttacker)].activeAlternativeDamageMod == 'cha')
        {
            damageVal = weaponHandsValue + ProfList[ProfIndex(IDofAttacker)].activecha - 10 + added_Damage;
        }
        
        else
        damageVal = weaponHandsValue + ProfList[ProfIndex(IDofAttacker)].activestr - 10 + added_Damage;

        ProfList[ProfIndex(IDofAttacker)].activeAlternativeDamageMod = 'none';

        
    }
    //Regular
    else
    damageVal = weaponHandsValue + ProfList[ProfIndex(IDofAttacker)].activestr - 10 + added_Damage;
    
        
    
    // Ground Slam?
    if (ProfList[ProfIndex(IDofAttacker)].activeAbility2Status == 'ground slam')
    {
        var newdamage = Math.floor(damageVal / 2);
        damageVal = newdamage;
        
        
    
    }
    //crit check
    if (ProfList[ProfIndex(IDofAttacker)].crit == '20')
    {
        damageVal *= 2;
    }
    //Lower HP
    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp -= damageVal;
    

    //Parry Fail Damage
    if (parry == true)
    {
        //Roll not opposed
        if(natRoll == 0 && alteredRoll == 0)
        {
            if (CheckLoss(ProfList[ProfIndex(IDofAttacker)].tempPartner) == false)
            {
                //You're coming with me (Second)
            if(ProfList[ProfIndex(IDofAttacker)].activeAbility1Status == 'YCWM attacking')
            {
                //Unkillable pass on Coming with me
                if(HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'pass')
                {
                    return ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s" + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                }
                //Not coming with me
                else
                {
                    return ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                }
            }
                
                //Unkillable Check
                if (HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'pass')
                {
                   
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status = 'used';
                    
                    
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp = 1;
                    changeTurn(ProfList[ProfIndex(IDofAttacker)].tempPartner, NextTurnNumb);
                    return ProfList[ProfIndex(IDofAttacker)].activeName + ' deals ' + damageVal + " damage leaving you with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability you rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                }
                    //You're coming with me (First)
                else if(ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'activated')
                {
                    ProfList[ProfIndex(IDofAttacker)].lock = 'player ' + ProfList[ProfIndex(IDofAttacker)].playerNumber + ' wait'
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].playerNumber + ' attack roll'
                    ProfList[ProfIndex(IDofAttacker)].activeBonusAction = false;
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status = 'YCWM attacking'
                    return ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold("You're Coming With Me") + " ability they  must now " + Formatters.bold('Roll') + ' to attack using Bomb (Fire)';
                }

                //Ground Slam Flavor
                else if(ProfList[ProfIndex(IDofAttacker)].activeAbility2Status == 'ground slam')
                {
                    ProfList[ProfIndex(IDofAttacker)].lock = 'player ' + ProfList[ProfIndex(IDofAttacker)].playerNumber + ' turn start' 
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].playerNumber + ' wait'
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeIsTripped = true;
                    return ProfList[ProfIndex(IDofAttacker)].activeName + ' slams their fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to ' + Formatters.bold('Trip') + ' and take ' + damageVal + ' damage, leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(IDofAttacker);
                }
                //Still alive reg
                else
                {
                        
                    changeTurn(ProfList[ProfIndex(IDofAttacker)].tempPartner, NextTurnNumb);
                    return ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                }
            }

            //onLoss
            else 
            {
                    //You're coming with me (Second)
                    if(ProfList[ProfIndex(IDofAttacker)].activeAbility1Status == 'YCWM attacking')
                    {
                        //Unkillable fail on Coming with me
                        if(HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'loss')
                        {
                            return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP, but ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold('Unkillable') + ' ability activates and you roll a constitution check and get a ' +  ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' which fails the check therefore ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds!' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, 0)
                        }
                        //You ARE coming with me
                        else
                        {
                            return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP. ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, 0)
                        }
                    }
                //Unkillable fail
                if (HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'loss')
                {
                    
                    return ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' Unkillable ability you rolled a " + ProfList[ProfIndex(IDofAttacker)].rollToCompare + ' and failed the check. ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                }
                //Lethal Ground Slam Flavor
                else if(ProfList[ProfIndex(IDofAttacker)].activeAbility2Status == 'ground slam')
                {
                    return 'Cork slams his fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to trip and take ' + damageVal + ' damage, leaving them with 0 HP! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                }
                //Death
                else
                {
                    
                        return EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                    
                }
            }
        }
        //Roll opposed
        else
        {
            if (CheckLoss(ProfList[ProfIndex(IDofAttacker)].tempPartner) == false)
            {
                //You're coming with me (Second)
            if(ProfList[ProfIndex(IDofAttacker)].activeAbility1Status == 'YCWM attacking')
            {
                //Unkillable pass on Coming with me
                if(HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'pass')
                {
                    if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s" + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s" + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                    }
                    else
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                }
                //Not coming with me
                else
                {
                    if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                    }
                    else
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                }
            }

                //Unkillable Check
                if (HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'pass')
                {
                    
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'used'
                    
                    
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp = 1;
                    changeTurn(ProfList[ProfIndex(IDofAttacker)].tempPartner, NextTurnNumb);
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. You did not parry the attack.' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                }
                 //You're coming with me (First)
                 else if(ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'activated')
                 {
                     ProfList[ProfIndex(IDofAttacker)].lock = 'player ' + ProfList[ProfIndex(IDofAttacker)].playerNumber + ' wait'
                     ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].playerNumber + ' attack roll'
                     ProfList[ProfIndex(IDofAttacker)].activeBonusAction = false;
                     ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status = 'YCWM attacking'
                     return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold("You're Coming With Me") + " ability they  must now " + Formatters.bold('Roll') + ' to attack using Bomb (Fire)';
                 }

                //Ground Slam Flavor
                else if(ProfList[ProfIndex(IDofAttacker)].activeAbility2Status == 'ground slam')
                {
                    
                    ProfList[ProfIndex(IDofAttacker)].lock = 'player ' + ProfList[ProfIndex(IDofAttacker)].playerNumber + ' turn start' 
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].playerNumber + ' wait'
                    ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeIsTripped = true;
                    return  'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. You did not parry the attack. ' + ProfList[ProfIndex(IDofAttacker)].activeName + ' slams their fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to ' + Formatters.bold('Trip') + ' and take ' + damageVal + ' damage, leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(IDofAttacker);
                          
                }
                //Still alive reg
                else
                {
                        
                    changeTurn(ProfList[ProfIndex(IDofAttacker)].tempPartner, NextTurnNumb);
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. You did not parry the attack. ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                }
            }
            //LOSS
            else 
            {
                    //You're coming with me (Second)
                if(ProfList[ProfIndex(IDofAttacker)].activeAbility1Status == 'YCWM attacking')
                {
                    //Unkillable fail on Coming with me
                    if(HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'loss')
                    {
                        if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                        {
                            if(natRoll == 20)
                            return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP, but ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold('Unkillable') + ' ability activates and you roll a constitution check and get a ' +  ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' which fails the check therefore ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! \nCongratulations ' + Formatters.userMention(ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].username) + '!'
                            else
                            return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP, but ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold('Unkillable') + ' ability activates and you roll a constitution check and get a ' +  ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' which fails the check therefore ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! \nCongratulations ' + Formatters.userMention(ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].username) + '!'
                        }
                        return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP, but ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold('Unkillable') + ' ability activates and you roll a constitution check and get a ' +  ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' which fails the check therefore ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! \nCongratulations ' + Formatters.userMention(IDofAttacker) + '!'
                    }
                    //You ARE coming with me
                    else
                    {
                        if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                        {
                            if(natRoll == 20)
                            return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP. ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, 0)
                            else
                            return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP. ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, 0)
                        }
                        return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP. ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, 0)
                    }
                }
            //unkillable fail
                if (HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'loss')
                {
                    
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. You did not parry the attack. ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability you rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and failed the check. ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                }
                //Lethal Ground Slam Flavor
                else if(ProfList[ProfIndex(IDofAttacker)].activeAbility2Status == 'ground slam')
                {
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. You did not parry the attack. Cork slams his fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to trip and take ' + damageVal + " damage, leaving them with 0 HP! " + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                }
                //Death
                else
                {
                    
                        return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. You did not parry the attack. '  + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                    
                }
            }
        }
    }
    //no parry available Damage
    else
    {
        
        if (CheckLoss(ProfList[ProfIndex(IDofAttacker)].tempPartner) == false)
        {

            //You're coming with me (Second)
            if(ProfList[ProfIndex(IDofAttacker)].activeAbility1Status == 'YCWM attacking')
            {
                //Unkillable pass on Coming with me
                if(HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'pass')
                {
                    if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s" + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s" + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                    }
                    else
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s" + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                }
                //Not coming with me
                else
                {
                    if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                    }
                    else
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability fails. ' + EndDuel(IDofAttacker, 0);
                }
            }
            //Unkillable Check
            else if (HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'pass')
            {
                
                ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status = 'used'
                
                
                ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp = 1;
                changeTurn(ProfList[ProfIndex(IDofAttacker)].tempPartner, NextTurnNumb);
                if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                    }
                return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability they rolled a " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' and now are alive with 1 HP remaining! ' + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
            }

            //You're coming with me (First)
            else if(ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'activated')
            {
                ProfList[ProfIndex(IDofAttacker)].lock = 'player ' + ProfList[ProfIndex(IDofAttacker)].playerNumber + ' wait'
                ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].lock = 'player ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].playerNumber + ' attack roll'
                ProfList[ProfIndex(IDofAttacker)].activeBonusAction = false;
                ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status = 'YCWM attacking'
                if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold("You're Coming With Me") + " ability they  must now " + Formatters.bold('Roll') + ' to attack using Bomb (Fire)';
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold("You're Coming With Me") + " ability they  must now " + Formatters.bold('Roll') + ' to attack using Bomb (Fire)';
                    }
                return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using " + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold("You're Coming With Me") + " ability they  must now " + Formatters.bold('Roll') + ' to attack using Bomb (Fire)';
            }

            //Ground Slam Flavor
            else if(ProfList[ProfIndex(IDofAttacker)].activeAbility2Status == 'ground slam')
            {
                    
                changeTurn(ProfList[ProfIndex(IDofAttacker)].tempPartner, NextTurnNumb);
                if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ' Cork slams his fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to trip and take ' + damageVal + ' damage, leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ' Cork slams his fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to trip and take ' + damageVal + ' damage, leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                    }
                return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. Cork slams his fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to trip and take ' + damageVal + ' damage, leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
            }
            //Still alive reg
            else
            {
                    
                changeTurn(ProfList[ProfIndex(IDofAttacker)].tempPartner, NextTurnNumb);
                if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
                    }
                return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! " + ActionMenu(ProfList[ProfIndex(IDofAttacker)].tempPartner);
            }
        }
        //Check loss == true
        else
        {
            //You're coming with me (Second) Reverse win
            if(ProfList[ProfIndex(IDofAttacker)].activeAbility1Status == 'YCWM attacking')
            {
                //Unkillable fail on Coming with me
                if(HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'loss')
                {
                    if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP, but ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold('Unkillable') + ' ability activates and you roll a constitution check and get a ' +  ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' which fails the check therefore ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! Congratulations ' + Formatters.userMention(ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].username) + '!'
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP, but ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold('Unkillable') + ' ability activates and you roll a constitution check and get a ' +  ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' which fails the check therefore ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! Congratulations ' + Formatters.userMention(ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].username) + '!'
                    }
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP, but ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + "'s " + Formatters.bold('Unkillable') + ' ability activates and you roll a constitution check and get a ' +  ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].rollToCompare + ' which fails the check therefore ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! Congratulations ' + Formatters.userMention(ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].username) + '!'
                }
                //You ARE coming with me
                else
                {
                    if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP. ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, 0)
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP. ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, 0)
                    }
                    return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + ' damage leaving them with 0 HP. ' + ProfList[ProfIndex(IDofAttacker)].activeName + "'s " + Formatters.bold("You're Coming With Me") + ' ability succeeds and they have won this Duel! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, 0)
                }
            }
            //Unkillable fail
            else if (HasAbility(ProfList[ProfIndex(IDofAttacker)].tempPartner, 'unkillable') == true && ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeAbility1Status == 'loss')
            {
                if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability you rolled a " + ProfList[ProfIndex(IDofAttacker)].rollToCompare + ' and failed the check. ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability you rolled a " + ProfList[ProfIndex(IDofAttacker)].rollToCompare + ' and failed the check. ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                    }
                return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' takes ' + damageVal + " damage leaving them with 0 HP! But using Tiberius' " + Formatters.bold('Unkillable') + " ability you rolled a " + ProfList[ProfIndex(IDofAttacker)].rollToCompare + ' and failed the check. ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
            }

            //Lethal Ground Slam Flavor
            else if(ProfList[ProfIndex(IDofAttacker)].activeAbility2Status == 'ground slam')
            {
                if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ' Cork slams his fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to trip and take ' + damageVal + ' damage, leaving them with 0 HP! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ' Cork slams his fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to trip and take ' + damageVal + ' damage, leaving them with 0 HP! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                    }
                return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + '. Cork slams his fists into the ground causing ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' to trip and take ' + damageVal + ' damage, leaving them with 0 HP! ' + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
            }

            
            //Death
            else
            {
                if(ProfList[ProfIndex(IDofAttacker)].crit == "20")
                    {
                        if(natRoll == 20)
                        return 'You rolled a ' + nat20Emoji + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' loses ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! "  + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                        else
                        return 'You rolled a ' + natRoll + ' and Crit with it! ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' loses ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! "  + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal);
                    }
                return 'You rolled a ' + natRoll + ' giving you a ' + alteredRoll + ' ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeName + ' loses ' + damageVal + ' damage leaving them with ' + ProfList[ProfIndex(ProfList[ProfIndex(IDofAttacker)].tempPartner)].activeHp + " HP! "  + EndDuel(ProfList[ProfIndex(IDofAttacker)].tempPartner, damageVal); 
            }
        }
    }
}
export default TakeDamage