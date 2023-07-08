const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delstick"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<text>",
    example: "{prefix}{command} oii",
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (!fs.readdirSync("./temp").filter((x) => x.includes(".webp")).map((x) => x.split(".webp")[0]).includes(m.text)) return m.reply("Nama tersebut tidak ada kak")
        fs.unlinkSync(`./temp/${m.text}.webp`)
        await m.reply("Success delete sticker " + m.text)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})