import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"

function hasCards(ID: string)
{
    if (ProfList[ProfIndex(ID)].hasTiberius == true|| ProfList[ProfIndex(ID)].hasCork == true || ProfList[ProfIndex(ID)].hasFrizz == true || ProfList[ProfIndex(ID)].hasGrau == true)
    {
        return true;
    }
    else
    return false;
}
export default hasCards