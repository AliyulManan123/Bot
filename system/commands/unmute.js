const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["unmute"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (!db.chats[m.chat].mute) return m.reply("Sudah non active")
        db.chats[m.chat].mute = false
        m.reply("Success unmute group")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})