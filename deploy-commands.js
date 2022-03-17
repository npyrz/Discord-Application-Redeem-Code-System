const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('createcode').setDescription(`Create a code for someone to redeem the role!`).addStringOption(option => option.setName('discord-id').setDescription('The Discord ID of the user you want to be able to redeem the code!')),
	new SlashCommandBuilder().setName('redeemcode').setDescription(`Redeem the code that you were given to get the role!`).addStringOption(option => option.setName('code').setDescription('The code you were given so you can redeem the role!'))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);