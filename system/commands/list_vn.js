const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listvn"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "┌──⭓「 *LIST VN* 」\n│\n"
        let data = fs.readdirSync("./temp").filter((x) => x.includes(".mp3")).map((x) => x.split(".mp3")[0])
        for (let x of data) {
        teks += `│⭔ ${x}\n`
        }
        teks += `│\n└────────────⭓\n\n*Total ada : ${data.length}*`
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