const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('J Cole', {type: 'LISTENING'}); 
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

client.on('message', message => {
    if (message.content === '!music') {
        if (message.channel.type !== 'text') return;

        const { voiceChannel } = message.member;

        if (!voiceChannel) {
            return message.reply('please join a voice channel first!');
        }

        voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=UZwyUC4gloM', { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream);

            dispatcher.on('end', () => voiceChannel.leave());
        });
    }
});

client.login('YOUR-TOKEN-HERE');