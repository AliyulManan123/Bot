const fs = require("fs") 
const chalk = require("chalk")
const { sleep } = require("@libs/function")
module.exports = {
    commands: ["xospc"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
    const well = { 
key: {
fromMe: [], 
participant: "0@s.whatsapp.net",  remoteJid: ""
},

'message': {
 "stickerMessage": {
"url": "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
"fileSha256": "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
"fileEncSha256": "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
"mediaKey": "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
"mimetype": "image/webp",
"height": 40,
"width": 40,
"directPath": "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
"fileLength": "99999999",
"mediaKeyTimestamp": "16572901099967",
        'isAnimated': []
}}}
if (!m.input) return m.reply("Reply/Tags/Input Nomer")
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
sock.sendMessage(m.input, {text: 'Radit Is Here!!'}, {quoted:well})
await sleep(2000)
m.reply(`Succes!!`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})