import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import HasAbility from "./HasAbility";
import HasAction from "./HasAction";
function ValidAction(ID: string, content: string)
{
    if(content == 'attack')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Attack';
        return true;
    }
    else if(content == 'rage' && HasAbility(ID, 'rage') == true)
    {
        //not Raging?
        if(ProfList[ProfIndex(ID)].activeAbility1 != 'rage' && ProfList[ProfIndex(ID)].activeAbility2 != 'rage')
        {
            ProfList[ProfIndex(ID)].activeDeclaredAction = 'Rage';
            return true;
        }
       
    }
    else if(content == 'ground slam' && HasAction(ID, 'ground slam') == true)
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Ground Slam';
        return true;
    }

    else if(content == 'demoralize')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Demoralize';
        return true;
    }

    else if(content == 'disarm')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Disarm';
        return true;
    }

    else if(content == 'feint')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Feint';
        return true;
    }

    else if(content == 'find weakness')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Find Weakness';
        return true;
    }

    else if(content == 'grapple')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Grapple';
        return true;
    }

    

    else if(content == 'trip')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Trip';
        return true;
    }

    else if(content == 'recharge')
    {
        if(ProfList[ProfIndex(ID)].activeDisarmCounter != 0 || ProfList[ProfIndex(ID)].activeIsTripped == true)
        {
            ProfList[ProfIndex(ID)].activeDeclaredAction = 'Recharge';
            return true;
        }
    }

    else if(content == 'quick brew')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Quick Brew';
        return true;
    }

    else if(content == 'pass turn')
    {
        ProfList[ProfIndex(ID)].activeDeclaredAction = 'Pass Turn';
        return true;
    }

    else
    {
        return false;
    }

}
export default ValidAction