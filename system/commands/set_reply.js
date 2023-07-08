const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["setreply"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        if (m.args[0] == "mess1" || m.args[0] == "1") {
        if (config[m.botNumber].replytype == "mess1") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess1"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess1", contextInfo: { forwardingScore: 999, isForwarded: true }}, { quoted: m })
        } else if (m.args[0] == "mess2" || m.args[0] == "2") {
        if (config[m.botNumber].replytype == "mess2") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess2"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess2", contextInfo: { forwardingScore: 10, isForwarded: true }}, { quoted: m })
        } else if (m.args[0] == "mess3" || m.args[0] == "3") {
        if (config[m.botNumber].replytype == "mess3") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess3"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess3" }, { quoted: m })
        } else {
        m.reply("\`\`\`「 SETTINGS REPLY BOT 」\`\`\`\n\n1. mess1\n2. mess2\n3. mess3")
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