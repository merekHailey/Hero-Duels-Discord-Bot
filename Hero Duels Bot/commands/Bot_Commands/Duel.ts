import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import { client, ProfList } from "../Global Vars"
import { isValidProfile, ProfIndex } from '../Objects/Profile'
import { SearchProfile } from '../Objects/Profile'
import hasCards from '../Functions/HasCards'
import { ListOwnedHeros } from '../Functions/ListOwnedHeros'

function Duel(message: Message) {
    //MENTIONED USER
    if (message.mentions.users.size > 0)
    {
        var mentionedUser = message.mentions.users.first();
        
        
    }
    if(mentionedUser != undefined)
    var stringMentionedUser: string = mentionedUser.toString()
    else
    var stringMentionedUser: string = 'usdghfkasdbjhdbfjhaewfjagdsffeuwf';

//HD DUEL
if (message.author.bot == false && message.content.toLowerCase() ===  'hd duel ' + stringMentionedUser) 
{
    //Both Valid
    if (isValidProfile(message.author.id) == true && mentionedUser != undefined && isValidProfile(mentionedUser.id) == true)
    {
        //P1 not busy?
        if(ProfList[ProfIndex(message.author.id)].lock == 'none')
        {

            if(mentionedUser.bot == true)
            {
                return 'You cannot duel a bot.';
            }
            //They are busy
            if(ProfList[ProfIndex(mentionedUser.id)].lock != 'none')
            {
                return 'This person is busy at the moment.';
            }
            
            if(hasCards(message.author.id) == true && hasCards(mentionedUser.id) == true && mentionedUser != message.author)
            {
                ProfList[ProfIndex(mentionedUser.id)].tempPartner = message.author.id;
                ProfList[ProfIndex(mentionedUser.id)].lock = 'duel accept';
                return Formatters.userMention(mentionedUser.id) + ', Do you accept?';
            }
            else if (hasCards(mentionedUser.id) == false || hasCards(message.author.id) == false)
            {
                return 'One of you do not have any cards. You must have a card to duel!';
            }
            else
            {
                return'You cannot duel yourself!'; 
            }  
        }
    }
    
    //You aren't registered
    else if(mentionedUser != undefined && isValidProfile(mentionedUser.id) == true && isValidProfile(message.author.id) == false && message.content.toLowerCase() ===  'hd duel ' + stringMentionedUser)
    {
        return Formatters.userMention(message.author.id) + ' must first register. Use the ' + Formatters.bold('HD Start') + ' command to begin your dueling adventures!';
    }   
    //They aren't registered
    else if(mentionedUser != undefined && isValidProfile(message.author.id) == true && isValidProfile(mentionedUser.id) == false && message.content.toLowerCase() ===  'hd duel ' + stringMentionedUser)
    {
        //P1 not busy?
        if(ProfList[ProfIndex(message.author.id)].lock == 'none')
        {
            //Bot?
            if(mentionedUser.bot == true)
            {
                return 'You cannot duel a bot!';
            }
            else
            {
                return Formatters.userMention(mentionedUser.id) + ' must first register. Use the ' + Formatters.bold('HD Start') + ' command to begin your dueling adventures!';
            }
        }
    }   
    //neither are registered
    else 
    {
        return 'You both must first register. Use the ' + Formatters.bold('HD Start') + ' command to begin your dueling adventures!';
    }   
}

//Case1 'yes'
if (SearchProfile(message.author.id, 'lock') == 'duel accept' && message.content.toLowerCase() === 'yes' ||SearchProfile(message.author.id, 'lock') == 'duel accept' && message.content.toLowerCase() === 'y') {  
   ProfList[ProfIndex(message.author.id)].playerNumber = '2';
   ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber = '1';
   ProfList[ProfIndex(message.author.id)].lock = 'duel player 2 reveal';
   ProfList[ProfIndex(message.author.id)].activeChannelID = message.channelId;
   ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChannelID = message.channelId;
   ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'duel player 1 reveal';
   ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].tempPartner = message.author.id;
   client.users.cache.get(message.author.id)?.send('Which Hero will you take into battle? ' + ListOwnedHeros(message.author.id));
   client.users.cache.get(ProfList[ProfIndex(message.author.id)].tempPartner)?.send('Which Hero will you take into battle? ' + ListOwnedHeros(ProfList[ProfIndex(message.author.id)].tempPartner));
   return 'Each player will now recieve a DM. Respond to it to choose your character!';
}

//Case2 'no'
if (SearchProfile(message.author.id, 'lock') == 'duel accept' && message.content.toLowerCase() === 'no' ||SearchProfile(message.author.id, 'lock') == 'duel accept' && message.content === 'n') {
   
    ProfList[ProfIndex(message.author.id)].lock = 'none';
    ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'none';
    ProfList[ProfIndex(message.author.id)].tempPartner = '0';
    return 'Duel canceled';
}
return null;
}
export {Duel}