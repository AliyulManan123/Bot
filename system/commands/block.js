const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["block"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        const listBlock = await sock.fetchBlocklist()
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("Itu owner utama asw")
        if (listBlock.includes(m.input)) return m.reply("Sudah di block")
        sock.updateBlockStatus(m.input, "block")
        await m.reply(`Success block @${m.input.split("@")[0]}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})