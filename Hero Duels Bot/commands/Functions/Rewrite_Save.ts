import { ProfIndex } from "../Objects/Profile"
import { ProfList } from "../Global Vars"
import { savedata } from "../Global Vars"
const fs = require("fs")

//REWRITESAVE
function RewriteSave(ID: string)
{
     savedata[ProfIndex(ID)] = {
        Username: ProfList[ProfIndex(ID)].username,
        Index: ProfList[ProfIndex(ID)].index,
        Id: ID,
        HasTiberius: ProfList[ProfIndex(ID)].hasTiberius,
        HasCork: ProfList[ProfIndex(ID)].hasCork,
        HasFrizz: ProfList[ProfIndex(ID)].hasFrizz,
        HasGrau: ProfList[ProfIndex(ID)].hasGrau
      }; 
const savedatastring = JSON.stringify(savedata);

fs.writeFileSync('SaveData..json', savedatastring)
}
export default RewriteSave