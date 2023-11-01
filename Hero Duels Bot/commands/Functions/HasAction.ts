import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"

function HasAction(ID: string, actionName: string)
{
    //Rage
    if(actionName == 'rage' && ProfList[ProfIndex(ID)].activeAction1 == 'rage' || actionName == 'rage' && ProfList[ProfIndex(ID)].activeAction2 == 'rage')
    return true;

    //Quick brew
    if(actionName == 'quick brew' && ProfList[ProfIndex(ID)].activeAction1 == 'quick brew' || actionName == 'quick brew' && ProfList[ProfIndex(ID)].activeAction2 == 'quick brew')
    return true;

    //Smite
    if(actionName == 'smite' && ProfList[ProfIndex(ID)].activeAction1 == 'smite' || actionName == 'smite' && ProfList[ProfIndex(ID)].activeAction2 == 'smite')
    return true;

    //Ground Slam
    if(actionName == 'ground slam' && ProfList[ProfIndex(ID)].activeAction1 == 'ground slam' || actionName == 'ground slam' && ProfList[ProfIndex(ID)].activeAction2 == 'ground slam' )
    return true;

    else
    return false;
}
export default HasAction