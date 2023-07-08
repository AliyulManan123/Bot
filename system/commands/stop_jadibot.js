const fs = require("fs") 
const chalk = require("chalk")
const { stoopedToServer } = require("@libs/whatsapp-server")
module.exports = {
    commands: ["stopjadibot"],
    cooldown: 13,
    isSewa: true,
    isPrivate: true,
    isPremium: true,
    callback: async({ sock, m }) => {
        stoopedToServer(sock, m.chat)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})