import DiscordJS, { Formatters, Message } from 'discord.js'
import { ProfList } from "../Global Vars"
import { SearchProfile, ProfIndex } from '../Objects/Profile';

//Check
//Tiberius STH
function Check(message:Message) {
    //MENTIONED USER
    if (message.mentions.users.size > 0)
    {
        var mentionedUser = message.mentions.users.first();
        
        
    }
    if(mentionedUser != undefined)
    var stringMentionedUser: string = mentionedUser.toString()
    else
    var stringMentionedUser: string = 'usdghfkasdbjhdbfjhaewfjagdsffeuwf';
    

    //Profile
    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd check profile ' + stringMentionedUser && mentionedUser != undefined)
    {
        return Formatters.bold('Name: ') + SearchProfile(mentionedUser.id, 'username') + Formatters.bold('\nLock Status: ') + SearchProfile(mentionedUser.id, 'lock') + Formatters.bold('\nHas Tiberius?: ') + ProfList[ProfIndex(mentionedUser.id)].hasTiberius.toString() + Formatters.bold('\nHas Cork?: ') + ProfList[ProfIndex(mentionedUser.id)].hasCork.toString() + Formatters.bold('\nIndex Number: ') + ProfIndex(mentionedUser.id);
    }
    //Active
    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd check active ' + stringMentionedUser && mentionedUser != undefined)
    {
        return Formatters.bold('Name: ') + ProfList[ProfIndex(mentionedUser.id)].activeName + Formatters.bold('\nSubname: ') + ProfList[ProfIndex(mentionedUser.id)].activeSubname + Formatters.bold('\nLevel: ') + ProfList[ProfIndex(mentionedUser.id)].activeLevel + Formatters.bold('\nType: ') +  ProfList[ProfIndex(mentionedUser.id)].activetype + Formatters.bold('\n\nHP: ') +  ProfList[ProfIndex(mentionedUser.id)].activeHp + Formatters.bold('\nDealt damage type 1: ') +  ProfList[ProfIndex(mentionedUser.id)].activeDealt_Damage_Type + Formatters.bold('\nDamage Value: ') +  ProfList[ProfIndex(mentionedUser.id)].activeDamage_Value + Formatters.bold('\nAC: ') +  ProfList[ProfIndex(mentionedUser.id)].activeAC + Formatters.bold('\nMagic AC: ') +  ProfList[ProfIndex(mentionedUser.id)].activeMAC + Formatters.bold('\nPiercing AC: ') +  ProfList[ProfIndex(mentionedUser.id)].activePAC + Formatters.bold('\nStrength: ') +  ProfList[ProfIndex(mentionedUser.id)].activestr + Formatters.bold('\nDexterity: ') +  ProfList[ProfIndex(mentionedUser.id)].activedex + Formatters.bold('\nConstitution: ') +  ProfList[ProfIndex(mentionedUser.id)].activecon + Formatters.bold('\nIntelligence: ') +  ProfList[ProfIndex(mentionedUser.id)].activeint + Formatters.bold('\nWisdom: ') +  ProfList[ProfIndex(mentionedUser.id)].activewis + Formatters.bold('\nCharisma: ') +  ProfList[ProfIndex(mentionedUser.id)].activecha + Formatters.bold('\nAdded damage: ') +  ProfList[ProfIndex(mentionedUser.id)].activeadded_Damage + Formatters.bold('\nAbility1: ') +  ProfList[ProfIndex(mentionedUser.id)].activeAbility1 + Formatters.bold('\nAbility 2: ') + ProfList[ProfIndex(mentionedUser.id)].activeAbility2 + Formatters.bold('\nOnce Per Duel: ') + ProfList[ProfIndex(mentionedUser.id)].activeOncePerDuel  + Formatters.bold('\nBonus Action?: ') + ProfList[ProfIndex(mentionedUser.id)].activeBonusAction + Formatters.bold('\nCondition: ') +  ProfList[ProfIndex(mentionedUser.id)].activeCondition + Formatters.bold('\nGrappled?: ') + ProfList[ProfIndex(mentionedUser.id)].activeIsGrappled + Formatters.bold('\nGrapple Maintained?: ') + ProfList[ProfIndex(mentionedUser.id)].activeGrappleIsMaintained;
    }
    return null;
}
export {Check}