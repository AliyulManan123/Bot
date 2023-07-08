const fs = require("fs") 
const chalk = require("chalk")
const { randomNomor } = require("@libs/function")
module.exports = {
    commands: ["vidonce"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
    await sock.sendMessage(m.chat, { contextInfo: { forwardingScore: 9999, isForwarded: true }, video: { url: "https://github.com/Zyrenn/Pragos/raw/main/" + randomNomor(2) + ".mp4"}, caption: "🛐", viewOnce: true })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})