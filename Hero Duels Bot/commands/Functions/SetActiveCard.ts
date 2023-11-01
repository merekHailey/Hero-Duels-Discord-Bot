import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import { TiberiusSTH, CorkSTH, FrizzagiggSTH, GrauSTH } from "../Objects/HeroCard";

function setActiveCard(card: string, ID: string)
{
    
    if (card.toLowerCase() == 'tiberius' || card.toLowerCase() == 'tiberius ulfnod')
    {
        ProfList[ProfIndex(ID)].activeName = 'Tiberius Ulfnod';
        ProfList[ProfIndex(ID)].activeSubname = 'Half-orc barbarian of the herald nine.';
        ProfList[ProfIndex(ID)].activeLevel = 'Small Town Hero';
        ProfList[ProfIndex(ID)].activeFameMod = 1;
        ProfList[ProfIndex(ID)].activeHp = 18;
        ProfList[ProfIndex(ID)].activeMaxHp = 18;
        ProfList[ProfIndex(ID)].activeDealt_Damage_Type = 'slashing';
        ProfList[ProfIndex(ID)].activeWeapon = 'Greatsword';
        ProfList[ProfIndex(ID)].activeDamage_Value = 0;
        ProfList[ProfIndex(ID)].activeAC = 14;
        ProfList[ProfIndex(ID)].activeMAC = 13;
        ProfList[ProfIndex(ID)].activeBAC = 15;
        ProfList[ProfIndex(ID)].activestr = 14;
        ProfList[ProfIndex(ID)].activedex = 12;
        ProfList[ProfIndex(ID)].activecon = 13;
        ProfList[ProfIndex(ID)].activeint = 9;
        ProfList[ProfIndex(ID)].activewis = 11;
        ProfList[ProfIndex(ID)].activecha = 10;
        ProfList[ProfIndex(ID)].activeTBAS = 0;
        ProfList[ProfIndex(ID)].activeAbilityTBAS = 'none';
        ProfList[ProfIndex(ID)].activeadded_Damage = 0;
        ProfList[ProfIndex(ID)].activeAttackMod = 0;
        ProfList[ProfIndex(ID)].activeTempAttackMod = 0;
        ProfList[ProfIndex(ID)].activetype = 'melee';
        ProfList[ProfIndex(ID)].activeAbility1 = 'unkillable';
        ProfList[ProfIndex(ID)].activeAbility1Status = 'unused'
        ProfList[ProfIndex(ID)].activeAbility2 = 'short fuse';
        ProfList[ProfIndex(ID)].activeAbility2Status = 'null'
        ProfList[ProfIndex(ID)].activeAction1 = 'rage';
        ProfList[ProfIndex(ID)].activeAction1Status = 'not raging';
        ProfList[ProfIndex(ID)].activeAction2 = 'none';
        ProfList[ProfIndex(ID)].activeAction2Status = 'null';
        ProfList[ProfIndex(ID)].activeCondition = 'none';
        ProfList[ProfIndex(ID)].activeDemoralizeCounter = 0;
        ProfList[ProfIndex(ID)].activeAlternativeAttackModType = 'none';
        ProfList[ProfIndex(ID)].activeAlternativeDamageMod = 'none';
        ProfList[ProfIndex(ID)].activeOnNextAttack = 'none';
        return TiberiusSTH;
    }
    if (card.toLowerCase() == 'cork' || card.toLowerCase() == 'cork grayscale')
    {
        ProfList[ProfIndex(ID)].activeName = 'Cork Grayscale';
        ProfList[ProfIndex(ID)].activeSubname = 'The Cursed Sailor From The Shackles';
        ProfList[ProfIndex(ID)].activeLevel = 'Small Town Hero';
        ProfList[ProfIndex(ID)].activeFameMod = 1;
        ProfList[ProfIndex(ID)].activeHp = 13;
        ProfList[ProfIndex(ID)].activeMaxHp = 13;
        ProfList[ProfIndex(ID)].activeDealt_Damage_Type = 'piercing';
        ProfList[ProfIndex(ID)].activeWeapon = 'Trident';
        ProfList[ProfIndex(ID)].activeDamage_Value = 4;
        ProfList[ProfIndex(ID)].activeAC = 15;
        ProfList[ProfIndex(ID)].activePAC = 14;
        ProfList[ProfIndex(ID)].activeMAC = 16;
        ProfList[ProfIndex(ID)].activestr = 13;
        ProfList[ProfIndex(ID)].activedex = 15;
        ProfList[ProfIndex(ID)].activecon = 10;
        ProfList[ProfIndex(ID)].activeint = 8;
        ProfList[ProfIndex(ID)].activewis = 10;
        ProfList[ProfIndex(ID)].activecha = 10;
        ProfList[ProfIndex(ID)].activeTBAS = 0;
        ProfList[ProfIndex(ID)].activeAbilityTBAS = 'none';
        ProfList[ProfIndex(ID)].activeadded_Damage = 0;
        ProfList[ProfIndex(ID)].activeAttackMod = 0;
        ProfList[ProfIndex(ID)].activeTempAttackMod = 0;
        ProfList[ProfIndex(ID)].activetype = 'melee';
        ProfList[ProfIndex(ID)].activeAbility1 = 'wereshark';
        ProfList[ProfIndex(ID)].activeAbility1Status = 'human'
        ProfList[ProfIndex(ID)].activeAbility2 = 'null';
        ProfList[ProfIndex(ID)].activeAbility2Status = 'null'
        ProfList[ProfIndex(ID)].activeAction1 = 'smite';
        ProfList[ProfIndex(ID)].activeAction1Status = 'unused';
        ProfList[ProfIndex(ID)].activeAction2 = 'ground slam';
        ProfList[ProfIndex(ID)].activeAction2Status = 'null';
        ProfList[ProfIndex(ID)].activeCondition = 'none';
        ProfList[ProfIndex(ID)].activeDemoralizeCounter = 0;
        ProfList[ProfIndex(ID)].activeAlternativeAttackModType = 'none';
        ProfList[ProfIndex(ID)].activeAlternativeDamageMod = 'none';
        ProfList[ProfIndex(ID)].activeOnNextAttack = 'none';
        return CorkSTH;
    }

    if (card.toLowerCase() == 'frizzagigg' || card.toLowerCase() == 'frizzagigg of the flame' || card.toLowerCase() == 'frizz')
    {
        ProfList[ProfIndex(ID)].activeName = 'Frizzagig';
        ProfList[ProfIndex(ID)].activeSubname = 'FLAVOR TEXT FOR FRIZZ.';
        ProfList[ProfIndex(ID)].activeLevel = 'Small Town Hero';
        ProfList[ProfIndex(ID)].activeFameMod = 1;
        ProfList[ProfIndex(ID)].activeHp = 14;
        ProfList[ProfIndex(ID)].activeMaxHp = 14;
        ProfList[ProfIndex(ID)].activeDealt_Damage_Type = 'piercing';
        ProfList[ProfIndex(ID)].activeWeapon = 'Slingshot';
        ProfList[ProfIndex(ID)].activeDamage_Value = 0;
        ProfList[ProfIndex(ID)].activeAC = 15;
        ProfList[ProfIndex(ID)].activeStartingAC = 15;
        ProfList[ProfIndex(ID)].activeMAC = 14;
        ProfList[ProfIndex(ID)].activeStartingMAC = 14;
        ProfList[ProfIndex(ID)].activeBAC = 16;
        ProfList[ProfIndex(ID)].activeStartingBAC = 16;
        ProfList[ProfIndex(ID)].activestr = 10;
        ProfList[ProfIndex(ID)].activeStartingStr = 10;
        ProfList[ProfIndex(ID)].activedex = 13;
        ProfList[ProfIndex(ID)].activeStartingDex = 13;
        ProfList[ProfIndex(ID)].activecon = 13;
        ProfList[ProfIndex(ID)].activeStartingCon = 13;
        ProfList[ProfIndex(ID)].activeint = 14;
        ProfList[ProfIndex(ID)].activeStartingInt = 14;
        ProfList[ProfIndex(ID)].activewis = 11;
        ProfList[ProfIndex(ID)].activeStartingWis = 11;
        ProfList[ProfIndex(ID)].activecha = 9;
        ProfList[ProfIndex(ID)].activeStartingCha = 9;
        ProfList[ProfIndex(ID)].activeTBAS = 0;
        ProfList[ProfIndex(ID)].activeAbilityTBAS = 'none';
        ProfList[ProfIndex(ID)].activeadded_Damage = 0;
        ProfList[ProfIndex(ID)].activeAttackMod = 0;
        ProfList[ProfIndex(ID)].activeTempAttackMod = 0;
        ProfList[ProfIndex(ID)].activetype = 'ranged';
        ProfList[ProfIndex(ID)].activeAbility1 = 'tough skin';
        ProfList[ProfIndex(ID)].activeAbility1Status = 'null'
        ProfList[ProfIndex(ID)].activeAbility2 = 'BOOM!';
        ProfList[ProfIndex(ID)].activeAbility2Status = 'null'
        ProfList[ProfIndex(ID)].activeAction1 = 'quick brew';
        ProfList[ProfIndex(ID)].activeAction1Status = 'null';
        ProfList[ProfIndex(ID)].activeAction2 = 'none';
        ProfList[ProfIndex(ID)].activeAction2Status = 'null';
        ProfList[ProfIndex(ID)].activeOncePerDuel = 'none';
        ProfList[ProfIndex(ID)].activeCondition = 'none';
        ProfList[ProfIndex(ID)].activeDemoralizeCounter = 0;
        ProfList[ProfIndex(ID)].activeAlternativeAttackModType = 'none';
        ProfList[ProfIndex(ID)].activeAlternativeDamageMod = 'none';
        ProfList[ProfIndex(ID)].activeOnNextAttack = 'none';
        return FrizzagiggSTH;
    }

    if (card.toLowerCase() == 'grau')
    {
        ProfList[ProfIndex(ID)].activeName = 'Grau';
        ProfList[ProfIndex(ID)].activeSubname = 'FLAVOR TEXT FOR FRIZZ.';
        ProfList[ProfIndex(ID)].activeLevel = 'Small Town Hero';
        ProfList[ProfIndex(ID)].activeFameMod = 1;
        ProfList[ProfIndex(ID)].activeHp = 15;
        ProfList[ProfIndex(ID)].activeMaxHp = 15;
        ProfList[ProfIndex(ID)].activeDealt_Damage_Type = 'slashing';
        ProfList[ProfIndex(ID)].activeWeapon = 'Sword';
        ProfList[ProfIndex(ID)].activeDamage_Value = 0;
        ProfList[ProfIndex(ID)].activeAC = 16;
        ProfList[ProfIndex(ID)].activeMAC = 10;
        ProfList[ProfIndex(ID)].activePAC = 24;
        ProfList[ProfIndex(ID)].activestr = 13;
        ProfList[ProfIndex(ID)].activedex = 11;
        ProfList[ProfIndex(ID)].activecon = 12;
        ProfList[ProfIndex(ID)].activeint = 14;
        ProfList[ProfIndex(ID)].activewis = 9;
        ProfList[ProfIndex(ID)].activecha = 10;
        ProfList[ProfIndex(ID)].activeTBAS = 0;
        ProfList[ProfIndex(ID)].activeAbilityTBAS = 'none';
        ProfList[ProfIndex(ID)].activeadded_Damage = 0;
        ProfList[ProfIndex(ID)].activeAttackMod = 0;
        ProfList[ProfIndex(ID)].activeTempAttackMod = 0;
        ProfList[ProfIndex(ID)].activetype = 'melee';
        ProfList[ProfIndex(ID)].activeAbility1 = "You're Coming With Me";
        ProfList[ProfIndex(ID)].activeAbility1Status = 'null'
        ProfList[ProfIndex(ID)].activeAbility2 = 'Bogey';
        ProfList[ProfIndex(ID)].activeAbility2Status = 'null'
        ProfList[ProfIndex(ID)].activeAction1 = 'quick brew';
        ProfList[ProfIndex(ID)].activeAction1Status = 'null';
        ProfList[ProfIndex(ID)].activeAction2 = 'none';
        ProfList[ProfIndex(ID)].activeAction2Status = 'null';
        ProfList[ProfIndex(ID)].activeOncePerDuel = 'none';
        ProfList[ProfIndex(ID)].activeCondition = 'none';
        ProfList[ProfIndex(ID)].activeDemoralizeCounter = 0;
        ProfList[ProfIndex(ID)].activeAlternativeAttackModType = 'none';
        ProfList[ProfIndex(ID)].activeAlternativeDamageMod = 'none';
        ProfList[ProfIndex(ID)].activeOnNextAttack = 'none';
        return GrauSTH;
    }
    return 'error with setting card';
}
export default setActiveCard