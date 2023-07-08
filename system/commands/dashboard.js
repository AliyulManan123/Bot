const fs = require("fs") 
const chalk = require("chalk")
const { toFirstCase, runtime } = require("@libs/function")
module.exports = {
    commands: ["dashboard"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let succes = 0
        let failed = 0
        for (let x of Object.keys(db.dashboard)) {
        succes += db.dashboard[x].succes
        failed += db.dashboard[x].failed
        }
        let teks = "*Dashboard*\n\n"
        teks += `*Runtime* : ${runtime(process.uptime())}\n\n`
        teks += "*Commands Today*\n"
        for (let x of Object.keys(db.dashboard)) {
        teks += `*•* ${toFirstCase(x)} : ${Number(db.dashboard[x].succes) + Number(db.dashboard[x].failed)}\n`
        }
        teks += `\n*Total* : ${Object.keys(db.dashboard).length}\n\n`
        teks += "*Command Status*\n"
        teks += ` *•* Succes : ${succes}\n`
        teks += ` *•* Failed : ${failed}\n\n`
        teks += "*Command Failed*\n"
        for (let x of Object.keys(db.dashboard)) {
        teks += `${db.dashboard[x].failed > 0? " *•* " + toFirstCase(x) + " : " + Number(db.dashboard[x].failed) + "\n" : ""}`
        }
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