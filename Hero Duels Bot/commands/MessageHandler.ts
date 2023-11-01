import { Message } from "discord.js";
import { GroundSlam } from "./Abilities/Ground Slam";
import { QuickBrew } from "./Abilities/QuickBrew";
import { Rage } from "./Abilities/Rage";
import { Smite } from "./Abilities/Smite";
import { Demoralize } from "./Basic Actions/Demoralize";
import { Disarm } from "./Basic Actions/Disarm";
import { Feint } from "./Basic Actions/Feint";
import { FindWeakness } from "./Basic Actions/FindWeakness";
import { Grapple } from "./Basic Actions/Grapple";
import { Menu } from "./Basic Actions/Menu";
import { PassTurn } from "./Basic Actions/PassTurn";
import { Recharge } from "./Basic Actions/Recharge";
import { Study } from "./Basic Actions/Study";
import { Trip } from "./Basic Actions/Trip";
import Attack from "./Basic Actions/Attack";
import { Check } from "./Bot_Commands/Check";
import { Duel } from "./Bot_Commands/Duel";
import { DuelCancel } from "./Bot_Commands/Duel Cancel";
import { Help } from "./Bot_Commands/Help";
import { InitRolls } from "./Bot_Commands/InitRolls";
import { ParryAsking } from "./Bot_Commands/ParryAsking";
import Revoke from "./Bot_Commands/Revoke";
import Start from "./Bot_Commands/Start";
import StartAbilities from "./Bot_Commands/StartAbilities";
import { ChooseAC } from "./HelperCommands/ChooseAC";
import { DeclareAction } from "./HelperCommands/DeclareAction";
import { HelpOptions } from "./Bot_Commands/HelpOptions";
import { Status } from "./Bot_Commands/Status";


function MessageHandler(ReadMessage: Message): string | null
{
    let BotResponse = null
    
    if(ReadMessage.channel.type != "DM")
    {
        BotResponse = Attack(ReadMessage);
        if(BotResponse == null)
        BotResponse = Start(ReadMessage);
        if(BotResponse == null)
        BotResponse = StartAbilities(ReadMessage);
        if(BotResponse == null)
        BotResponse = Revoke(ReadMessage);
        if(BotResponse == null)
        BotResponse = Help(ReadMessage);
        if(BotResponse == null)
        BotResponse = HelpOptions(ReadMessage);
        if(BotResponse == null)
        BotResponse = Status(ReadMessage);
        if(BotResponse == null)
        BotResponse = Duel(ReadMessage);
        if(BotResponse == null)
        BotResponse = InitRolls(ReadMessage);
        if(BotResponse == null)
        BotResponse = ParryAsking(ReadMessage);
        if(BotResponse == null)
        BotResponse = DuelCancel(ReadMessage);
        if(BotResponse == null)
        BotResponse = Check(ReadMessage);

        if(BotResponse == null)
        BotResponse = GroundSlam(ReadMessage);
        if(BotResponse == null)
        BotResponse = QuickBrew(ReadMessage);
        if(BotResponse == null)
        BotResponse = Rage(ReadMessage);
        if(BotResponse == null)
        BotResponse = Smite(ReadMessage);

        if(BotResponse == null)
        BotResponse = Demoralize(ReadMessage);
        if(BotResponse == null)
        BotResponse = Disarm(ReadMessage);
        if(BotResponse == null)
        BotResponse = Feint(ReadMessage);
        if(BotResponse == null)
        BotResponse = FindWeakness(ReadMessage);
        if(BotResponse == null)
        BotResponse = Grapple(ReadMessage);
        if(BotResponse == null)
        BotResponse = Menu(ReadMessage);
        if(BotResponse == null)
        BotResponse = PassTurn(ReadMessage);
        if(BotResponse == null)
        BotResponse = Recharge(ReadMessage);
        if(BotResponse == null)
        BotResponse = Study(ReadMessage);
        if(BotResponse == null)
        BotResponse = Trip(ReadMessage);

        if(BotResponse == null)
        BotResponse = ChooseAC(ReadMessage);
        if(BotResponse == null)
        BotResponse = DeclareAction(ReadMessage);
    }

    return BotResponse
}
export {MessageHandler}