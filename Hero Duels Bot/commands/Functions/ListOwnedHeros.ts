import { ProfList } from "../Global Vars";
import { ProfIndex } from "../Objects/Profile";


function ListOwnedHeros(Id: string): string {

    let appendedText = '';
    if(ProfList[ProfIndex(Id)].hasTiberius)
    appendedText += '\nTiberius Ulfnod ';
    if(ProfList[ProfIndex(Id)].hasCork)
    appendedText += '\nCork Grayscale ';
    if(ProfList[ProfIndex(Id)].hasFrizz)
    appendedText += '\nFrizzagigg of the Flame ';
    if(ProfList[ProfIndex(Id)].hasGrau)
    appendedText += '\nGrau ';
    return appendedText
}
export {ListOwnedHeros}