const fs = require("fs") 
const chalk = require("chalk")
const axios = require("axios")
const { getBuffer } = require("@libs/function")
module.exports = {
    commands: ["tiktokmp3","ttmp3","tiktokaudio"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/",
    isSewa: true,
    isLimit: true,
    callback: async ({ sock, m }) => {
        if (m.text.includes("https://vt.tiktok.com/") && m.text.split(".com/")[0] == "https://vt.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.args[0]
        } else if (m.text.includes("https://vm.tiktok.com/") && m.text.split(".com/")[0] == "https://vm.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.args[0]
        } else if (m.text.includes("https://www.tiktok.com/") && m.text.split(".com/")[0] == "https://www.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.args[0]
        } else return m.reply("Error link")
        let { data } = await axios.get("https://api.tiklydown.me/api/download?url=" + link)
        let buffer = await getBuffer(data.music.play_url)
        sock.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mp4" }, { quoted: m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})