import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"

function Heal(ID: string, healAmount: number)
{
    ProfList[ProfIndex(ID)].activeHp += healAmount;
    //Hit cap?
    if(ProfList[ProfIndex(ID)].activeHp > ProfList[ProfIndex(ID)].activeMaxHp)
    {
        ProfList[ProfIndex(ID)].activeHp = ProfList[ProfIndex(ID)].activeMaxHp;
    }
}
export default Heal