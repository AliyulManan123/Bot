const fs = require("fs") 
const chalk = require("chalk")
const { calender } = require("@libs/function")
module.exports = {
    commands: ["ban"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("Itu owner utama asw")
        if (Object.keys(db.banned).includes(m.input)) return m.reply("Sudah di ban")
        db.banned[m.input] = { date: calender, reason: "" }
        await m.reply(`Success banned @${m.input.split("@")[0]}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})