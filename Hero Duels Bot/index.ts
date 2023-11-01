import DiscordJS, { Formatters, TextChannel } from 'discord.js'
import { client, IDcounter, IDcounterUp, ProfList, savedata } from './commands/Global Vars'
import EndDuel from './commands/Functions/EndDuel'
import dotenv from 'dotenv'
import { isValidProfile, Profile, ProfIndex, SearchProfile } from './commands/Objects/Profile'
import {MessageHandler} from './commands/MessageHandler'
import RewriteSave from './commands/Functions/Rewrite_Save'
import { CorkCardPic, CorkPic, FrizzagiggCardPic, FrizzagiggPic, GrauCardPic, GrauPic, TiberiusCardPic, TiberiusPic } from './commands/Objects/Card Pictures'
import isValidCard from './commands/Functions/IsValidCard'
import setActiveCard from './commands/Functions/SetActiveCard'
import { CorkSTH, FrizzagiggSTH, GrauSTH, TiberiusSTH } from './commands/Objects/HeroCard'
import ownsCard from './commands/Functions/OwnsCard'
import { GetActiveCardPic } from './commands/Functions/GetActiveCardPic'
import HasAbility from './commands/Functions/HasAbility'
import { ValidChannel } from './commands/Functions/ValidChannel'
dotenv.config()


client.on('ready', () => {
    console.log('Hero Duels is online!')


    //To read from savedata to create Profiles and remember names, and indexes and push IDcounter to right spot
    
    
    
    var i = 0;
    while (savedata[i] != undefined)
    {
        const newName = Object.create(Profile)
            newName.username = savedata[i].Username
            newName.id = savedata[i].Id
            newName.index = savedata[i].Index
            newName.hasTiberius = savedata[i].HasTiberius
            newName.hasCork = savedata[i].HasCork
            newName.hasFrizz = savedata[i].HasFrizz
            newName.hasGrau = savedata[i].HasGrau
            
            ProfList[IDcounter] = newName;
            IDcounterUp();
            i += 1;
    }
})


