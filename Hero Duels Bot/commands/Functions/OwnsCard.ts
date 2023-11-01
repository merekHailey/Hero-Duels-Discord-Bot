import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"

function ownsCard(text: string, ID: string)
{
    if (text.toLowerCase() == 'tiberius' || text.toLowerCase() == 'tiberius ulfnod')
    {
        if (ProfList[ProfIndex(ID)].hasTiberius == true)
        {
            return true
        }
        else
        {
            return false
        }
    }
    if (text.toLowerCase() == 'cork' || text.toLowerCase() == 'cork grayscale')
    {
        if (ProfList[ProfIndex(ID)].hasCork == true)
        {
            return true
        }
        else
        {
            return false
        }
    }
    if (text.toLowerCase() == 'frizzagigg' || text.toLowerCase() == 'frizz')
    {
        if (ProfList[ProfIndex(ID)].hasFrizz == true)
        {
            return true
        }
        else
        {
            return false
        }
    }
    if (text.toLowerCase() == 'grau')
    {
        if (ProfList[ProfIndex(ID)].hasGrau == true)
        {
            return true
        }
        else
        {
            return false
        }
    }
}
export default ownsCard