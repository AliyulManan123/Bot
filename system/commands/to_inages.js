const util = require("util") 
const fs = require("fs") 
const chalk = require("chalk")
const { randomNomor } = require("@libs/function")
module.exports = {
    commands: ["toimg"],
    cooldown: 13,
    isSewa: true,
    isWait: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ sock, m }) => {
        const id = randomNomor(100000)
        const media = await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + id)
        fs.rename(media, `./temp/${id}.jpg`, function(err) {
        if (err) return m.reply(util.format(err)) 
        sock.sendMessage(m.chat, { image: fs.readFileSync(`./temp/${id}.jpg`) }, { quoted: m })
        })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})