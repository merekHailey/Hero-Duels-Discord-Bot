import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import ResetFromDuel from "./ResetFromDuel";
import DiscordJS, { Formatters } from 'discord.js'

function EndDuel(IDOfLoser: string, damageAmount: number)
{
    //Text Provided Suffix
    if(ProfList[ProfIndex(IDOfLoser)].activeAbility1Status == 'loss' || ProfList[ProfIndex(IDOfLoser)].activeAbility2Status == 'ground slam' || ProfList[ProfIndex(IDOfLoser)].activeAbility1Status == 'YCWM attacking' || ProfList[ProfIndex(ProfList[ProfIndex(IDOfLoser)].tempPartner)].activeAbility1Status == 'YCWM attacking')
    {
        var partner = Formatters.userMention(ProfList[ProfIndex(IDOfLoser)].tempPartner)
        ResetFromDuel(IDOfLoser);
        return '\n\n' + partner + ' has emerged victorious! Congratulations!';
    }
    else
    {
        var partner = Formatters.userMention(ProfList[ProfIndex(IDOfLoser)].tempPartner)
        var HP = ProfList[ProfIndex(IDOfLoser)].activeHp;
        ResetFromDuel(IDOfLoser);
        return Formatters.userMention(IDOfLoser) + ' has taken ' + damageAmount + ' damage! leaving them with ' + HP + ' HP.\n\nThe duel is over and ' + partner + ' has emerged victorious! Congratulations!';
    }
}
export default EndDuel