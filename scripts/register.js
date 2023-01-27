const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const guild = process.argv[2];

const channelOption = {
	type: 7, // text channel
	name: "channel",
	description: "The channel to snipe",
};
const commands = [
	{
		name: "snipe",
		description: "Shows the last deleted message from a specified channel!",
		options: [
			channelOption,
			{
				type: 3, // string
				name: "options",
				description: "Other parts of the deleted message, if present",
				choices: [
					{
						name: "embeds",
						value: "embeds",
					},
					{
						name: "attachments",
						value: "attachments",
					},
				],
			},
		],
	},
	{
		name: "editsnipe",
		description: "Shows the last edited message from a specified channel!",
		options: [channelOption],
	},
	{
		name: "reactionsnipe",
		description:
			"Shows the last removed reaction from a specified channel!",
		options: [channelOption],
	},
];

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log("[sniper] :: Started refreshing application (/) commands.");

		await rest.put(
			guild
				? Routes.applicationGuildCommands(process.env.APPLICATION_ID, guild)
				: Routes.applicationCommands(process.env.APPLICATION_ID),
			{
				body: commands,
			}
		);

		console.log(
			"[sniper] :: Successfully reloaded application (/) commands."
		);
	} catch (error) {
		console.error(error);
	}
})();
