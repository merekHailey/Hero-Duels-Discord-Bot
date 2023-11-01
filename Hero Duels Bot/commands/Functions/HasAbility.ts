import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import { TiberiusSTH, CorkSTH, FrizzagiggSTH, GrauSTH } from "../Objects/HeroCard";

function HasAbility(ID: string, abilityName: string)
{
    //Rage
    if(abilityName == 'rage' && ProfList[ProfIndex(ID)].activeAbility1 == 'rage' || abilityName == 'rage' && ProfList[ProfIndex(ID)].activeAbility2 == 'rage' )
    return true;

    //Short Fuse
    if(abilityName == 'short fuse' && ProfList[ProfIndex(ID)].activeAbility1 == 'short fuse' ||abilityName == 'short fuse' && ProfList[ProfIndex(ID)].activeAbility2 == 'short fuse')
    return true;

    //Unkillable
    if(abilityName == 'unkillable' && ProfList[ProfIndex(ID)].activeAbility1 == 'unkillable' || abilityName == 'unkillable' && ProfList[ProfIndex(ID)].activeAbility2 == 'unkillable' )
    return true;

    //Wereshark
    if(abilityName == 'wereshark' && ProfList[ProfIndex(ID)].activeCard == CorkSTH)
    return true;

    //Tough Skin
    if(abilityName == 'tough skin' && ProfList[ProfIndex(ID)].activeAbility1 == 'tough skin' || abilityName == 'tough skin' && ProfList[ProfIndex(ID)].activeAbility2 == 'tough skin' )
    return true;

    //BOOM!
    if(abilityName == 'BOOM!' && ProfList[ProfIndex(ID)].activeAbility1 == 'BOOM!' || abilityName == 'BOOM!' && ProfList[ProfIndex(ID)].activeAbility2 == 'BOOM!')
    return true;

    //Bogey
    if(abilityName == 'Bogey' && ProfList[ProfIndex(ID)].activeAbility1 == 'Bogey' || abilityName == 'Bogey' && ProfList[ProfIndex(ID)].activeAbility2 == 'Bogey')
    return true;

    //You're Coming With Me
    if(abilityName == "You're Coming With Me" && ProfList[ProfIndex(ID)].activeAbility1 == "You're Coming With Me" || abilityName == "You're Coming With Me" && ProfList[ProfIndex(ID)].activeAbility2 == "You're Coming With Me")
    return true;

    return false;
}
export default HasAbility