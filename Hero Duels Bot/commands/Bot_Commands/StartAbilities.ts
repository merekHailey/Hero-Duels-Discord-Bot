import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import { client, ProfList } from "../Global Vars"
import { SearchProfile } from '../Objects/Profile'
import RollDice from '../Functions/RollDice'
import { Profile, ProfIndex } from '../Objects/Profile'
import { TiberiusSTH } from '../Objects/HeroCard'

function StartAbilities(message: Message) {
//Short Fuse Check
    //yes
    if(SearchProfile(message.author.id, 'lock') == 'short fuse check P' + ProfList[ProfIndex(message.author.id)].playerNumber && message.content.toLowerCase() == 'yes' || SearchProfile(message.author.id, 'lock') == 'short fuse check P' + ProfList[ProfIndex(message.author.id)].playerNumber && message.content.toLowerCase() == 'y')
    {
        
            ProfList[ProfIndex(message.author.id)].activeHp += 4;
            ProfList[ProfIndex(message.author.id)].activeadded_Damage += 1;
            ProfList[ProfIndex(message.author.id)].activeAC -= 1;
            //Specialty check
                        //BAC
                        if(ProfList[ProfIndex(message.author.id)].activeBAC != 0)
                        {
                            ProfList[ProfIndex(message.author.id)].activeBAC -= 1;
                        }
                        //PAC
                        if(ProfList[ProfIndex(message.author.id)].activePAC != 0)
                        {
                            ProfList[ProfIndex(message.author.id)].activePAC -= 1;
                        }
                        //SAC
                        if(ProfList[ProfIndex(message.author.id)].activeSAC != 0)
                        {
                            ProfList[ProfIndex(message.author.id)].activeSAC -= 1;
                        }
                        //MAC
                        if(ProfList[ProfIndex(message.author.id)].activeMAC != 0)
                        {
                            ProfList[ProfIndex(message.author.id)].activeMAC -= 1;
                        }
            ProfList[ProfIndex(message.author.id)].activeAction1Status = 'raging';
        

            ProfList[ProfIndex(message.author.id)].lock = 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' initiative';
        //Tiberius?
        if (ProfList[ProfIndex(message.author.id)].activeCard == TiberiusSTH){
            return 'Tiberius lets out a terrifying scream! His veins are buldging and fear begins to take his opponents over. The Night Tearer is the least of their worries, as Tiberius is now Raging. Now ' + Formatters.bold('Roll') + ' for initiative!';
        
    }
    }
    //no
    else if(SearchProfile(message.author.id, 'lock') == 'short fuse check P' + ProfList[ProfIndex(message.author.id)].playerNumber && message.content.toLowerCase() == 'no' || SearchProfile(message.author.id, 'lock') == 'short fuse check P' + ProfList[ProfIndex(message.author.id)].playerNumber && message.content.toLowerCase() == 'n')
    {
        ProfList[ProfIndex(message.author.id)].lock = 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' initiative';
        return ProfList[ProfIndex(message.author.id)].activeName + ' remains calm and steadfast. Now ' + Formatters.bold('Roll') + ' for initiative!';
    }

    //Wereshark Check
    if(SearchProfile(message.author.id, 'lock') == 'wereshark check P' + ProfList[ProfIndex(message.author.id)].playerNumber && message.content.toLowerCase() == 'roll')
    {
        var roll = RollDice();
        if (roll > 10)
        {
            ProfList[ProfIndex(message.author.id)].lock = 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber +' initiative';
                return 'You rolled a ' + roll.toString() + ', you passed the check and Cork remains in his human form. Now ' + Formatters.bold('Roll') + ' for initiative!';
        }
        if (roll <= 10)
        {
            ProfList[ProfIndex(message.author.id)].activedex -= 5;
            ProfList[ProfIndex(message.author.id)].activestr += 5;
            ProfList[ProfIndex(message.author.id)].activecon += 5;
            ProfList[ProfIndex(message.author.id)].activeAction1 = 'none';
            ProfList[ProfIndex(message.author.id)].activeAction2 = 'none';
            ProfList[ProfIndex(message.author.id)].activeAC += 2;
            //Specialty check
                        //BAC
                        if(ProfList[ProfIndex(message.author.id)].activeBAC != 0)
                        {
                            ProfList[ProfIndex(message.author.id)].activeBAC += 2;
                        }
                        //PAC
                        if(ProfList[ProfIndex(message.author.id)].activePAC != 0)
                        {
                            ProfList[ProfIndex(message.author.id)].activePAC += 2;
                        }
                        //SAC
                        if(ProfList[ProfIndex(message.author.id)].activeSAC != 0)
                        {
                            ProfList[ProfIndex(message.author.id)].activeSAC += 2;
                        }
                        //MAC
                        if(ProfList[ProfIndex(message.author.id)].activeMAC != 0)
                        {
                            ProfList[ProfIndex(message.author.id)].activeMAC += 2;
                        }
                        ProfList[ProfIndex(message.author.id)].lock = 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber +' initiative';
            ProfList[ProfIndex(message.author.id)].activeAbility1Status = 'wereshark';
            return 'You rolled a ' + roll.toString() + '. The full moon calls Cork to shift and transform, as scales take over and his teeth start to grow. He is now a Wereshark. Now ' + Formatters.bold('Roll') + ' for initiative!';
        }

        
        return;
    }
}
export default StartAbilities;