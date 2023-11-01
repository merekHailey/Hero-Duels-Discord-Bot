import DiscordJS, { Message, TextChannel } from 'discord.js'
import ActionMenu from '../Functions/Action Menu'
import changeTurn from '../Functions/ChangeTurn'
import { client, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'

function ChooseAC(message:Message) {

//Choose AC
    if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' choose AC')
    {
        //AC
        if(message.content.toLowerCase() == 'a')
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC = 'AC';
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return "Your next attack will target your opponent's Armor Class. " + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
        //BAC
        else if(message.content.toLowerCase() == 'b')
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC = 'BAC';
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return "Your next attack will target your opponent's Bludgeoning Armor Class. " + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
        //SAC
        else if(message.content.toLowerCase() == 's')
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC = 'SAC';
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return "Your next attack will target your opponent's Slashing Armor Class. " + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
        //PAC
        else if(message.content.toLowerCase() == 'p')
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC = 'PAC';
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return "Your next attack will target your opponent's Piercing Armor Class. " + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
        //MAC
        else if(message.content.toLowerCase() == 'm')
        {
            ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeChosenAC = 'MAC';
            changeTurn(ProfList[ProfIndex(message.author.id)].tempPartner, ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber)
            return "Your next attack will target your opponent's Magic Armor Class. " + ActionMenu(ProfList[ProfIndex(message.author.id)].tempPartner);
        }
    }
    return null;
}
export {ChooseAC}