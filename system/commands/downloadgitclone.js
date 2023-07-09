const fs = require("fs") 
const chalk = require("chalk")
const axios = require('axios')
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i

module.exports = {
    commands: ["gitclone"],
    isLimit: true,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://github.com/....",
    callback: async ({ sock, m }) => {
        let v_plugina = 1
        if(m.baseversi > v_plugina) return m.reply("Silahkan Update Base Whatsapp Anda Agar Dapat Memakai Fitur Ini.");

        let [_, user, repo] = m.args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
        let url = `https://api.github.com/repos/${user}/${repo}/zipball`
        axios.head(url).then(response => {
            const filename = response.headers['content-disposition'].match(/attachment; filename=(.*)/)[1]
            sock.sendMessage(m.chat, { document: { url: url }, mimetype: "application/zip", fileName: filename }, { quoted: m })
        }).catch(error => {
            console.error(error)
        });
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})



