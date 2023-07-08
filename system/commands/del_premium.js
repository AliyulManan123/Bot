const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delpremium","delprem"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("Itu owner utama asw")
        if (!Object.keys(db.expired[m.botNumber].premium).includes(m.input)) return m.reply("User bukan premium kak")
        delete db.expired[m.botNumber].premium[m.input]
        await m.reply("Success delete premium @" + m.input.split("@")[0])
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})