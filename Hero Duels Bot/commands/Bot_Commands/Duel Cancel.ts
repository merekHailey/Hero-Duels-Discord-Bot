import DiscordJS, { Message, TextChannel } from 'discord.js'
import { client, ProfList } from "../Global Vars"
import EndDuel from '../Functions/EndDuel';
import { SearchProfile, ProfIndex } from '../Objects/Profile';


function DuelCancel(message:Message) {
//Cancel
    if (SearchProfile(message.author.id, 'lock') != 'none' && message.content == 'duel cancel') 
    {
        ProfList[ProfIndex(message.author.id)].lock = 'none';
        ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'none';
        ProfList[ProfIndex(message.author.id)].tempPartner = '0';
        EndDuel(message.author.id, 69);
        return 'Duel canceled';
    }
    return null;
}

export {DuelCancel}