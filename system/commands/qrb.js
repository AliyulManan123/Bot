const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["qrb"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
    m.reply(`ADD PREMIUM TARGET
JANGAN JADIKAN PERMANEN
LALU SURUH TARGET KETIK : Jadibot
Suruh Target Untuk Scan Qr Tersebut
Dan Done!!`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})