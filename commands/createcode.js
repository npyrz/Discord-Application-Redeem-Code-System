const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json')
const JSONdb = require("simple-json-db");
const database = new JSONdb('./codes.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createcode')
		.setDescription(`Create a code for someone to redeem the role!`)
		.addStringOption(option => option.setName('discord-id').setDescription('The Discord ID of the user you want to be able to redeem the code!')),
		async execute(interaction) {
			if(interaction.member.roles.cache.has(config.permID)) {
			const string = await interaction.options.getString('discord-id');
			var role = config.roleID;
			let randomthingy = `${Math.floor(Math.random() * 10000) + 1}-${Math.floor(Math.random() * 10000) + 1}-${Math.floor(Math.random() * 10000) + 1}`;
			let key = `${randomthingy}`
			while (database.has(key)) {
				randomthingy = `${Math.floor(Math.random() * 10000) + 1}-${Math.floor(Math.random() * 10000) + 1}-${Math.floor(Math.random() * 10000) + 1}`;
				key = `${randomthingy}`
			}
			database.set(key, {
			   roleid: role,
			   discordid: string
		   },);
			   const exampleEmbed = new MessageEmbed()
			   .setColor("#8ebc92")
				.setTitle('Application Code Created')
				.setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
			  	 .addField('**Code:**', "`"+key+"`", true)
				.setTimestamp()
				interaction.reply({ embeds: [exampleEmbed]});
			}
			database.sync();
},
};