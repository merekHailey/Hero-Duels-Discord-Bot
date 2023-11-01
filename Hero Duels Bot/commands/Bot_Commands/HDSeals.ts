import DiscordJS, { Message } from 'discord.js'
import { ProfList } from '../Global Vars';
import { ProfIndex } from '../Objects/Profile';

function HDSeals(message: Message) {

//HELP
if (message.content.toLowerCase() === 'hd seals') {
    let text = 'Your Seals:\n';
    let uncountedSeals = ProfList[ProfIndex(message.author.id)].seals
    //Have any?
    if(uncountedSeals > 0)
    {
        //Add Platinum
        if(uncountedSeals >= 1000)
        {
            let sealDecriment = Math.floor(uncountedSeals/1000)
            text += '**Platinum:** ' + sealDecriment + '\n';
            uncountedSeals -= sealDecriment * 1000;
        }
        //Add Gold
        if(uncountedSeals >= 100)
        {
            let sealDecriment = Math.floor(uncountedSeals/100)
            text += '**Gold:** ' + sealDecriment + '\n';
            uncountedSeals -= sealDecriment * 100;
        }
        //Add Silver
        if(uncountedSeals >= 10)
        {
            let sealDecriment = Math.floor(uncountedSeals/10)
            text += '**Silver:** ' + sealDecriment + '\n';
            uncountedSeals -= sealDecriment * 10;
        }
        //Add Bronze
        if(uncountedSeals >= 1)
        {
            let sealDecriment = uncountedSeals
            text += '**Bronze:** ' + sealDecriment + '\n';
            uncountedSeals -= sealDecriment;
        }
        return text;
    }
    //No seals
    else
    {
        text = "You don't have any Seals, duel players with HD Duel @<User> to earn seals!";
    }
}
return null;
}
export {HDSeals}