const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["script"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        m.reply("DI BUAT : @6289674310267\nINFO UPDATE : https://chat.whatsapp.com/DGsLvU2b2IKGsukJJVCaXc\nSOURCE CODE : Maaf kak untuk bot ini edisi terbatas...")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})