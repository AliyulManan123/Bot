const fs = require("fs") 
const chalk = require("chalk")
const ms = require("parse-ms")
module.exports = {
    commands: ["listpremium","listprem"],
    cooldown: 13,
    isSewa: true,
    isPremium: true, 
    callback: async ({ m }) => {
        let teks = "\`\`\`「 LIST PREMIUM 」\`\`\`\n\n"
        let data = Object.keys(db.expired[m.botNumber].premium)
        for (let x of data) {
        let cekvip = db.expired[m.botNumber].premium[x].expired == "INFINITY"? "PERMANENT" : `${ms(db.expired[m.botNumber].premium[x].expired - Date.now()).days} days, ${ms(db.expired[m.botNumber].premium[x].expired - Date.now()).hours} hours, ${ms(db.expired[m.botNumber].premium[x].expired - Date.now()).minutes} minutes, ${ms(db.expired[m.botNumber].premium[x].expired - Date.now()).seconds} seconds`
        teks += ` *•* Nomer : @${x.split("@")[0]}\n *•* Date : ${db.expired[m.botNumber].premium[x].date}\n *•* Expired : ${cekvip}\n\n────────────────\n\n`
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