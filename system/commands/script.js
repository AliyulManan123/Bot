const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["script"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        m.reply("Maaf ya kak untuk bot ini edisi terbatas...")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})
