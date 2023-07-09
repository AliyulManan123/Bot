const fs = require("fs") 
const chalk = require("chalk")
const axios = require("axios")
const moment = require("moment-timezone")
const cheerio = require('cheerio')
const path = require('path')
module.exports = {
    commands: ["mediafire"],
    isLimit: true,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://mediafire.com/....",
    callback: async ({ sock, m }) => {
        let v_plugina = 1
        if(m.baseversi > v_plugina) return m.reply("Silahkan Update Base Whatsapp Anda Agar Dapat Memakai Fitur Ini.");

	    const res = await axios.get(m.args[0]) 
    	const $ = cheerio.load(res.data)
    	const hasil = []
    	const link = $('a#downloadButton').attr('href')
    	const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace(/\n|\s/g, '')
    	const sizeN = parseFloat(size.replace(/[^0-9.,]/g, ''))
    	const seplit = link.split('/')
    	const name = seplit[5]
    	const ext = path.extname(name).slice(1);
    	//hasil.push({ status: 200, author: '@this.ilham_', name, size, link, ext, sizeN })
    	
    	sock.sendMessage(m.chat, { document: { url: link }, mimetype: ext, fileName: name }, { quoted: m })
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})