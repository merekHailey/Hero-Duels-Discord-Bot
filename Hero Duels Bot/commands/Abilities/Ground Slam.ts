import DiscordJS, { Formatters, Message, TextChannel } from 'discord.js'
import HasAction from '../Functions/HasAction'
import { client, ProfList } from "../Global Vars"
import { ProfIndex } from '../Objects/Profile'
function GroundSlam(message:Message) {

//GROUND SLAM
if(ProfList[ProfIndex(message.author.id)].lock == 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' turn start' && message.content.toLowerCase() == 'ground slam' && HasAction(message.author.id, 'ground slam'))
{
            //Declaration Check
    if(ProfList[ProfIndex(message.author.id)].activeDeclaredAction != 'none')
    {
        if (ProfList[ProfIndex(message.author.id)].activeDeclaredAction == 'Ground Slam')
        {
            //Grappled?
            if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
            {
                    return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn. However, you are grappled and must make a Basic Attack this turn.';
            }
        }
        //Not this action
        else
        {
            return 'You declared you would ' + ProfList[ProfIndex(message.author.id)].activeDeclaredAction + ' this turn.';
        }
    }
            //Grappled?
        if(ProfList[ProfIndex(message.author.id)].activeIsGrappled == true)
        {
            return 'You are grappled and must make a ' + Formatters.bold('Basic Attack') + ' this turn.';
        }
        //Reset declaration
        ProfList[ProfIndex(message.author.id)].activeDeclaredAction = 'none';
            ProfList[ProfIndex(message.author.id)].activeAction2Status = 'ground slam init';
            ProfList[ProfIndex(message.author.id)].lock = 'player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' attack roll';
            return 'You raise your fists in the air and stike the ground with all the strength you have! ' + Formatters.bold('Roll') + ' to attack for half damage and see if you trip your opponent!';
        }
        return null;
    } 
    export {GroundSlam}