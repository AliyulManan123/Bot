const fs = require("fs") 
const chalk = require("chalk")
const axios = require("axios")
const util = require("util") 
module.exports = {
    commands: ["unban2"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
    if (!m.input) return m.reply("Reply/Tags/Input Nomer")
let ntah = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=12233344445555566666677777778888888899999999910101010101010101010")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "+")
form.append("phone_number", `+${m.input.split("@")[0]}`)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Aloha WhatsApp, ua ʻaihue ʻia kaʻu helu e ka mea hacker, e ʻoluʻolu e wehe hou iā ia [${m.input.split("@")[0]}]`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19531.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1007735016")
form.append("__comment_req", "0")

let res = await axios({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
m.reply(`Unbanned Versi 2`)
let payload = String(res.data)
if (payload.includes(`"payload":true`)) {
m.reply(`Wait 1-24 Jam!!`)
} else if (payload.includes(`"payload":false`)) {
m.reply(`Coba Lagi Nanti!!`)
} else m.reply(util.format(res.data))
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})