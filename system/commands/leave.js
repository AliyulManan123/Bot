const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["leave"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        const metandaId = {}
        const groupMentanda = await sock.groupFetchAllParticipating()
        for(let x of Object.keys(groupMentanda)) {
        if (!Object.keys(metandaId).includes(groupMentanda[x].subject)) metandaId[groupMentanda[x].subject] = { id: x }
        }
        if (m.text.includes("https://chat.whatsapp.com/")) {
        if (!m.text.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        const idGroup = await sock.groupAcceptInvite(m.text.split("https://chat.whatsapp.com/")[1])
        await sock.groupLeave(idGroup)
        if (idGroup !== m.chat) await m.reply("Success leave group")
        } else if (m.text.includes("@g.us") && !isNaN(m.text.split("@")[0])) {
        await sock.groupLeave(m.text)
        if (m.text !== m.chat) await m.reply("Success leave group")
        } else if (m.isGroup) {
        await sock.groupLeave(m.chat)
        } else if (m.text !== "" && !isNaN(m.text)) {
        const data = Object.keys(await sock.groupFetchAllParticipating())
        await sock.groupLeave(data[Number(m.text) +1])
        if (m.text !== "" && data[Number(m.text) +1] !== m.chat) await m.reply("Success leave group")
        } else if (Object.keys(metandaId).includes(m.text)) {
        await sock.groupLeave(metandaId[m.text].id)
        if (metandaId[m.text].id !== m.chat) await m.reply("Success leave group")
        } else {
        m.reply("Id?") 
        }
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})