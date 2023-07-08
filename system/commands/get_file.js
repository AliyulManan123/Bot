const fs = require("fs") 
const chalk = require("chalk")
const { basename } = require("path")
module.exports = {
    commands: ["getfile"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} ./package.json",
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
        let data = [
        ...fs.readdirSync("./").filter((x) => x.includes(".")).map((x) => "./" + x), 
        ...fs.readdirSync("./config").filter((x) => x.includes(".")).map((x) => "./config/" + x), 
        ...fs.readdirSync("./config/locales").filter((x) => x.includes(".")).map((x) => "./config/locales/" + x), 
        ...fs.readdirSync("./database").filter((x) => x.includes(".")).map((x) => "./database/" + x), 
        ...fs.readdirSync("./store").filter((x) => x.includes(".")).map((x) => "./store/" + x), 
        ...fs.readdirSync("./temp").filter((x) => x.includes(".")).map((x) => "./temp/" + x), 
        ...fs.readdirSync("./system").filter((x) => x.includes(".")).map((x) => "./system/" + x), 
        ...fs.readdirSync("./system/commands").filter((x) => x.includes(".")).map((x) => "./system/commands/" + x), 
        ...fs.readdirSync("./system/message").filter((x) => x.includes(".")).map((x) => "./system/message/" + x), 
        ...fs.readdirSync("./system/libs").filter((x) => x.includes(".")).map((x) => "./system/libs/" + x), 
        ]
        if (!m.text.includes("./")) return
        if (m.text.includes("node_modules")) return m.reply("Sizenya gede banget kak 🙂")
        if (m.text.includes("connection")) return m.reply("Sizenya gede banget kak 🙂")
        if (!m.text.includes(".js") && !m.text.includes(".cjs") && !m.text.includes(".py") && !m.text.includes(".css") && !m.text.includes(".jpg") && !m.text.includes(".jpeg") && !m.text.includes(".png") && !m.text.includes(".mp3") && !m.text.includes(".mp4") && !m.text.includes(".webp") && !m.text.includes(".gif") && !m.text.includes(".html") && !m.text.includes(".replit") && !m.text.includes(".nix") && !m.text.includes(".md")) return m.reply("Itu bukan file kak")
        if (!data.includes(m.text)) return m.reply("File not found")                 
        setTimeout(() => {
        m.reply("Sending files.......")
        }, 2000)
        setTimeout(() => {
        sock.sendMessage(m.chat, { document: fs.readFileSync(`${m.text}`), mimetype: "application/bin", fileName: `${basename(m.text)}` }, { quoted: m })
        }, 4000)        
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})