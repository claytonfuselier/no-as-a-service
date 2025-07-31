const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Get configuration and exit if non-existent
const configPath = path.resolve(__dirname, '../config/config.json');
if (!fs.existsSync(configPath)) {
  console.log('Config file not found at \'${configPath}\'. Exiting...');
  process.exit(1);
} else {
  // Read configuration
  const config = require(configPath);
  const botEnabled = config.discordBot.enabled;
  const botToken = config.discordBot.token;
  const botName = config.discordBot.name;
  const embedUrl = config.discordBot.embedUrl;
}

// Exit if bot not enabled in config
if (!config.discord.botEnabled) {
  console.log('Discord bot is disabled in config. Exiting...');
  process.exit(0);
}


// Connect bot
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`${botName} is online!`);
});

// New message
client.on('messageCreate', async message => {
  // Bot mentioned by user and not another bot
  if (message.mentions.has(client.user) && !message.author.bot) {
    console.log(`Mentioned by ${message.author.username}: ${message.content}`);
    try {
      // Call NaaS API
      const res = await fetch('http://localhost:3000/no');
      // API sent 429
      if (res.status === 429) {
        const reset = res.headers.get('x-ratelimit-reset');
        const resetSeconds = Math.max(0, parseInt(reset) - Math.floor(Date.now() / 1000));
        message.channel.send(`Too many requests. Try again in ${resetSeconds} seconds.`);
        return;
      }
      // Get API response
      const data = await res.json();
      // Build "embed" response
      const embed = new EmbedBuilder()
        .setDescription(data.reason || 'No reason provided.')
        .setColor(0xff5733)
        .setFooter({ text: 'Provided by No-as-a-Service' })
        .setURL(embedUrl);
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error('Error fetching from API:', err);
      message.channel.send('Something went wrong while.');
    }
  }
});

client.login(config.discordBotToken);
