const fs = require("fs") 
const chalk = require("chalk")
const moment = require("moment-timezone")
module.exports = {
    commands: ["listgc"],
    cooldown: 13,
    isSewa: true,
    isPremium: true, 
    callback: async ({ sock, m }) => {
        let data = Object.keys(await sock.groupFetchAllParticipating())
        let teks = "\`\`\`「 LIST GROUP CHAT 」\`\`\`\n\n"
        for(let x of data) {
        try{
        var groupMetadata = await sock.groupMetadata(x)
        var participants = await groupMetadata.participants
        var groupAdmins = await participants.filter((x) => x.admin !== null).map((x) => x.id)
        } catch {
        var groupMetadata = { subject: "Tidak diketahui", owner: undefined, creation: 999999999 }
        var participants = []
        var groupAdmins = []
        }
        teks += ` *•* Nama : ${groupMetadata.subject}\n *•* Owner : ${groupMetadata.owner !== undefined? "@" + groupMetadata.owner.split("@")[0] : "Tidak diketahui"}\n *•* Creation : ${moment(groupMetadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n *•* Total Admins : ${groupAdmins.length}\n *•* Total Members : ${participants.map((x) => x.id).length}\n *•* Link Group : ${groupAdmins.includes(m.botNumber)? "https://chat.whatsapp.com/" + await sock.groupInviteCode(x) : "Botz Is Not Admin"}\n\n────────────────\n\n`
        }
        teks += `\n\n*Total ada : ${data.length}*`
        m.reply(teks)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})