const fs = require("fs") 
const chalk = require("chalk")
const { stoopedToServer } = require("@libs/whatsapp-server")
const listSession = fs.readdirSync("./connections").filter((x) => !x.includes("session")).map((x) => x + "@s.whatsapp.net")
module.exports = {
    commands: ["deljadibot"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async({ sock, m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak") 
        if (!listSession.includes(m.input)) return m.reply("Nomer itu tidak ad dalam list kak")
        stoopedToServer(sock, m.input)
        m.reply("Success delete " + m.input.split("@")[0]) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})