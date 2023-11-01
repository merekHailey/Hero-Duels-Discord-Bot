import DiscordJS, {  Message } from 'discord.js'

function Help(message: Message) {

//HELP
if (message.content.toLowerCase() === 'hd help') {
    
    return 'Type "HD help options" at any time to see all your possible options';
}
return null;
}
export {Help}