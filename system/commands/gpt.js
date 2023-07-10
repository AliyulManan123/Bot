const fs = require("fs") 
const axios = require("axios")
const chalk = require("chalk")
const key = "shanbot"

module.exports = {
    commands: ["ai", "gpt", "gpt35"],
    cooldown: 13,
    expectedArgs: "<text>",
    example: "{prefix}{command} Halo AI, Apa Kabar",
    isLimit: true,
    callback: async ({ sock, m }) => {
        try{
	        const res = await axios.get(`https://xzn.wtf/api/openai?text=${m.text}&apikey=${key}`)
	        m.reply(res.data.result)
	    }catch(e){
            m.reply("error")
        }
    }
}



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})