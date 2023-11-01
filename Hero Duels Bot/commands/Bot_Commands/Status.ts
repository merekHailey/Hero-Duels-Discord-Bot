import DiscordJS, { Message } from 'discord.js'
import { ProfList } from '../Global Vars';
import { ProfIndex } from '../Objects/Profile';

function Status(message: Message) {
if(ProfList[ProfIndex(message.author.id)].activeCard != "no active card"){

        
    let difference = 0;
    //Status
    if (message.content.toLowerCase() === 'hd status') {
        let status = "";
        status += ProfList[ProfIndex(message.author.id)].activeName + "          " + ProfList[ProfIndex(message.author.id)].activeSubname + "\n" +
        ProfList[ProfIndex(message.author.id)].activeLevel + "\n" +
        "HP: " + ProfList[ProfIndex(message.author.id)].activeHp + "/" + ProfList[ProfIndex(message.author.id)].activeMaxHp + "\n\n";
        //Str Modifiers?
        if(ProfList[ProfIndex(message.author.id)].activestr != ProfList[ProfIndex(message.author.id)].activeStartingStr){
            difference = ProfList[ProfIndex(message.author.id)].activestr - ProfList[ProfIndex(message.author.id)].activeStartingStr;
            if (difference > 0){
                status += "Str: " + ProfList[ProfIndex(message.author.id)].activestr + " +" + difference + "       ";
            }
            else{
                status += "Str: " + ProfList[ProfIndex(message.author.id)].activestr + " " + difference + "       ";
            }
        }
        else{
            status += "Str: " + ProfList[ProfIndex(message.author.id)].activestr + "          ";
        }
        //Int Modifiers?
        if(ProfList[ProfIndex(message.author.id)].activeint != ProfList[ProfIndex(message.author.id)].activeStartingInt){
            difference = ProfList[ProfIndex(message.author.id)].activeint - ProfList[ProfIndex(message.author.id)].activeStartingInt;
            if (difference > 0){
                status += "Int: " + ProfList[ProfIndex(message.author.id)].activeint + " +" + difference + "\n";
            }
            else{
                status += "Int: " + ProfList[ProfIndex(message.author.id)].activeint + " " + difference + "\n";
            }
        }
        else{
            status += "Int: " + ProfList[ProfIndex(message.author.id)].activeint + "\n";
        }

        //Dex Modifiers?
        if(ProfList[ProfIndex(message.author.id)].activedex != ProfList[ProfIndex(message.author.id)].activeStartingDex){
            difference = ProfList[ProfIndex(message.author.id)].activedex - ProfList[ProfIndex(message.author.id)].activeStartingDex;
            if (difference > 0){
                status += "Dex: " + ProfList[ProfIndex(message.author.id)].activedex + " +" + difference + "       ";
            }
            else{
                status += "Dex: " + ProfList[ProfIndex(message.author.id)].activedex + " " + difference + "       ";
            }
        }
        else{
            status += "Dex: " + ProfList[ProfIndex(message.author.id)].activedex + "          ";
        }

        //Wis Modifiers?
        if(ProfList[ProfIndex(message.author.id)].activewis != ProfList[ProfIndex(message.author.id)].activeStartingWis){
            difference = ProfList[ProfIndex(message.author.id)].activewis - ProfList[ProfIndex(message.author.id)].activeStartingWis;
            if (difference > 0){
                status += "Wis: " + ProfList[ProfIndex(message.author.id)].activewis + " +" + difference + "\n";
            }
            else{
                status += "Wis: " + ProfList[ProfIndex(message.author.id)].activewis + " " + difference + "\n";
            }
        }
        else{
            status += "Wis: " + ProfList[ProfIndex(message.author.id)].activewis + "\n";
        }

        //Con Modifiers?
        if(ProfList[ProfIndex(message.author.id)].activecon != ProfList[ProfIndex(message.author.id)].activeStartingCon){
            difference = ProfList[ProfIndex(message.author.id)].activecon - ProfList[ProfIndex(message.author.id)].activeStartingCon;
            if (difference > 0){
                status += "Con: " + ProfList[ProfIndex(message.author.id)].activecon + " +" + difference + "       ";
            }
            else{
                status += "Con: " + ProfList[ProfIndex(message.author.id)].activecon + " " + difference + "       ";
            }
        }
        else{
            status += "Con: " + ProfList[ProfIndex(message.author.id)].activecon + "          ";
        }

        //Cha Modifiers?
        if(ProfList[ProfIndex(message.author.id)].activecha != ProfList[ProfIndex(message.author.id)].activeStartingCha){
            difference = ProfList[ProfIndex(message.author.id)].activecha - ProfList[ProfIndex(message.author.id)].activeStartingCha;
            if (difference > 0){
                status += "Cha: " + ProfList[ProfIndex(message.author.id)].activecha + " +" + difference + "\n\n";
            }
            else{
                status += "Cha: " + ProfList[ProfIndex(message.author.id)].activecha + " " + difference + "\n\n";
            }
        }
        else{
            status += "Cha: " + ProfList[ProfIndex(message.author.id)].activecha + "\n\n";
        }


        
        return status
    }
}

return null;
}
export {Status}