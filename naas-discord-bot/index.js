const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, '../config/config.json');

if (!fs.existsSync(configPath)) {
  console.log('Config file not found. Exiting...');
  process.exit(1);
}

const config = require(configPath);

if (!config.enableDiscordBot) {
  console.log('Discord bot is disabled in config. Exiting...');
  process.exit(0);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`${config.discordBotName} is online!`);
});

client.on('messageCreate', async message => {
  if (message.mentions.has(client.user) && !message.author.bot) {
    console.log(`Mentioned by ${message.author.username}: ${message.content}`);
    try {
      const res = await fetch(config.apiUrl);
      if (res.status === 429) {
        const reset = res.headers.get('x-ratelimit-reset');
        const resetSeconds = Math.max(0, parseInt(reset) - Math.floor(Date.now() / 1000));
        message.channel.send(`Too many requests. Try again in ${resetSeconds} seconds.`);
        return;
      }
      const data = await res.json();
      const embed = new EmbedBuilder()
        .setDescription(data.reason || 'No reason provided.')
        .setColor(0xff5733)
        .setFooter({ text: 'Provided by No-as-a-Service' })
        .setURL(config.apiWebsite);
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error('Error fetching from API:', err);
      message.channel.send('Something went wrong while contacting No-as-a-Service.');
    }
  }
});

client.login(config.discordBotToken);
