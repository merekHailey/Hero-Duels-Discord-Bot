import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import HasAbility from "./HasAbility";
import Heal from "./Heal";

function WipeEndOfTurnAbilities(IDtoBeWiped: string)
{
    //recharge wipe
    if(ProfList[ProfIndex(IDtoBeWiped)].activeCondition == 'recharge')
    {
        ProfList[ProfIndex(IDtoBeWiped)].activeCondition = 'post recharge';
    }
    //cork smite
    if(ProfList[ProfIndex(IDtoBeWiped)].activeAction1Status == 'used')
    {
        ProfList[ProfIndex(IDtoBeWiped)].activeAction1Status = 'none';
        ProfList[ProfIndex(IDtoBeWiped)].activeadded_Damage -= 6;
    }

    //cork ground slam
    if(ProfList[ProfIndex(IDtoBeWiped)].activeAbility2Status == 'ground slam')
    {
        ProfList[ProfIndex(IDtoBeWiped)].activeAbility2Status = 'none';
    }

    //Bogey
    if(HasAbility(IDtoBeWiped, 'Bogey') == true)
    {
        Heal(IDtoBeWiped, 1);
    }

    //TempAbility Boost
    if(ProfList[ProfIndex(IDtoBeWiped)].activeTBAS != 0)
    {
    var AmountChanged = ProfList[ProfIndex(IDtoBeWiped)].activeTBAS
    var  Ability = ProfList[ProfIndex(IDtoBeWiped)].activeAbilityTBAS 
    //str
        if(Ability == 'str')
        {
            ProfList[ProfIndex(IDtoBeWiped)].activestr -= AmountChanged;
        }
        else if(Ability == 'dex')
        {
            ProfList[ProfIndex(IDtoBeWiped)].activedex -= AmountChanged;
        }
        else if(Ability == 'int')
        {
            ProfList[ProfIndex(IDtoBeWiped)].activeint -= AmountChanged;
        }
        else if(Ability == 'wis')
        {
            ProfList[ProfIndex(IDtoBeWiped)].activewis -= AmountChanged;
        }
        else if(Ability == 'con')
        {
            ProfList[ProfIndex(IDtoBeWiped)].activecon -= AmountChanged;
        }
        else if(Ability == 'cha')
        {
            ProfList[ProfIndex(IDtoBeWiped)].activecha -= AmountChanged;
        }
        ProfList[ProfIndex(IDtoBeWiped)].activeTBAS = 0
        ProfList[ProfIndex(IDtoBeWiped)].activeAbilityTBAS = 'none'
    }

        ProfList[ProfIndex(IDtoBeWiped)].crit = '0';
        ProfList[ProfIndex(ProfList[ProfIndex(IDtoBeWiped)].tempPartner)].crit = '0';
    
}
export default WipeEndOfTurnAbilities