const fs = require("fs")
const chalk = require("chalk") 
const data = JSON.parse(fs.readFileSync("./settings.json"))
const config = {
    ownerNumber: {},
    ownerNumber: {},
    botName: {},
    linkGroup: {},
    logonya: {},
    thumbnailDok: {},
    thumbnailVid: {},
    limitAwal: {},
    ...(data || {})
}
setInterval(() => {
fs.writeFileSync("./settings.json", JSON.stringify(config, null, 2))
}, 30 * 1000)


module.exports = config


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    require(file)
})