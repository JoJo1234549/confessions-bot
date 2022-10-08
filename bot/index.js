// Require everything
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('console-stamp')(console, 'dd/mm HH:MM:ss.l');

// Require dotenv config
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

module.exports = {

	client,

}

const productionCommandsPath = path.join(__dirname, 'commands');
const prodcutionCommandFiles = fs.readdirSync(productionCommandsPath).filter(file => file.endsWith('.js'));

for (const file of prodcutionCommandFiles) {
    const filePath = path.join(productionCommandsPath, file);
    delete require.cache[require.resolve(filePath)];
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {

	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
		console.log(`${interaction.user.username} ran ${interaction.commandName}`);
	}
	catch (error) {
		console.error(error);
		try {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		catch (error2) {
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);