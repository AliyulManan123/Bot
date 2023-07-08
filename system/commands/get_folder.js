const fs = require("fs") 
const chalk = require("chalk")
const { basename } = require("path")
const { exec } = require("child_process")
module.exports = {
    commands: ["getfolder"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} ./message",
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
        let data = [
        ...fs.readdirSync("./").filter((x) => !x.includes(".")).map((x) => "./" + x), 
        ...fs.readdirSync("./config").filter((x) => !x.includes(".")).map((x) => "./config/" + x), 
        ...fs.readdirSync("./system").filter((x) => !x.includes(".")).map((x) => "./system/" + x), 
        ]
        if (!m.text.includes("./")) return
        if (m.text.includes("node_modules")) return m.reply("Sizenya gede banget kak 🙂")
        if (!data.includes(m.text)) return m.reply("Filder not found")
        setTimeout(() => {
        fs.unlinkSync(m.text + ".zip")
        }, 7000)
        setTimeout(() => {
        sock.sendMessage(m.chat, { document: fs.readFileSync(m.text + ".zip"), mimetype: "application/bin", fileName: basename(m.text + ".zip") }, { quoted: m })
        }, 5000)
        setTimeout(() => {
        m.reply("Sending file......")
        }, 3000)
        m.reply("Folder to zip......")
        exec(`zip -r ${m.text}.zip ${m.text}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})