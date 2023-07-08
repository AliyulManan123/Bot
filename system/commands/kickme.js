const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["kickme"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupOwner }) => {
        if (m.sender == groupOwner) return m.reply("Gagal kick karna itu pembuat group") 
        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
        await m.reply("Success kick @" + m.senderNumber)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})