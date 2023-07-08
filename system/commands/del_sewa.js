const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delsewa"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m, groupName }) => {
        if (m.text.includes("https://chat.whatsapp.com/")) {
        if (!m.text.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        let idGroup = await sock.groupAcceptInvite(m.text.split("https://chat.whatsapp.com/")[1])
        if (!Object.keys(db.expired[m.botNumber].sewa).includes(idGroup)) return m.reply("Belum sewa kak")
        let groupMetadata = await sock.groupMetadata(idGroup)
        delete db.expired[m.botNumber].sewa[idGroup]
        await m.reply("Success delete sewa " + groupMetadata.subject)
        } else if (m.quoted && m.quoted.budy.includes("https://chat.whatsapp.com/")) {
        if (!m.quoted.budy.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        let idGroup = await sock.groupAcceptInvite(m.quoted.budy.split("https://chat.whatsapp.com/")[1])
        if (!Object.keys(db.expired[m.botNumber].sewa).includes(idGroup)) return m.reply("Belum sewa kak")
        let groupMetadata = await sock.groupMetadata(idGroup)
        delete db.expired[m.botNumber].sewa[idGroup]
        await m.reply("Success delete sewa " + groupMetadata.subject)
        } else if (m.isGroup) {
        if (!Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) return m.reply("Belum sewa kak")
        delete db.expired[m.botNumber].sewa[m.chat]
        await m.reply("Success delete sewa " + groupName)
        } else m.reply("Link group?")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})