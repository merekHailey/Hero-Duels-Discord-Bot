import DiscordJS, {  Formatters, Message, TextChannel } from 'discord.js'
import GetTurnActions from '../Functions/GetTurnActions';
import { ListOwnedHeros } from '../Functions/ListOwnedHeros';
import { ProfList } from '../Global Vars';
import { ProfIndex } from '../Objects/Profile';

function HelpOptions(message: Message) {

//HELP
if (message.content.toLowerCase() === 'hd help options') {

    if(ProfList[ProfIndex(message.author.id)].lock == 'none')
        return Formatters.userMention(message.author.id) + ', your options are:\n**HD duel @<user>\n**';

    if(ProfList[ProfIndex(message.author.id)].lock == 'duel accept')
        return Formatters.userMention(message.author.id) + ', your options are:\n**Yes/Y\nNo/n**';

    if(ProfList[ProfIndex(message.author.id)].lock == 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' reveal')
        return Formatters.userMention(message.author.id) + ', your options are:\n' +  Formatters.bold(ListOwnedHeros(message.author.id));
    
    if(ProfList[ProfIndex(message.author.id)].lock == 'short fuse check P' + ProfList[ProfIndex(message.author.id)].playerNumber)
        return Formatters.userMention(message.author.id) + ', your options are:\n**Yes/Y\nNo/N'

    if(ProfList[ProfIndex(message.author.id)].lock == 'wereshark check P' + ProfList[ProfIndex(message.author.id)].playerNumber)
        return Formatters.userMention(message.author.id) + ', your options are:\n**Roll**';

    if(ProfList[ProfIndex(message.author.id)].lock == 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' initiative')
        return Formatters.userMention(message.author.id) + ', your options are:\n**Roll**';

    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start')
        return Formatters.userMention(message.author.id) + ', your options are:**' + GetTurnActions(message.author.id) + '**';
        
    if(ProfList[ProfIndex(message.author.id)].lock == 'wait')
        return 'You are waiting for ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].username + ' to act.';

    return 'Uncovered Option: ' + ProfList[ProfIndex(message.author.id)].lock;
}
return null;
}
export {HelpOptions}