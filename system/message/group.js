const fs = require("fs")
const chalk = require("chalk")
const moment = require("moment-timezone") 
const { decodeJid } = require("@libs/function")


module.exports = async(sock, anu) => {
try{

const from = anu.id
const botNumber = decodeJid(sock.user.id)
const sender = anu.participants[0]
const senderNumber = sender.split("@")[0]
const groupMetadata = await sock.groupMetadata(from)
const groupName = groupMetadata.subject  
const replyType = Object.keys(db.settings).includes(botNumber)? db.settings[botNumber].replytype : "mess1"
const isMe = sender.includes(botNumber)
const isWelcome = Object.keys(db.chats).includes(from)? db.chats[from].welcome : false
const isAdd = anu.action == "add" 
const isRemove = anu.action == "remove"
const isPromote = anu.action == "promote"
const isDemote = anu.action == "demote"






if (isWelcome && isAdd && !isMe && db.chats[from].setwelcome[anu.action] !== "") {
if (replyType == "mess1") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action], contextInfo: { forwardingScore: 999, isForwarded: true }})
} else if (replyType == "mess2") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action], contextInfo: { forwardingScore: 10, isForwarded: true }})
} else if (replyType == "mess3") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action] })
}
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ GROUP UPDATE ]"), `${senderNumber} telah bergabung ke group ${groupName}`)
} else if (isWelcome && isRemove && !isMe && db.chats[from].setwelcome[anu.action] !== "") {
if (replyType == "mess1") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action], contextInfo: { forwardingScore: 999, isForwarded: true }})
} else if (replyType == "mess2") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action], contextInfo: { forwardingScore: 10, isForwarded: true }})
} else if (replyType == "mess3") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action] })
}
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ GROUP UPDATE ]"), `${senderNumber} telah keluar dari group ${groupName}`)
} else if (isWelcome && isPromote && !isMe && db.chats[from].setwelcome[anu.action] !== "") {
if (replyType == "mess1") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action], contextInfo: { forwardingScore: 999, isForwarded: true }})
} else if (replyType == "mess2") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action], contextInfo: { forwardingScore: 10, isForwarded: true }})
} else if (replyType == "mess3") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action] })
}
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ GROUP UPDATE ]"), `${senderNumber} telah di promote`)
} else if (isWelcome && isDemote && !isMe && db.chats[from].setwelcome[anu.action] !== "") {
if (replyType == "mess1") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action], contextInfo: { forwardingScore: 999, isForwarded: true }})
} else if (replyType == "mess2") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action], contextInfo: { forwardingScore: 10, isForwarded: true }})
} else if (replyType == "mess3") {
sock.sendMessage(from, { text: db.chats[from].setwelcome[anu.action] })
}
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ GROUP UPDATE ]"), `${senderNumber} telah di demote`)
}







  
} catch (err) {
let e = String(err)
if (e.includes("this.isZero")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${err}`)
}}







let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	process.send("reset")
})