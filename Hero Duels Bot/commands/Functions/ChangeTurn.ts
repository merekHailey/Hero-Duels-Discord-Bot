import { ProfList } from "../Global Vars"
import { ProfIndex } from "../Objects/Profile"
import WipeEndOfTurnAbilities from "./WipeEndOfTurn";
import { TiberiusSTH, CorkSTH, FrizzagiggSTH, GrauSTH } from "../Objects/HeroCard";

function changeTurn(IDForTurnStart: string, oneOrTwo: number)
{
    //Not yet
    //P1
    if(ProfList[ProfIndex(ProfList[ProfIndex(IDForTurnStart)].tempPartner)].lock == 'player 1 declare action')
    {
        return;
    }
    //P2
    if(ProfList[ProfIndex(ProfList[ProfIndex(IDForTurnStart)].tempPartner)].lock == 'player 2 declare action')
    {
        return;
    }
    //Reset Damage types
    //Frizz
    if(ProfList[ProfIndex(IDForTurnStart)].activeCard == FrizzagiggSTH)
    {
        ProfList[ProfIndex(IDForTurnStart)].activeDealt_Damage_Type = 'piercing';
    }
    //Grau
    if(ProfList[ProfIndex(IDForTurnStart)].activeCard == GrauSTH)
    {
        ProfList[ProfIndex(IDForTurnStart)].activeDealt_Damage_Type = 'piercing';
    }
    if(oneOrTwo == 1)
    {
        ProfList[ProfIndex(IDForTurnStart)].activeBonusAction = true;
        //Prime Study
        if(ProfList[ProfIndex(IDForTurnStart)].activeIsStudied == true)
        {
            ProfList[ProfIndex(IDForTurnStart)].activeIsStudyPrimed = true;
        }
        //Recharge?
        if (ProfList[ProfIndex(IDForTurnStart)].activeCondition == 'recharge')
        {
            
            ProfList[ProfIndex(IDForTurnStart)].lock = 'player 1 wait';
            ProfList[ProfIndex(ProfList[ProfIndex(IDForTurnStart)].tempPartner)].lock = 'player 2 turn start';
            
            
        }
        else
        {
            
            ProfList[ProfIndex(IDForTurnStart)].lock = 'player 1 turn start';
            ProfList[ProfIndex(ProfList[ProfIndex(IDForTurnStart)].tempPartner)].lock = 'player 2 wait';
        }
        
    }
    else if (oneOrTwo == 2)
    {
        ProfList[ProfIndex(IDForTurnStart)].activeBonusAction = true;
       //Prime Study
       if(ProfList[ProfIndex(IDForTurnStart)].activeIsStudied == true)
       {
           ProfList[ProfIndex(IDForTurnStart)].activeIsStudyPrimed = true;
       }
        //Recharge?
        if (ProfList[ProfIndex(IDForTurnStart)].activeCondition == 'recharge')
        {
            
            ProfList[ProfIndex(IDForTurnStart)].lock = 'player 2 wait';
            ProfList[ProfIndex(ProfList[ProfIndex(IDForTurnStart)].tempPartner)].lock = 'player 1 turn start';
            
            
        }
        else
        {
            
            ProfList[ProfIndex(IDForTurnStart)].lock = 'player 2 turn start';
            ProfList[ProfIndex(ProfList[ProfIndex(IDForTurnStart)].tempPartner)].lock = 'player 1 wait';
        }
    }
    else
    {
        ProfList[ProfIndex(IDForTurnStart)].activeName = '3 Reached in assigning NextTurnNumber';
    }
    
    
    WipeEndOfTurnAbilities(ProfList[ProfIndex(IDForTurnStart)].tempPartner);
}

export default changeTurn