client.on('messageCreate', async (message) => {
    if(ValidChannel(message.channelId))
    {
        //MESSAGE HANDLER
        let BotResponse: string | null = MessageHandler(message);
        if(BotResponse != null)
        {
            (client.channels.cache.get(message.channelId) as TextChannel)
        .send(BotResponse);
        }


        //MENTIONED USER
        if (message.mentions.users.size > 0)
        {
            var mentionedUser = message.mentions.users.first();
            
            
        }
        if(mentionedUser != undefined)
        var stringMentionedUser: string = mentionedUser.toString()
        else
        var stringMentionedUser: string = 'usdghfkasdbjhdbfjhaewfjagdsffeuwf';
    //GIVE
        //Tiberius
        
        if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd give tiberius ' + stringMentionedUser && mentionedUser != undefined)
        {
            if(isValidProfile(mentionedUser.id) == true)
        {
                message.reply(
                    {
                    content: Formatters.userMention(mentionedUser.id) + ', you have recieved the ' + Formatters.bold( 'Small Town Hero Tiberius Ulfnod')  + ' Hero Duels card. Congratulations!',
                    embeds: [TiberiusCardPic],
                
                    })
                    
                    ProfList[ProfIndex(mentionedUser.id)].hasTiberius = true;
                    RewriteSave(mentionedUser.id)
            }
            else
            {
                (client.channels.cache.get(message.channelId) as TextChannel)

                .send( Formatters.userMention(mentionedUser.id) + ' needs to be registered before they can accept a card. Try using the ' + Formatters.bold('HD Start ') + 'command!',
                
                    )
                    
            }
        }  
        

    //Cork

    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd give cork ' + stringMentionedUser && mentionedUser != undefined)
    {
    if(isValidProfile(mentionedUser.id) == true)
    {
                message.reply({
                content: Formatters.userMention(mentionedUser.id) + ', you have recieved the ' + Formatters.bold('Small Town Hero Cork Grayscale ') + 'Hero Duels card. Congratulations!',
                embeds: [CorkCardPic],
                })
                
                ProfList[ProfIndex(mentionedUser.id)].hasCork = true;
                RewriteSave(mentionedUser.id)
        }
        else
        {
                (client.channels.cache.get(message.channelId) as TextChannel)

    .send(Formatters.userMention(mentionedUser.id) + ' needs to be registered before they can accept a card. Try using the ' + Formatters.bold(' HD Start ') + 'command!',
            
                )
                
        }
    }  

    //Frizz
    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd give frizz' + stringMentionedUser && mentionedUser != undefined)
    {
        if(isValidProfile(mentionedUser.id) == true)
    {
            message.reply(
                {
                content: Formatters.userMention(mentionedUser.id) + ', you have recieved the ' + Formatters.bold( 'Small Town Hero Frizzagigg of the Flame')  + ' Hero Duels card. Congratulations!',
                embeds: [FrizzagiggCardPic],
            
                })
                
                ProfList[ProfIndex(mentionedUser.id)].hasFrizz = true;
                RewriteSave(mentionedUser.id)
        }
        else
        {
            (client.channels.cache.get(message.channelId) as TextChannel)

            .send( Formatters.userMention(mentionedUser.id) + ' needs to be registered before they can accept a card. Try using the ' + Formatters.bold('HD Start ') + 'command!',
            
                )
                
        }
    }  

    //Grau
    if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd give grau ' + stringMentionedUser && mentionedUser != undefined)
    {
        if(isValidProfile(mentionedUser.id) == true)
    {
            message.reply(
                {
                content: Formatters.userMention(mentionedUser.id) + ', you have recieved the ' + Formatters.bold( 'Small Town Hero Grau')  + ' Hero Duels card. Congratulations!',
                embeds: [GrauCardPic],
            
                })
                
                ProfList[ProfIndex(mentionedUser.id)].hasGrau = true;
                RewriteSave(mentionedUser.id)
        }
        else
        {
            (client.channels.cache.get(message.channelId) as TextChannel)

            .send( Formatters.userMention(mentionedUser.id) + ' needs to be registered before they can accept a card. Try using the ' + Formatters.bold('HD Start ') + 'command!',
            
                )
                
        }
    }  


        //all

        if (message.author.id === '533751158901309460'  && message.content.toLowerCase() ==  'hd give all ' + stringMentionedUser && mentionedUser != undefined)
        {
        if(isValidProfile(mentionedUser.id) == true)
        {
                message.reply(
                    {
                    content: Formatters.userMention(mentionedUser.id) + ', you have recieved' + Formatters.bold(' every ') + 'vailable Hero Duels card. Congratulations!',
                    embeds: [TiberiusCardPic, CorkCardPic, FrizzagiggCardPic, GrauCardPic],
                    })
                    
                    ProfList[ProfIndex(mentionedUser.id)].hasCork = true;
                    ProfList[ProfIndex(mentionedUser.id)].hasTiberius = true;
                    ProfList[ProfIndex(mentionedUser.id)].hasFrizz = true;
                    ProfList[ProfIndex(mentionedUser.id)].hasGrau = true;
                    RewriteSave(mentionedUser.id)
            }
            else
            {
            (client.channels.cache.get(message.channelId) as TextChannel)

            .send( Formatters.userMention(mentionedUser.id) + ' needs to be registered before they can accept a card. Try using the ' + Formatters.bold('HD Start') + ' command!',
                
                    )
                    
            }
        }

        //reset
        if (message.author.bot == false && message.content.toLowerCase() == 'duel reset')
        {
            EndDuel(message.author.id, 69);
                    
            
        }


        //TEST
        if (message.author.bot == false && message.content ==  'test')
        {
            client.users.cache.get(message.author.id)?.send('<message>');
            console.log(message.channelId)
            
        }
    }
//REVEAL DMs
    else if (SearchProfile(message.author.id, 'lock') == 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' reveal' && isValidCard(message.content) == true && ownsCard(message.content, message.author.id) == true && message.channel.type == "DM")
    {
    ProfList[ProfIndex(message.author.id)].activeCard = setActiveCard(message.content, message.author.id);
        //Tiberius Picture
        if (ProfList[ProfIndex(message.author.id)].activeCard == TiberiusSTH)
        {
                message.reply({
                content: Formatters.userMention(message.author.id) + ', you have selected ' + ProfList[ProfIndex(message.author.id)].activeName + ': ' + ProfList[ProfIndex(message.author.id)].activeSubname,
                embeds: [TiberiusPic],
                
                })
        }
        //Cork Picture
        if (ProfList[ProfIndex(message.author.id)].activeCard == CorkSTH)
        {
                message.reply({
                content: Formatters.userMention(message.author.id) + ', you have selected ' + ProfList[ProfIndex(message.author.id)].activeName + ': ' + ProfList[ProfIndex(message.author.id)].activeSubname,
                embeds: [CorkPic],
                
            })
        }
        //Frizz Picture
        if (ProfList[ProfIndex(message.author.id)].activeCard == FrizzagiggSTH)
        {
                message.reply({
                content: Formatters.userMention(message.author.id) + ', you have selected ' + ProfList[ProfIndex(message.author.id)].activeName + ': ' + ProfList[ProfIndex(message.author.id)].activeSubname,
                embeds: [FrizzagiggPic],
                
                })
        }
        //Grau Picture
        if (ProfList[ProfIndex(message.author.id)].activeCard == GrauSTH)
        {
                message.reply({
                content: Formatters.userMention(message.author.id) + ', you have selected ' + ProfList[ProfIndex(message.author.id)].activeName + ': ' + ProfList[ProfIndex(message.author.id)].activeSubname,
                embeds: [GrauPic],
                })
        }
        //Other player Done?
        if(ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeCard != 'no active card')
        {
            (client.channels.cache.get(ProfList[ProfIndex(message.author.id)].activeChannelID) as TextChannel)
            .send('Both Heros have been selected! \n' + Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ' has selected **' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName + '**\n' + Formatters.userMention(message.author.id) + ' has selected **' + ProfList[ProfIndex(message.author.id)].activeName + '**!');
                
            (client.channels.cache.get(ProfList[ProfIndex(message.author.id)].activeChannelID) as TextChannel)
            .send({embeds: [GetActiveCardPic(ProfList[ProfIndex(message.author.id)].tempPartner), GetActiveCardPic(message.author.id)]})

                //1st player's Short fuse Check
            if (HasAbility(message.author.id,'short fuse') == true) 
            {
                (client.channels.cache.get(ProfList[ProfIndex(message.author.id)].activeChannelID) as TextChannel)

                .send( Formatters.userMention(message.author.id) + ", " + ProfList[ProfIndex(message.author.id)].activeName + "'s **Short Fuse** ability activates! Would you like to **Rage? (Y/N)**")
                ProfList[ProfIndex(message.author.id)].lock = 'short fuse check P' + ProfList[ProfIndex(message.author.id)].playerNumber;
                if (!HasAbility(ProfList[ProfIndex(message.author.id)].tempPartner, 'wereshark') && !HasAbility(ProfList[ProfIndex(message.author.id)].tempPartner, 'short fuse'))
                {
                    ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'duel player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' initiative';
                    return;
                }
                
            }
        
            //2nd player's Short fuse Check
            if (HasAbility(ProfList[ProfIndex(message.author.id)].tempPartner,'short fuse') == true) 
            {
                (client.channels.cache.get(ProfList[ProfIndex(message.author.id)].activeChannelID) as TextChannel)

                .send( Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ", " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName + "'s **Short Fuse** ability activates! Would you like to **Rage? (Y/N)**",
                )
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'short fuse check P' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber;
                if (!HasAbility(message.author.id, 'wereshark') || !HasAbility(message.author.id, 'short fuse'))
                {
                    ProfList[ProfIndex(message.author.id)].lock = 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' initiative';
                    return;
                }
                
            }

            //1st player Wereshark Check
            if (HasAbility(message.author.id, 'wereshark')) 
            {
                (client.channels.cache.get(ProfList[ProfIndex(message.author.id)].activeChannelID) as TextChannel)
                .send( Formatters.userMention(message.author.id) + ", " + ProfList[ProfIndex(message.author.id)].activeName + "'s  Wereshark ability activates! " + Formatters.bold('Roll') + ' a DC 11 flat check to see whether or not ' + ProfList[ProfIndex(message.author.id)].activeName + ' will turn into a Wereshark!'
                )
                ProfList[ProfIndex(message.author.id)].lock = 'wereshark check P' + ProfList[ProfIndex(message.author.id)].playerNumber;
                if (!HasAbility(ProfList[ProfIndex(message.author.id)].tempPartner, 'wereshark') && !HasAbility(ProfList[ProfIndex(message.author.id)].tempPartner, 'short fuse'))
                {
                    ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'duel player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' initiative';
                    return;
                }
                
            }

            //2nd player Wereshark Check
            if (HasAbility(ProfList[ProfIndex(message.author.id)].tempPartner, 'wereshark')) 
            {
                (client.channels.cache.get(ProfList[ProfIndex(message.author.id)].activeChannelID) as TextChannel)

                .send( Formatters.userMention(ProfList[ProfIndex(message.author.id)].tempPartner) + ", " + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName + "'s  Wereshark ability activates! " + Formatters.bold('Roll') + ' a DC 11 flat check to see whether or not ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].activeName + ' will turn into a Wereshark!'
                )
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'wereshark check P' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber;
                if (!HasAbility(message.author.id, 'wereshark') && !HasAbility(message.author.id, 'short fuse'))
                {
                    ProfList[ProfIndex(message.author.id)].lock = 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' initiative';
                    return;
                }
            }

            //Both Non-Reveal
            if(!HasAbility(message.author.id, 'short fuse') && !HasAbility(message.author.id, 'wereshark') && !HasAbility(ProfList[ProfIndex(message.author.id)].tempPartner, 'short fuse') && !HasAbility(ProfList[ProfIndex(message.author.id)].tempPartner, 'wereshark'))
            {
                ProfList[ProfIndex(message.author.id)].lock = 'duel player ' + ProfList[ProfIndex(message.author.id)].playerNumber + ' initiative';
                ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].lock = 'duel player ' + ProfList[ProfIndex(ProfList[ProfIndex(message.author.id)].tempPartner)].playerNumber + ' initiative';
                (client.channels.cache.get(ProfList[ProfIndex(message.author.id)].activeChannelID) as TextChannel)

                .send('You both must now **Roll** for initiative!' )
            }
        }
    }

    //Wrong Channel
    else {return}    
});

client.login(process.env.TOKEN)

