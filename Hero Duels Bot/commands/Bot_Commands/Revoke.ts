import DiscordJS, { Formatters, Message } from 'discord.js'
import { ProfList } from "../Global Vars"
import RewriteSave from '../Functions/Rewrite_Save'

import { isValidProfile, ProfIndex } from '../Objects/Profile'

function Revoke(message: Message) {
    //MENTIONED USER
    if (message.mentions.users.size > 0)
    {
        var mentionedUser = message.mentions.users.first();
        
        
    }
    if(mentionedUser != undefined)
    var stringMentionedUser: string = mentionedUser.toString()
    else
    var stringMentionedUser: string = 'usdghfkasdbjhdbfjhaewfjagdsffeuwf';
//REVOKE
    //Tiberius
    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd revoke tiberius')
    {
         ProfList[ProfIndex('533751158901309460')].lock = 'tiberius revoke';
         return 'Who would you like to take away a Tiberius Ulfnod card from?';
    }        
    if (message.author.id === '533751158901309460'  && ProfList[ProfIndex('533751158901309460')].lock == 'tiberius revoke' && mentionedUser != undefined)
    {
            ProfList[ProfIndex('533751158901309460')].lock = 'none';
            ProfList[ProfIndex(mentionedUser.id)].hasTiberius = false;
            RewriteSave(message.author.id)
            return Formatters.userMention(mentionedUser.id) + ', you have lost the Small Town Hero Tiberius Ulfnod Hero Duels card.';
    }        

        //Cork
    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd revoke cork')
    {
       ProfList[ProfIndex('533751158901309460')].lock = 'cork revoke';
       return 'Who would you like to take away a Cork Grayscale card from?';
    }        
    if (message.author.id === '533751158901309460'  && ProfList[ProfIndex('533751158901309460')].lock == 'cork revoke' && mentionedUser != undefined)
    {
            ProfList[ProfIndex('533751158901309460')].lock = 'none';
            ProfList[ProfIndex(mentionedUser.id)].hasCork = false;
            RewriteSave(message.author.id)
            return Formatters.userMention(mentionedUser.id) + ', you have lost the Small Town Hero Cork Grayscale Hero Duels card.';
    }        

    //Frizz
    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd revoke frizz')
    {
            ProfList[ProfIndex('533751158901309460')].lock = 'frizzagigg revoke';
            return 'Who would you like to take away a Frizzagigg card from?';
    }        
    if (message.author.id === '533751158901309460'  && ProfList[ProfIndex('533751158901309460')].lock == 'frizzagigg revoke' && mentionedUser != undefined)
    {
        ProfList[ProfIndex('533751158901309460')].lock = 'none';
        ProfList[ProfIndex(mentionedUser.id)].hasFrizz = false;
        RewriteSave(message.author.id)
        return Formatters.userMention(mentionedUser.id) + ', you have lost the Small Town Hero Frizzagigg of the Flame Hero Duels card.';
    }    

    //Grau

    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd revoke grau')
    {
        ProfList[ProfIndex('533751158901309460')].lock = 'grau revoke';
        return 'Who would you like to take away a Grau card from?'
    }        
    if (message.author.id === '533751158901309460'  && ProfList[ProfIndex('533751158901309460')].lock == 'grau revoke' && mentionedUser != undefined)
    {
        ProfList[ProfIndex('533751158901309460')].lock = 'none';
        ProfList[ProfIndex(mentionedUser.id)].hasGrau = false;
        RewriteSave(message.author.id)
        return Formatters.userMention(mentionedUser.id) + ', you have lost the Small Town Hero Grau Hero Duels card.';
    }        
    return null;
}
export default Revoke