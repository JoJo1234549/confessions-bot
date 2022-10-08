const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require('../index.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('confess')
		.setDescription('Submits a confession')
		.addStringOption(option => option.setName('confession')
			.setDescription('The confession text')
			.setRequired(true)),
	async execute(interaction) {
		console.log(interaction.channel.id);
		if (['1018652300908171305', '1023432660896460900'].includes(interaction.channel.id)) {

			const confession = interaction.options.getString('confession');
			const confession_embed = new EmbedBuilder()
				.setColor(Math.round(Math.random() * 16777215))
				.setTitle(`Anonymous Confession`)
				.setTimestamp()
				.setDescription(`"${confession}"`);

			await interaction.reply({ content: 'Confession has been sent.', ephemeral: true });
			const confession_msg = await interaction.channel.send({ embeds: [confession_embed] });

			const logs_embed = new EmbedBuilder()
				.setColor(Math.round(Math.random() * 16777215))
				.setTitle(`${interaction.user.username}'s Confession`)
				.setURL(`${confession_msg.url}`)
				.setFooter({ text: `${interaction.user.id}` })
				.setTimestamp()
				.setDescription(`"${confession}"`);
			logChannel = client.channels.cache.get(`1020176305951621140`).send({ embeds: [logs_embed] })
		}
		else{
			await interaction.reply({ content: 'You can\'t use confessions in this channel.', ephemeral: true });
		}
	},
};