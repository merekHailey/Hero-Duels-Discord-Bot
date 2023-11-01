import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import HasAbility from "./HasAbility";
import RollDice from "./RollDice";

function CheckLoss(IDToCheck: string)
{
    if(ProfList[ProfIndex(IDToCheck)].activeHp <= 0)
    {
        ProfList[ProfIndex(IDToCheck)].activeHp = 0;
        //Unkillable check
        if(HasAbility(IDToCheck, 'unkillable') == true && ProfList[ProfIndex(IDToCheck)].activeAbility1Status == 'unused')
        {
            var unkillableRoll = RollDice() + ProfList[ProfIndex(IDToCheck)].activecon - 10;
            //Pass
            if(unkillableRoll >= 20)
            {
                ProfList[ProfIndex(IDToCheck)].rollToCompare = unkillableRoll;
                ProfList[ProfIndex(IDToCheck)].activeAbility1Status == 'pass'
                console.log("unkillable pass reached")
                return false;
            }
            //Fail
            else
            {
                ProfList[ProfIndex(IDToCheck)].rollToCompare = unkillableRoll;
                ProfList[ProfIndex(IDToCheck)].activeAbility1Status = 'loss';
                console.log("unkillable fail reached")
                return true;
            }
           
        }
         //You're Coming With Me
         if(HasAbility(IDToCheck, "You're Coming With Me") == true)
         {
             ProfList[ProfIndex(IDToCheck)].activeMagicType = 'fire';
             ProfList[ProfIndex(IDToCheck)].activeAbility1Status = 'activated'
             ProfList[ProfIndex(IDToCheck)].activeAlternativeDamageMod = 'int'
             console.log("You're coming with me in checkloss reached")
             return false;
         }
        return true;
    }
    else 
    console.log("check loss returned false normally")
    return false;
}
export default CheckLoss