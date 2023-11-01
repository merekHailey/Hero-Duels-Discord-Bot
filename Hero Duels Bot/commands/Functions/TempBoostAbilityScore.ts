import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"

function TempBoostAbilityScore(ID: string, Ability: string, AmountChanged: number)
{
    ProfList[ProfIndex(ID)].activeTBAS = AmountChanged;
    ProfList[ProfIndex(ID)].activeAbilityTBAS = Ability;
    //str
    if(Ability == 'str')
    {
        ProfList[ProfIndex(ID)].activestr += AmountChanged;
    }
    else if(Ability == 'dex')
    {
        ProfList[ProfIndex(ID)].activedex += AmountChanged;
    }
    else if(Ability == 'int')
    {
        ProfList[ProfIndex(ID)].activeint += AmountChanged;
    }
    else if(Ability == 'wis')
    {
        ProfList[ProfIndex(ID)].activewis += AmountChanged;
    }
    else if(Ability == 'con')
    {
        ProfList[ProfIndex(ID)].activecon += AmountChanged;
    }
    else if(Ability == 'cha')
    {
        ProfList[ProfIndex(ID)].activecha += AmountChanged;
    }
}
export default TempBoostAbilityScore