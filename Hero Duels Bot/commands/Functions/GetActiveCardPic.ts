import { ProfList } from "../Global Vars";
import { CorkPic, FrizzagiggPic, GrauPic, TiberiusCardPic, TiberiusPic } from "../Objects/Card Pictures";
import { CorkSTH, FrizzagiggSTH, GrauSTH, TiberiusSTH } from "../Objects/HeroCard";
import { ProfIndex } from "../Objects/Profile";


function GetActiveCardPic(Id: string) {
    if(ProfList[ProfIndex(Id)].activeCard == TiberiusSTH)
    {
        return TiberiusPic
    }
    if(ProfList[ProfIndex(Id)].activeCard == CorkSTH)
    {
        return CorkPic
    }
    if(ProfList[ProfIndex(Id)].activeCard == FrizzagiggSTH)
    {
        return FrizzagiggPic
    }
    if(ProfList[ProfIndex(Id)].activeCard == GrauSTH)
    {
        return GrauPic
    }
    return TiberiusCardPic;
}
export {GetActiveCardPic}