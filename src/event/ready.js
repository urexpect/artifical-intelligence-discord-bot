
module.exports = async (client) => {
    client.logger.info(`[!] ${client.user.username} is now started...`)
    client.logger.info(`[!] The bot have ${client.commandes.size} commands and ${client.slash.size} (/) commands`)
    client.user.setActivity(`@etiketle - ❤️ WİNX`, { type: 'PLAYING' })
};
