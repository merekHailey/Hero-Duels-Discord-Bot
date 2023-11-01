import { ProfList } from "../Global Vars";

//Profile Create
const Profile = {
    username: 'name goes here',
    

    id: '0',
    index: 0,
    lock: 'none',
    tempPartner: '0',
    rollToCompare: 0,
    crit: 'no',
    activeCard: 'no active card',

    //Inventory
    hasTiberius: false,
    hasCork: false,
    hasFrizz: false,
    hasGrau: false,

    //Active Card Stats
    activeName: 'YOU FORGOT THE NAME, IDIOT',
    activeSubname: 'SUBNAME HERE',
    activeLevel: 'none',
    activetype: 'none',
    activeFameMod: 0,
    activeHP: 0,
    activeDealt_Damage_Type: 'none',
    activeMagicType: 'none',
    activeDamage_Value: 0,
    activeAC: 0,
    activeMAC: 0,
    activeBAC: 0, 
    activeSAC: 0,
    activePAC: 0,
    activestr: 0,
    activedex: 0,
    activecon: 0,
    activeint: 0,
    activewis: 0,
    activecha: 0,
    activeadded_Damage: 0,
    activeAttackMod: 0,
    activeTempAttackMod : 0,
    activeAbility1:  'none',
    activeAbility2: 'none',
    activeOncePerDuel: 'none',
    activeBonusAction: true,
    activeCondition: 'none',
    activeIsGrappled: false,
    activeGrappleIsMaintained: false,
    activeIsStealthing: false,
    activeStealthIsMaintained: false,
    activeIsTripped: false,
    activeIsStudied: false,
    activeIsStudyPrimed: false,
    activeDeclaredAction: 'none',
    activeDisarmCounter: 0,
  };

  //Search Profile
function SearchProfile(ID: string, DataToFind: string)
{
    var i = 0;
    while (ID !== ProfList[i].id)
    {
        if (i !== 499)
        {
            i = i + 1;
        }
        else
        {
            return 'Error with finding index';
        }
    }
    if (DataToFind === 'lock')
    {
        return ProfList[i].lock;
    }
    else if (DataToFind === 'username')
    {
        return ProfList[i].username;
    }
    else if (DataToFind === 'valid')
    {
        return true;
    }
    else return 'error with data to find';
}

//ProfIndex

function ProfIndex(ID: string)
{
    var i = 0;
    while (ID !== ProfList[i].id)
    {
        if (i !== 499)
        {
            i = i + 1;
        }
        else
        {
            return 0;
        }
    }
    return i;
}

//isValidProfile

function isValidProfile(ID: string)
{
    var status;

    if(SearchProfile(ID,'valid') == true)
    {
        status = true;
    }
    else
    {
        status = false;
    }
    return status;
}
  export {Profile, ProfIndex, isValidProfile, SearchProfile}