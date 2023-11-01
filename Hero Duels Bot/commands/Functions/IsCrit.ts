import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"

function IsCrit(IDOfRoller: string, natRoll: number)
{
    //Melee vs Ranged Crit
    if(ProfList[ProfIndex(IDOfRoller)].activetype == 'melee' && ProfList[ProfIndex(ProfList[ProfIndex(IDOfRoller)].tempPartner)].activetype == 'ranged')
    {
        if(natRoll == 19 || natRoll == 20)
        return true;
        else 
        return false;
    }
    else
    {
        if(natRoll == 20)
        return true;
        else 
        return false;
    }
}
export default IsCrit