const Discord = require("discord.js");
const client = new Discord.Client();
const JSONdb = require("simple-json-db");
const database = new JSONdb('./codes.json');
const config = require("./config.json");
client.config = config;

client.on("message", message => {
   var port00 = message.author.id;
   var prefix = config.prefix;
   const args = message.content.slice(prefix.length).trim().split(' ');
   const command = args.shift().toLowerCase();
   if (command === 'redeem') {
      if (!args.length) {
         const exampleEmbed2 = new Discord.MessageEmbed()
         .setColor(config.embedColor)
         .setTitle('Redeem Application Code')
         .setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
         .setDescription("Please provide the correct code!\n \n Example: `!redeem 9988-9538-326`")
         .setTimestamp()
         return message.channel.send(exampleEmbed2);
      }
      if (database.has(args[0])){
         let key = database.get(args);
         let roleid = key.role;
         if (key.discordid !== port00) {
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Redeem Application Code')
            .setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
            .setDescription('The code that you provided does not match the Discord ID that it was set too!')
            .setTimestamp()
               message.channel.send(exampleEmbed);
         }
         if (key.discordid === port00) {
            let role = message.guild.roles.cache.get(roleid); 
            message.member.roles.add(role);
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Redeem Application Code')
            .setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
            .setDescription(`Congratulations, you have been given your role!`)
            .setTimestamp()
               message.channel.send(exampleEmbed);
               database.delete(args);
         }
      }
   }
   database.sync();
});

client.on("message", message => {
   var prefix = "!";
   const args = message.content.slice(prefix.length).trim().split(' ');
   const command = args.shift().toLowerCase();
   if (command === 'createcode') {
      if (!args.length) {
         const exampleEmbed2 = new Discord.MessageEmbed()
         .setColor(config.embedColor)
         .setTitle('Application Code Creation')
         .setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
         .setDescription("Please provide the correct Discord ID of the user!\n \n Example: `!createcode 395383087531425793`")
         .setTimestamp()
         return message.channel.send(exampleEmbed2);
      }
      
   database.sync();
   var role = config.role;
   let randomthingy = `${Math.floor(Math.random() * 10000) + 1}-${Math.floor(Math.random() * 10000) + 1}-${Math.floor(Math.random() * 10000) + 1}`;
   let key = `${randomthingy}`
   while (database.has(key)) {
       randomthingy = `${Math.floor(Math.random() * 10000) + 1}-${Math.floor(Math.random() * 10000) + 1}-${Math.floor(Math.random() * 10000) + 1}`; // Generate new random key
       key = `${randomthingy}`
   }
   database.set(key, {
      roleid: role,
      discordid: args[0]
  },);
      const exampleEmbed = new Discord.MessageEmbed()
      .setColor(config.embedColor)
       .setTitle('Application Code Created')
       .setThumbnail('https://cdn.discordapp.com/attachments/942989506209005600/946210594103635988/window-system-icon.png')
      .addField('**Code:**', "`"+key+"`", true)
       .setTimestamp()
           message.channel.send(exampleEmbed);
   }
   database.sync();
});

client.login(config.token);