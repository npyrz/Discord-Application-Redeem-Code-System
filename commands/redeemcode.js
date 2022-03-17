const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json')
const JSONdb = require("simple-json-db");
const database = new JSONdb('./codes.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('redeemcode')
        .setDescription(`Redeem the code that you were given to get the role!`)
        .addStringOption(option => option.setName('code').setDescription('The code you were given so you can redeem the role!')),
        async execute(interaction) {
            const string = await interaction.options.getString('code');
            var port00 = interaction.user.id;
            let key = database.get(string);

                 if (!key) {
                    const exampleEmbed = new MessageEmbed()
                    .setColor("#8ebc92")
                    .setTitle('Redeem Application Code')
                    .setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
                    .setDescription('The code that you provided is not a valid code!')
                    .setTimestamp()
                    return interaction.reply({ embeds: [exampleEmbed]});
                   }

                   if (key.discordid !== port00) {
                    const exampleEmbed2 = new MessageEmbed()
                    .setColor("#8ebc92")
                    .setTitle('Redeem Application Code')
                    .setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
                    .setDescription('The code that you provided does not connect with Discord ID!')
                    .setTimestamp()
                    return interaction.reply({ embeds: [exampleEmbed2]});
                   }
                   
                   if (key) {
                    const exampleEmbed3 = new MessageEmbed()
                    .setColor("#8ebc92")
                    .setTitle('Redeem Application Code')
                    .setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
                    .setDescription(`Congratulations, you have been given your role!`)
                    .setTimestamp()
                     await interaction.member.roles.add(config.roleID);
                    return interaction.reply({ embeds: [exampleEmbed3]});
                     }
                     database.sync();
},
};