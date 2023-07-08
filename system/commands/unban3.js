const fs = require("fs") 
const chalk = require("chalk")
const axios = require("axios")
const util = require("util") 
module.exports = {
    commands: ["unban3"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
    if (!m.input) return m.reply("Reply/Tags/Input Nomer")
let ntah = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=122333444455555666666777777788888888999999999101010101010101010101111111111111111111111")
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
form.append("your_message", `Good day whatsApp team. My whatApp account has been burned permanently, please i plead with you unblock it, i cannot use another number again. I don’t know why it is burned but my friends re suggesting its because i use GB whatsApp, which i didn’t know it was wrong. My number is [ ${m.input.split("@")[0]} ]. Please whatsApp team, help me unblock my account. please i cannot use a new number as my current number is connected to slot of important things like vacancies.
Thank you`)
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
m.reply(`Unbanned Versi 3`)
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