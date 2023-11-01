import DiscordJS, { Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import { client, ProfList } from "../Global Vars"
import changeTurn from '../Functions/ChangeTurn'
import { ProfIndex } from '../Objects/Profile'

function PassTurn(message: Message) {

//PASS TURN
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'pass turn' || ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' basic action menu' && message.content.toLowerCase() == 'pass turn')
    {
        //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'Pass Turn')
        {
            return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn.';
        }
    }

    //Reset declaration
    ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
    changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
        return 'You passed your turn. ' + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner)
    }
    return null;
}
export {PassTurn}