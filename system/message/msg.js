const { pickRandom, calender } = require("@libs/function")
const { exec } = require("child_process")
const { getContentType } = require("baileys") 
const commands = require("@libs/command")
const util = require("util") 
const toMs = require("ms")
const fs = require("fs")
const axios = require("axios")
const chalk = require("chalk") 
const i18n = require("i18n")
const Message = async(sock, m, store) => {
try{
//=========================[ SECURITY GROUP ]=========================\\
const groupMetadata = m.isGroup? await sock.groupMetadata(m.chat).catch(e => {}) : {}
const groupName = Object.keys(groupMetadata).length > 0? groupMetadata.subject : ""
const participants = Object.keys(groupMetadata).length > 0? groupMetadata.participants : ""
const groupMembers = Object.keys(groupMetadata).length > 0? groupMetadata.participants.map((x) => x.id) : ""
const groupAdmins = Object.keys(groupMetadata).length > 0? participants.filter((x) => x.admin !== null).map((x) => x.id) : ""
const groupOwner = Object.keys(groupMetadata).length > 0? groupMetadata.owner : ""
const isBotGroupAdmins = Object.keys(groupMetadata).length > 0? groupAdmins.includes(m.botNumber) : false
const isGroupAdmins = Object.keys(groupMetadata).length > 0? groupAdmins.includes(m.sender) : false
//=========================[ MESSAGE TYPE ]=========================\\
const isText = ["extendedTextMessage","conversation"].includes(m.type)
const isImage = ["imageMessage"].includes(m.type)
const isVideo = ["videoMessage"].includes(m.type)
const isSticker = ["stickerMessage"].includes(m.type)
const isAudio = ["audioMessage"].includes(m.type)
const isViewOnce = ["viewOnceMessageV2","viewOnceMessage"].includes(m.type)
const isContact = ["contactMessage","contactsArrayMessage"].includes(m.type)
const isLocation = ["locationMessage"].includes(m.type)
const isDocument = ["documentMessage","documentWithCaptionMessage"].includes(m.type)
const isAllMedia = ["imageMessage","videoMessage","stickerMessage","audioMessage","viewOnceMessageV2","viewOnceMessage","contactMessage","contactsArrayMessage","locationMessage","documentMessage","documentWithCaptionMessage"].includes(m.type)
const isQuotedText = m.quoted? ["extendedTextMessage","conversation"].includes(m.quoted.type) : false
const isQuotedImage = m.quoted? ["imageMessage"].includes(m.quoted.type) : false
const isQuotedVideo = m.quoted? ["videoMessage"].includes(m.quoted.type) : false
const isQuotedSticker = m.quoted? ["stickerMessage"].includes(m.quoted.type) : false
const isQuotedAudio = m.quoted? ["audioMessage"].includes(m.quoted.type) : false
const isQuotedViewOnce = m.quoted? ["viewOnceMessageV2","viewOnceMessage"].includes(m.quoted.type) : false
const isQuotedContact = m.quoted? ["contactMessage","contactsArrayMessage"].includes(m.quoted.type) : false
const isQuotedLocation = m.quoted? ["locationMessage"].includes(m.quoted.type) : false
const isQuotedDocument = m.quoted? ["documentMessage","documentWithCaptionMessage"].includes(m.quoted.type) : false
const isQuotedAllMedia = m.quoted? ["imageMessage","videoMessage","stickerMessage","audioMessage","viewOnceMessageV2","viewOnceMessage","contactMessage","contactsArrayMessage","locationMessage","documentMessage","documentWithCaptionMessage"].includes(m.quoted.type) : false
//=========================[ FUNCTION PREFIX ]=========================\\
if (m.setPrefix == "yes") {
var thePrefix = "YES-PREFIX"
var prefix = /^#.!?|\\^/.test(m.body)? m.body.match(/^#.!?|\\^/gi) : "."
var isCmd = m.body.startsWith(prefix)
var command = (isSticker && Object.keys(db.listcmd).includes(m.message.stickerMessage.fileSha256.toString("base64")))? db.listcmd[m.message.stickerMessage.fileSha256.toString("base64")].command : isCmd? m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : ""
var cmdOptions = commands.get(command) || {}
} else if (m.setPrefix == "noo") {
var thePrefix = "NOO-PREFIX"
var prefix = ""
var isCmd = m.body.startsWith(prefix)
var command = (isSticker && Object.keys(db.listcmd).includes(m.message.stickerMessage.fileSha256.toString("base64")))? db.listcmd[m.message.stickerMessage.fileSha256.toString("base64")].command : m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
var cmdOptions = commands.get(command) || {}
} else if (m.setPrefix == "all") {
var thePrefix = "ALL-PREFIX"
var prefix = /^#.!?|\\^/.test(m.body)? m.body.match(/^#.!?|\\^/gi) : "."
var isCmd = m.body.startsWith(prefix)
var command = (isSticker && Object.keys(db.listcmd).includes(m.message.stickerMessage.fileSha256.toString("base64")))? db.listcmd[m.message.stickerMessage.fileSha256.toString("base64")].command : m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
var cmdOptions = commands.get(command) || {}
}
//=========================[ COMMAND LOGS ]=========================\\
const command_log = [chalk.whiteBright("├"), chalk.keyword("aqua")(`[ ${m.isGroup ? "GROUP" : "PRIVATE"} ]`), m.body.substr(0, 50).replace(/\n/g, ""), chalk.greenBright("from"), chalk.yellow(m.pushName)]
if (m.isGroup) {
command_log.push(chalk.greenBright("in"))
command_log.push(chalk.yellow(groupName))
}
console.log(...command_log)
//=========================[ PUBLIK/SELF ]=========================\\
if (m.mode == "self") {
if (!m.isOwner && !m.key.fromMe) return
} else if (m.mode == "group") {
if (!m.isGroup && !m.isOwner && !m.key.fromMe) return
} else if (m.mode == "private") {
if (m.isGroup && !m.isSewa) return
}  
//=========================[ BANCHAT ]=========================\\
if (m.isBanChat) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) return
}
//=========================[ ONLY MESSAGE ]=========================\\
const onlyOwner = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.ga_mau"), i18n.__("audioPack.lu_siapa_anjir"), i18n.__("audioPack.ga_boleh")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.owner") }, { quoted: m })
} else {
m.reply(util.format(i18n.__("message.owner_only")))
}}
const onlyAdmin = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.ga_mau"), i18n.__("audioPack.lu_siapa_anjir"), i18n.__("audioPack.ga_boleh")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.hanya_admin") }, { quoted: m })
} else {
m.reply(util.format(i18n.__("message.admin_only")))
}}
const onlyBadmin = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.goblok"), i18n.__("audioPack.baka")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.jadiin_admin") }, { quoted: m })
} else {
m.reply(util.format(i18n.__("message.bot_admin_only")))
}}
const onlyGroup = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.goblok"), i18n.__("audioPack.baka")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else { 
m.reply(util.format(i18n.__("message.group_only")))
}}
const onlyPrivate = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.goblok"), i18n.__("audioPack.baka")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else {
m.reply(util.format(i18n.__("message.private_only")))
}}
const onlyWait = async() => {
if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.oke_tunggu") }, { quoted: m })
} else {
m.reply(util.format(i18n.__("wait")))
}}
//=========================[ GET SUCCESS COMMAND ]=========================\\
const cmdSuccess = async(cmd, type = "") => {
if (Object.keys(db.listerror).includes(cmd)) delete db.listerror[cmd]
if (!Object.keys(db.allcommand).includes(cmd) && type == "case") {
db.allcommand[cmd] = { tempFile: "case" }
}
if (!m.key.fromMe && !m.isPremium && m.autoLevel) {
db.users[m.sender].xp += 1
}
if (Object.keys(db.dashboard).includes(cmd)) {
db.dashboard[cmd].succes += 1
} else {
db.dashboard[cmd] = { succes: 1, failed: 0 }
}}
//=========================[ GET FAILED COMMAND ]=========================\\
const cmdFailed = async(cmd, err, type = "") => {
if (!Object.keys(db.allcommand).includes(cmd) && type == "case") {
db.allcommand[cmd] = { tempFile: "case" }
}
if (Object.keys(db.dashboard).includes(cmd)) {
db.dashboard[cmd].failed += 1
} else {
db.dashboard[cmd] = { succes: 0, failed: 1 }
}
m.reply("\`\`\`「  SYSTEM ERROR  」\`\`\`\n\n" + util.format(err)) 
if (!Object.keys(db.listerror).includes(cmd)) db.listerror[cmd] = { error: err.message }
if (m.autoBlockCmd && !db.blockcmd.includes(cmd)) { db.blockcmd.push(cmd) }
if (m.autoReport) {
if (isImage) {
var media = "Image ✅"
} else if (isVideo) {
var media = "Video ✅"
} else if (isDocument) {
var media = "Document ✅"
} else if (isViewOnce) {
var media = "View Once ✅"
} else if (isQuotedImage) {
var media = "Reply Image ✅"
} else if (isQuotedVideo) {
var media = "Reply Video ✅"
} else if (isQuotedSticker) {
var media = "Reply Sticker ✅"
} else if (isQuotedAudio) {
var media = "Reply Audio ✅"
} else if (isQuotedViewOnce) {
var media = "Reply View Once ✅"
} else if (isQuotedContact) {
var media = "Reply Contact ✅"
} else if (isQuotedLocation) {
var media = "Reply Location ✅"
} else if (isQuotedDocument) {
var media = "Reply Document ✅"
} else {
var media = "No Media ❌"
}
if (m.isGroup && isBotGroupAdmins) {
let code = await sock.groupInviteCode(m.chat)
var linkgc = "https://chat.whatsapp.com/" + code
} else if (m.isGroup && !isBotGroupAdmins) {
var linkgc = "Botz Is Not Admin"
} else {
var linkgc = "Botz Is Not In The Group"
}
let teks = "\`\`\`「  SYSTEM ERROR  」\`\`\`\n\n"
teks += `👤 Nama : ${m.pushName}\n`
teks += `📳 Nomer : wa.me/${m.senderNumber}\n`
teks += `🔖 Command : ${prefix + command}\n`
teks += `⏰ Time : ${m.timeWib}\n`
teks += `📝 Example : ${m.body}\n`
teks += `🧩 Media : ${media}\n`
teks += `💠 Group : ${m.isGroup? groupName : "Di private chat"}\n`
teks += `🌐 Link Group : ${linkgc}\n`
teks += `📢 Info Laporan : ${util.format(err)}`
if (m.chat !== (m.ownerNumber + "@s.whatsapp.net")) {
m.reply(teks, m.ownerNumber + "@s.whatsapp.net")
}}}
//=========================[ FUNCTION ADD SEWA BY CODE ]=========================\\
if (m.isGroup && isText && Object.keys(db.createcode).includes(m.budy)) {
let expired = db.createcode[m.budy].expired.includes("years")? "years" : db.createcode[m.budy].expired.includes("months")? "months" : db.createcode[m.budy].expired.includes("weeks")? "weeks" : db.createcode[m.budy].expired.includes("days")? "days" : db.createcode[m.budy].expired.includes("hours")? "hours" : db.createcode[m.budy].expired.includes("minutes")? "minutes" : db.createcode[m.budy].expired.includes("seconds")? "seconds" : "INFINITY"
if (expired == "INFINITY") {
if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat].expired = "INFINITY"
} else {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat] = { date: calender, expired: "INFINITY" }
}
m.reply(`Success add sewa ${groupName}`)
setTimeout(() => {
delete db.createcode[m.budy]
}, 3000)
} else if (expired == "months") {
if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat].expired += Number(toMs(Number(db.createcode[m.budy].expired.split(expired)[0] * 30) + "days")) 
} else {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat] = { date: calender, expired: Date.now() + toMs(Number(db.createcode[m.budy].expired.split(expired)[0] * 30) + "days") }
}
m.reply(`Success add sewa ${groupName} ${db.createcode[m.budy].expired.split(expired)[0]} ${expired}`)
setTimeout(() => {
delete db.createcode[m.budy]
}, 3000)
} else if (expired !== "months" || expired !== "INFINITY") {
if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat].expired += Number(toMs(db.createcode[m.budy].expired))
} else {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat] = { date: calender, expired: Date.now() + Number(toMs(db.createcode[m.budy].expired)) }
}
m.reply(`Success add sewa ${groupName} ${db.createcode[m.budy].expired.split(expired)[0]} ${expired}`)
setTimeout(() => {
delete db.createcode[m.budy]
}, 3000)
}}
//=========================[ FUNCTION GET COMMAND ]=========================\\
if (Object.keys(db.database).includes(m.sender) && isText) {
if (db.database[m.sender].command == "addowner") {
if (db.database[m.sender].expired == "" && !isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= 8) {
let expired = Number(m.budy) <= 1? "permanent" : Number(m.budy) <= 2? "years" : Number(m.budy) <= 3? "months" : Number(m.budy) <= 4? "weeks" : Number(m.budy) <= 5? "days" : Number(m.budy) <= 6? "hours" : Number(m.budy) <= 7? "minutes" : "seconds"
db.database[m.sender].expired = expired
if (expired !== "permanent") {
m.reply(`Berapa ${expired}?`) 
} else if (expired == "permanent") {
m.reply(`Success add owner @${db.database[m.sender].id.split("@")[0]}`)
if (Object.keys(db.expired[m.botNumber].owner).includes(db.database[m.sender].id)) {
delete db.expired[m.botNumber].owner[db.database[m.sender].id]
}
db.expired[m.botNumber].vip[db.database[m.sender].id] = { date: calender, expired: "INFINITY" }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].expired !== "" && !isNaN(m.budy) && Number(m.budy) > 0) {
if (db.database[m.sender].expired == "years" || db.database[m.sender].expired == "weeks" || db.database[m.sender].expired == "days" || db.database[m.sender].expired == "hours" || db.database[m.sender].expired == "minutes" || db.database[m.sender].expired == "seconds") {
m.reply(`Success add owner @${db.database[m.sender].id.split("@")[0]} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].owner).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].owner[db.database[m.sender].id].expired += Number(toMs(`${m.budy}${db.database[m.sender].expired}`))
} else db.expired[m.botNumber].owner[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(`${m.budy}${db.database[m.sender].expired}`) }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
} else if (db.database[m.sender].expired == "months") {
m.reply(`Success add owner @${db.database[m.sender].id.split("@")[0]} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].owner).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].owner[db.database[m.sender].id].expired += Number(toMs(Number(m.budy * 30) + "days"))
} else db.expired[m.botNumber].owner[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(Number(m.budy * 30) + "days") }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}}
} else if (db.database[m.sender].command == "addpremium") {
if (db.database[m.sender].expired == "" && !isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= 8) {
let expired = Number(m.budy) <= 1? "permanent" : Number(m.budy) <= 2? "years" : Number(m.budy) <= 3? "months" : Number(m.budy) <= 4? "weeks" : Number(m.budy) <= 5? "days" : Number(m.budy) <= 6? "hours" : Number(m.budy) <= 7? "minutes" : "seconds"
db.database[m.sender].expired = expired
if (expired !== "permanent") {
m.reply(`Berapa ${expired}?`) 
} else if (expired == "permanent") {
m.reply(`Success add premium @${db.database[m.sender].id.split("@")[0]}`)
if (Object.keys(db.expired[m.botNumber].premium).includes(db.database[m.sender].id) && db.expired[m.botNumber].premium[db.database[m.sender].id].expired !== "INFINITY") {
db.expired[m.botNumber].premium[db.database[m.sender].id].expired = "INFINITY"
} else if (!Object.keys(db.expired[m.botNumber].premium).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].premium[db.database[m.sender].id] = { date: calender, expired: "INFINITY" }
}
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].expired !== "" && !isNaN(m.budy) && Number(m.budy) > 0) {
if (db.database[m.sender].expired == "years" || db.database[m.sender].expired == "weeks" || db.database[m.sender].expired == "days" || db.database[m.sender].expired == "hours" || db.database[m.sender].expired == "minutes" || db.database[m.sender].expired == "seconds") {
m.reply(`Success add premium @${db.database[m.sender].id.split("@")[0]} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].premium).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].premium[db.database[m.sender].id].expired += Number(toMs(`${m.budy}${db.database[m.sender].expired}`))
} else db.expired[m.botNumber].premium[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(`${m.budy}${db.database[m.sender].expired}`) }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
} else if (db.database[m.sender].expired == "months") {
m.reply(`Success add premium @${db.database[m.sender].id.split("@")[0]} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].premium).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].premium[db.database[m.sender].id].expired += Number(toMs(Number(m.budy * 30) + "days"))
} else db.expired[m.botNumber].premium[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(Number(m.budy * 30) + "days") }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}}
} else if (db.database[m.sender].command == "addsewa") {
if (db.database[m.sender].expired == "" && !isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= 8) {
let expired = Number(m.budy) <= 1? "permanent" : Number(m.budy) <= 2? "years" : Number(m.budy) <= 3? "months" : Number(m.budy) <= 4? "weeks" : Number(m.budy) <= 5? "days" : Number(m.budy) <= 6? "hours" : Number(m.budy) <= 7? "minutes" : "seconds"
db.database[m.sender].expired = expired
if (expired !== "permanent") {
m.reply(`Berapa ${expired}?`) 
} else if (expired == "permanent") {
if (db.database[m.sender].id !== "") {
let groupMetadata2 = await sock.groupMetadata(db.database[m.sender].id)
m.reply(`Success add sewa ${groupMetadata2.subject}`)
if (Object.keys(db.expired[m.botNumber].sewa).includes(db.database[m.sender].id) && db.expired[m.botNumber].sewa[db.database[m.sender].id].expired !== "INFINITY") {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id].expired = "INFINITY"
} else if (!Object.keys(db.expired[m.botNumber].sewa).includes(db.database[m.sender].id)) {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id] = { date: calender, expired: "INFINITY" }
}} else {
db.createcode[m.key.id] = { expired: "INFINITY" }
m.reply(`${m.key.id}`) 
}
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].expired !== "" && !isNaN(m.budy) && Number(m.budy) > 0) {
if (db.database[m.sender].expired == "years" || db.database[m.sender].expired == "weeks" || db.database[m.sender].expired == "days" || db.database[m.sender].expired == "hours" || db.database[m.sender].expired == "minutes" || db.database[m.sender].expired == "seconds") {
if (db.database[m.sender].id !== "") {
let groupMetadata2 = await sock.groupMetadata(db.database[m.sender].id)
m.reply(`Success add sewa ${groupMetadata2.subject} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].sewa).includes(db.database[m.sender].id)) {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id].expired += Number(toMs(`${m.budy}${db.database[m.sender].expired}`))
} else {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(`${m.budy}${db.database[m.sender].expired}`) }
}} else {
db.createcode[m.key.id] = { expired: `${m.budy}${db.database[m.sender].expired}` }
m.reply(`${m.key.id}`)
}
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
} else if (db.database[m.sender].expired == "months") {
if (db.database[m.sender].id !== "") {
let groupMetadata2 = await sock.groupMetadata(db.database[m.sender].id)
m.reply(`Success add sewa ${groupMetadata2.subject} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].sewa).includes(db.database[m.sender].id)) {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id].expired += Number(toMs(Number(m.budy * 30) + "days"))
} else {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(Number(m.budy * 30) + "days") }
}} else {
db.createcode[m.key.id] = { expired: `${m.budy}${db.database[m.sender].expired}` }
m.reply(`${m.key.id}`)
}
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}}
} else if (db.database[m.sender].command == "addlimit") {
if (!isNaN(m.budy) && Number(m.budy) > 0) {
db.users[db.database[m.sender].id].limit += Number(m.budy)
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].command == "addbalance") {
if (!isNaN(m.budy) && Number(m.budy) > 0) {
db.users[db.database[m.sender].id].balance += Number(m.budy)
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].command == "dellimit") {
if (!isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= db.users[db.database[m.sender].id].limit) {
m.reply(`Success add limit ${Number(m.budy)} ke @${db.database[m.sender].id.split("@")[0]}`)
db.users[db.database[m.sender].id].limit -= Number(m.budy)
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].command == "delbalance") {
if (!isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= db.users[db.database[m.sender].id].limit) {
m.reply(`Success add balance ${Number(m.budy)} ke @${db.database[m.sender].id.split("@")[0]}`)
db.users[db.database[m.sender].id].balance -= Number(m.budy)
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}}}
//=========================[ FUNCTION ANTI SPAM ]=========================\\
if (m.antiSpam) {
if (Object.keys(db.antispam).includes(m.sender)) {
if (db.antispam[m.sender].hit < 5) {
db.antispam[m.sender].hit += 1
if (m.autoVn) {
return sock.sendMessage(m.chat, { audio: i18n.__("audioPack.jangan_spam_ntar_gua_ewe"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
return sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.jangan_spam") }, { quoted: m })
} else {
return m.reply("Jangan spam 😡")
}} else {
db.banned[m.sender] = {
date: calender,
reason: "Spam Bot"
}
return m.reply("Maaf kamu telah terbanned karna melakukan spam")
}} else if (!m.isPremium && !Object.keys(db.antispam).includes(m.sender)) {
db.antispam[m.sender] = {
hit: 1, 
expired: Date.now() + toMs("15second")
}
}}
//=========================[ FUNCTION AUTO RESPON GROUP ]=========================\\
if ((m.quoted? m.quoted.sender : m.mentionedJid[0]) == m.botNumber && m.isAutoResponGroup && Object.keys(cmdOptions).length == 0 && isText) {
try{
let jawab = ["Afa iyah 🗿","Oh","Aku ga ngerti om 🐦","Boong","🗿","🐦","Oh gitu 🐦","Apa","Sok asik","Lu siapa?","Saha","Gaje bet lu","Maju sink tai"]
let teks1 = pickRandom(jawab)
let teks2 = m.budy
let hasil = [`${teks1}`, `${teks2}`]
let random = pickRandom(hasil)
let { data } = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURI(m.budy)}&lc=id`)
let sami = data.success
if (sami.startsWith("Aku tidak mengerti")) {
var teksnya = random
} else {
var teksnya = sami
}
m.reply(teksnya)
} catch (e) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
}}
//=========================[ FUNCTION AUTO STICKER ]=========================\\
if (m.autoSticker && isImage) {
const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
const media = await sock.downloadAndSaveMediaMessage(m, "./temp/" + id)
fs.rename(media, `./temp/${id}.webp`, function(err) {
if (err) return m.reply(util.format(err)) 
sock.sendMessage(m.chat, { sticker: fs.readFileSync(`./temp/${id}.webp`) }, { quoted: m })
})
} else if (isQuotedSticker && m.autoSticker && m.quoted.sender == m.botNumber) {
const listName = fs.readdirSync("./temp/").filter((x) => x.includes(".webp"))
if (listName.length > 0) {
const namastc = pickRandom(listName)
sock.sendMessage(m.chat, { sticker: fs.readFileSync("./temp/" + namastc) }, { quoted: m })
}}
//=========================[ FUNCTION AUTO REACT ]=========================\\
for (const x of i18n.__("kata_cek")) {
if (m.isAutoReactGroup && m.budy.toLowerCase().includes(x) && !isCmd) {
sock.sendMessage(m.chat, { react: { text: pickRandom(i18n.__("allemoji")), key: m.key } })
}}
//=========================[ FUNCTION ANTI DELETE ]=========================\\
if (m.isAntiDelete && Object.keys(db.message).includes(m.sender) && m.type == "protocolMessage") {
if (Object.keys(db.message).includes(m.sender) && db.message[m.sender].key.id == m.message[m.type].key.id) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
let message = db.message[m.sender].message
let type = (!["senderKeyDistributionMessage","messageContextInfo"].includes(Object.keys(message)[0]) && Object.keys(message)[0]) || (Object.keys(message).length >= 3 && Object.keys(message)[1] !== "messageContextInfo" && Object.keys(message)[1]) || Object.keys(message)[Object.keys(message).length - 1]
let teks = "\`\`\`「  PESAN DITARIK TERDETEKSI  」\`\`\`\n\n"
teks += `› Dari : @${m.senderNumber}\n`
teks += `› Waktu : ${m.timeWib}\n`
teks += `› Tanggal : ${calender}\n`
teks += `› Type : ${type}`
m.reply(teks)
setTimeout(() => {
sock.copyNForward(m.chat, db.message[m.sender])
}, 2000)
}}}
//=========================[ FUNCTION ANTI VIEW ONCE ]=========================\\
if (m.isAntiViewOnce && isViewOnce && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
const media = await sock.downloadMediaMessage(m) 
let teks = "\`\`\`「  PESAN SEKALI TERBUKA TERDETEKSI  」\`\`\`\n\n"
teks += `› Dari : @${m.senderNumber}\n`
teks += `› Waktu : ${m.timeWib}\n`
teks += `› Tanggal : ${calender}\n`
teks += `› Caption : ${m.body}\n`
teks += `› Type : ${getContentType(m.message)}`
if (getContentType(m.message) == "videoMessage") sock.sendMessage(m.chat, { video: media, caption: teks }, { quoted: m })
if (getContentType(m.message) == "imageMessage") sock.sendMessage(m.chat, { image: media, caption: teks }, { quoted: m })
}}
//=========================[ FUNCTION ANTI LINK GROUP ]=========================\\
if (m.isAntiLink && isBotGroupAdmins) {
if (m.budy.includes("https://chat.whatsapp.com/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
let linkgc = await sock.groupInviteCode(m.chat)
if (m.budy.includes(`${linkgc}`)) return 
m.reply("\`\`\`「  LINK GROUP DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI LINK YOUTUBE ]=========================\\
if (m.isAntiLinkYoutube && isBotGroupAdmins) {
if (m.budy.includes("youtube.com/") && Object.keys(cmdOptions).length == 0 || m.budy.includes("https://youtu.be/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK YOUTUBE DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI LINK FACEBOOK ]=========================\\
if (m.isAntiLinkFacebook && isBotGroupAdmins) {
if (m.budy.includes("facebook.com/") && Object.keys(cmdOptions).length == 0 || m.budy.includes("https://fb.watch/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK FACEBOOK DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI LINK INSTAGRAM ]=========================\\
if (m.isAntiLinkInstagram && isBotGroupAdmins) {
if (m.budy.includes("instagram.com/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK INSTAGRAM DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI LINK TELEGRAM ]=========================\\
if (m.isAntiLinkTelegram && isBotGroupAdmins) {
if (m.budy.includes("https://t.me/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK TELEGRAM DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI LINK WA ]=========================\\
if (m.isAntiLinkWhatsapp && isBotGroupAdmins) {
if (m.budy.includes("wa.me/") && Object.keys(cmdOptions).length == 0 || m.budy.includes("Wa.me/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK WHATSAPP DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI LINK TIKTOK ]=========================\\
if (m.isAntiLinkTiktok && isBotGroupAdmins) {
if (m.budy.includes("tiktok.com/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK TIKTOK DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI LINK TWITTER ]=========================\\
if (m.isAntiLinkTwitter && isBotGroupAdmins) {
if (m.budy.includes("twitter.com/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK TWITTER DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI ASING ]=========================\\
if (m.isAntiAsing && isBotGroupAdmins) {
if (!m.sender.startsWith("62")) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  NOMER ASING DETECTED  」\`\`\`")
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}}}
//=========================[ FUNCTION ANTI BOTZ ]=========================\\
if (m.isAntiBotz && isBotGroupAdmins) {
if (m.isBaileys && !m.key.fromMe) {
if (!m.isOwner && !isGroupAdmins) {
m.reply("\`\`\`「  BOTZ DETECTED  」\`\`\`")
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}}}
//=========================[ FUNCTION ANTI TOXIC ]=========================\\
if (m.isAntiToxic && isBotGroupAdmins) {
for (const x of i18n.__("kata_toxic")) {
if (m.budy.toLowerCase().includes(x)) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  TOXIC DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}}
//=========================[ FUNCTION ANTI SANGE ]=========================\\
if (m.isAntiSange && isBotGroupAdmins) {
if (i18n.__("kata_dosa").includes(m.budy.toLowerCase())) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  SANGE DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ FUNCTION ANTI VIRTEX ]=========================\\
if (m.isAntiVirtex && isBotGroupAdmins && m.budy.length > 20000) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  VIRTEX DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}
//=========================[ FUNCTION ANTI TAG ]=========================\\
if (m.isAntiTag && isBotGroupAdmins) {
if (m.isMention && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  TAG MEMBER DETECTED  」\`\`\`")
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
}}}
//=========================[ DETECT AFK USERS ]=========================\\
if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].afk_group.includes(m.quoted? m.quoted.sender : m.mentionedJid[0]) && !isCmd) {
m.reply("Jangan ganggu dia sedang afk")        
}        
if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].afk_group.includes(m.sender)) {
db.chats[m.chat].afk_group.splice(db.chats[m.chat].afk_group.indexOf(m.sender, 1))
m.reply("Kamu telah kembali dari afk")
}
//=========================[ AUTO RESPON VOICE MESSAGE ]=========================\\
if (isText) {
const listName = fs.readdirSync("./temp").filter((x) => x.includes(".mp3")).map((x) => x.split(".mp3")[0])
if (listName.includes(m.budy)) {
sock.sendMessage(m.chat, { audio: fs.readFileSync(`./temp/${m.budy}.mp3`), mimetype: "audio/mp4", ptt: true }, { quoted: m })
}}
//=========================[ AUTO RESPON STICKER MESSAGE ]=========================\\
if (isText) {
const listName = fs.readdirSync("./temp").filter((x) => !x.includes(".webp")).map((x) => x.split(".webp")[0])
if (listName.includes(m.budy)) {
sock.sendMessage(m.chat, { sticker: fs.readFileSync(`./temp/${m.budy}.webp`) }, { quoted: m })
}}
//=========================[ AUTO RESPON MESSAGE ]=========================\\
if (!m.isGroup && Object.keys(cmdOptions).length == 0 && !m.key.fromMe && m.autoRespon && isText) {
try{
let randomText = ["Ara Ara Kak","Iy Kak","Ada apa kak","🗿","🐦","Afa iy","Apa","Oh","Ok"]
let randomDesah = ["G mau kak","Ish kakak sange 😒","Dosa kak","Jangan gtu dong kak","Kakak g boleh gtu 😡"]
let randomAra = ["Araa ara","G mau ngomong ara","Ogah bet","Cih","Ara ara kak"]
let simiV2 = pickRandom(randomText)
let { data } = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURI(m.budy)}&lc=id`)
let sami = data.success
if (m.budy.toLowerCase().includes("ara")) {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([ i18n.__("audioPack.ngomong_apaan_sih"), i18n.__("audioPack.kaga_ada"), i18n.__("audioPack.ga_mau"), i18n.__("audioPack.ga_da"), i18n.__("audioPack.ara_ara"), i18n.__("audioPack.ara_ara_goblok"), ]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else m.reply(pickRandom([randomAra]))
} else if (m.budy.toLowerCase().includes("desah") || i18n.__("kata_dosa").includes(m.budy.toLowerCase())) {
m.reply(pickRandom([randomDesah]))
} else if (sami.startsWith("Aku tidak mengerti")) {
m.reply(pickRandom([simiV2, m.budy]))
} else {
m.reply(pickRandom([sami, simiV2, m.budy]))
}} catch (e) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
}}
//=========================[ RESPON COMMAND GET FILE ]=========================\\
if (Object.keys(cmdOptions).length !== 0) {
//=========================[ RESPON (ONLY SEWA) ]=========================\\
if (cmdOptions.isSewa) {
if (m.isGroup && !m.isSewa) return m.reply("Maaf kak sepertinya group ini belum sewa")
}
//=========================[ RESPON (BLOCK COMMAND) ]=========================\\
if (db.blockcmd.includes(command)) {
return m.reply("Maaf kak command telah di block")
}
//=========================[ RESPON (COOL DOWN) ]=========================\\
if (!m.isPremium && !m.key.fromMe && cmdOptions.cooldown > 0) {
if (Object.keys(db.cooldown).includes(m.sender)) {
try{ 
let expired = Number(db.cooldown[m.sender].expired) - Number(Date.now())
var cooldown = expired == NaN? 0.000 : expired / 1000
} catch {
var cooldown = 0.000
}
return m.reply(`Cooldown, please waiting ${cooldown} seconds again.`)
} else {
db.cooldown[m.sender] = {
expired: Date.now() + toMs(cmdOptions.cooldown + "second"), 
}}}
//=========================[ RESPON (ONLY PRIVATE) ]=========================\\
if (cmdOptions.isPrivate) {
if (m.isGroup) return onlyPrivate()
}
//=========================[ RESPON (ONLY GROUP) ]=========================\\
if (cmdOptions.isGroup) {
if (!m.isGroup) return onlyGroup()
}
//=========================[ RESPON (ADMIN) ]=========================\\
if (cmdOptions.isAdmin) {
if (!isGroupAdmins && !m.isOwner) return onlyAdmin()
}
//=========================[ RESPON (BOT ADMIN) ]=========================\\
if (cmdOptions.isBotAdmin) {
if (!isBotGroupAdmins) return onlyBadmin()
}
//=========================[ RESPON (ONLY CREATOR) ]=========================\\
if (cmdOptions.isVip) {
if (!m.isCreator && !m.key.fromMe) return m.reply("Maaf kak kamu bukan users owner vip")
}
//=========================[ RESPON (ONLY OWNER) ]=========================\\
if (cmdOptions.isOwner) {
if (!m.isOwner && !m.key.fromMe) return onlyOwner()
}
//=========================[ RESPON (ONLY PREMIUM) ]=========================\\
if (cmdOptions.isPremium) {
if (!m.isPremium && !m.key.fromMe) return m.reply("Maaf kak kamu bukan users premium")
}
//=========================[ RESPON (MEDIA) ]=========================\\
if (cmdOptions.isMedia.isImage && cmdOptions.isMedia.isVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedImage && cmdOptions.isMedia.isQuotedMedia.isQuotedVideo) {
if (!isImage && !isVideo && !isQuotedImage && !isQuotedVideo) return m.reply(`Use photos/videos or Reply photos/videos with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isImage && cmdOptions.isMedia.isQuotedMedia.isQuotedImage) {
if (!isImage && !isQuotedImage) return m.reply(`Use photos or Reply photos with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedVideo) {
if (!isVideo && !isQuotedVideo) return m.reply(`Use videos or Reply videos with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isDocument && cmdOptions.isMedia.isQuotedMedia.isQuotedDocument) {
if (!isDocument && !isQuotedDocument) return m.reply(`Use documents or Reply documents with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isViewOnce && cmdOptions.isMedia.isQuotedMedia.isQuotedViewOnce) {
if (!isViewOnce && !isQuotedViewOnce) return m.reply(`Use view once or Reply view once with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isImage) {
if (!isImage) return m.reply(`Use photos with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isVideo) {
if (!isVideo) return m.reply(`Use videos with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isDocument) {
if (!isDocument) return m.reply(`Use documents with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isViewOnce) {
if (!isViewOnce) return m.reply(`Use view once with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedImage) {
if (!isQuotedImage) return m.reply(`Reply photos with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedVideo) {
if (!isQuotedVideo) return m.reply(`Reply videos with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedAudio) {
if (!isQuotedAudio) return m.reply(`Reply audios with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedSticker) {
if (!isQuotedSticker) return m.reply(`Reply stickers with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedDocument) {
if (!isQuotedDocument) return m.reply(`Reply documents with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedViewOnce) {
if (!isQuotedViewOnce) return m.reply(`Reply view once with captions ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedContact) {
if (!isQuotedContact) return m.reply(`Reply contacts with captions ${prefix + command}`) 
}
//=========================[ RESPON (EXAMPLE) ]=========================\\
if (cmdOptions.minArgs > m.args.length) {
let teks = `*Minimal argument is ${cmdOptions.minArgs}*\n`
if (cmdOptions.expectedArgs) {
teks += `*Argument :* ${cmdOptions.expectedArgs}\n`
teks += `*Usage :* ${prefix + command} ${cmdOptions.expectedArgs}\n`
}
if (cmdOptions.example) {
teks += `*Example :* ${prefix + command} ${cmdOptions.example.split("{prefix}{command} ")[1]}`
}
return m.reply(util.format(teks))
}
//=========================[ RESPON (ONLY OWNER) ]=========================\\
if (cmdOptions.isLimit) {
if (m.isPremium || m.key.fromMe) {
onlyWait() 
} else {
if (db.users[m.sender].limit < 1) return m.reply("Maaf kak limit kamu sudah habis")
db.users[m.sender].limit -= 1
{let ko = sock.sendMessage(m.chat, { text: `Satu limit terpakaiಥ‿ಥ\nSisa Limit kamu : ${db.users[m.sender].limit}` }, { quoted: m })
setTimeout(() => sock.sendMessage(m.chat, { delete:  ko.key }), 2500)
let kon = sock.sendMessage(m.chat, { text: util.format(i18n.__("wait")) }, { quoted: m })
setTimeout(() => sock.sendMessage(m.chat, { delete:  kon.key }), 3000)}
}}
//=========================[ RESPON (ONLY WAIT) ]=========================\\
if (!cmdOptions.isLimit && cmdOptions.isWait) {
onlyWait()
}
//=========================[ RESPON COMMAND && ADD ADD DASHBOARD ]=========================\\
try{
cmdOptions.callback({ sock, m, store, command, prefix, thePrefix, isQuotedAllMedia, isQuotedDocument, isQuotedLocation, isQuotedContact, isQuotedViewOnce, isQuotedAudio, isQuotedSticker, isQuotedVideo, isQuotedImage, isQuotedText, isAllMedia, isDocument, isLocation, isContact, isViewOnce, isAudio, isSticker, isVideo, isImage, isText, isGroupAdmins, isBotGroupAdmins, groupOwner, groupAdmins, groupMembers, participants, groupName, groupMetadata }) 
cmdSuccess(command) 
} catch (e) {
cmdFailed(command, e)
}
//=========================[ RESPON COMMAND GET CASE ]=========================\\
} else switch (command) {
case "restart":
if (m.isGroup && !m.isSewa) return m.reply("Maaf kak sepertinya group ini belum sewa")
if (!m.isOwner && !m.key.fromMe) return onlyOwner()
try{
setTimeout(() => {
process.send("reset")
}, 3000)
cmdSuccess(command, "case")
m.reply("Restarting bot.....")
} catch (e) {
cmdFailed(command, e, "case")
}
break
case "stopped":
if (m.isGroup && !m.isSewa) return m.reply("Maaf kak sepertinya group ini belum sewa")
if (!m.isCreator) return onlyOwner()
try{
setTimeout(() => {
sock.end()
}, 3000)
cmdSuccess(command, "case")
m.reply("Stopped bot.....")
} catch (e) {
cmdFailed(command, e, "case")
}
break
case "getsesi":
try{
if (m.isGroup && !m.isSewa) return m.reply("Maaf kak sepertinya group ini belum sewa")
if (m.isGroup && !m.isCreator) return onlyPrivate()
if (m.input) {
let files = fs.readdirSync("./connections").filter((file) => !file.includes("session")) 
if (!files.includes(m.input.split("@")[0])) return m.reply("Nomer itu tidak ad dalam list")
setTimeout(() => {
fs.unlinkSync("./connections/" + m.input.split("@")[0] + ".zip")
}, 5000)
setTimeout(() => {
sock.sendMessage(m.chat, { document: fs.readFileSync("./connections/" + m.input.split("@")[0] + ".zip"), mimetype: "application/bin", fileName: `${m.input.split("@")[0]}.zip` }, { quoted: m })
}, 3000)
setTimeout(() => {
m.reply("Sending file session......")
}, 2000)
exec(`zip -r ./connections/${m.input.split("@")[0]}.zip ./connections/${m.input.split("@")[0]}`)
cmdSuccess(command, "case")
} else if (m.text == "jadibot") {
let files = fs.readdirSync("./connections").filter((file) => !file.includes("session")) 
if (!files.includes(m.senderNumber)) return m.reply("Kamu tidak ad dalam list")
setTimeout(() => {
fs.unlinkSync("./connections/" + m.senderNumber + ".zip")
}, 5000)
setTimeout(() => {
sock.sendMessage(m.chat, { document: fs.readFileSync("./connections/" + m.senderNumber + ".zip"), mimetype: "application/bin", fileName: `${m.senderNumber}.zip` }, { quoted: m })
}, 3000)
setTimeout(() => {
m.reply("Sending file session......")
}, 2000)
exec(`zip -r ./connections/${m.senderNumber}.zip ./connections/${m.senderNumber}`)
cmdSuccess(command, "case")
} else {
if (!m.isOwner && !m.key.fromMe) return onlyOwner()
setTimeout(() => {
fs.unlinkSync("./connections/session.zip")
}, 5000)
setTimeout(() => {
sock.sendMessage(m.chat, { document: fs.readFileSync("./connections/session.zip"), mimetype: "application/bin", fileName: "session.zip" }, { quoted: m })
}, 3000)
setTimeout(() => {
m.reply("Sending file session......")
}, 2000)
exec("zip -r ./connections/session.zip ./connections/session")
cmdSuccess(command, "case")
}} catch (e) {
cmdFailed(command, e, "case")
}
break
default:
}
//================================================================\\
if (i18n.__("kata_manggil").includes(m.budy.toLowerCase()) && !m.isGroup && !m.autoRespon) {
if (m.isOwner || m.key.fromMe) {return}
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.ada_apa_kak"), i18n.__("audioPack.ada_apa_kak1"), i18n.__("audioPack.iya_kak"), i18n.__("audioPack.kenapa_kak"), i18n.__("audioPack.oy")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.ucapsalam") }, { quoted: m })
} else {
m.reply(util.format(pickRandom(["Ada apa kak kok panggil aku","Y","Iya kak?","Ada apa kak","Iya kak","Kenapa kak","Iy"])))
}}
//================================================================\\
if (m.budy.includes("ualaikum") && !m.isGroup && !m.autoRespon) {
if (m.isOwner || m.key.fromMe) {return}
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: i18n.__("audioPack.walaikunsalam"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.salam") }, { quoted: m })
} else {
m.reply("Walaikumsalam kak")
}}
//================================================================\\
for (const x of i18n.__("kata_toxic")) {
if (m.budy.toLowerCase().includes(x) && !m.isGroup && !m.autoRespon) {
if (m.isOwner || m.key.fromMe) {return}
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.dosa_pantek"), i18n.__("audioPack.heeh"), i18n.__("audioPack.jangan_toxic_om")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.toxic") }, { quoted: m })
} else {
m.reply(util.format(pickRandom(["Jangan toxic kak 🙂","Jangan toxic kak 🙃","Jangan toxic kak😡","Jangan toxic kak 😠","Dilarang toxic kak 🙂","Dilarang toxic kak 🙃"])))
}}}
//================================================================\\
if (i18n.__("kata_dosa").includes(m.budy.toLowerCase()) && !m.isGroup && !m.autoRespon) {
if (m.isOwner || m.key.fromMe) {return}
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.ngomong_apaan_sih"), i18n.__("audioPack.dosa_pantek"), i18n.__("audioPack.heeh"), i18n.__("audioPack.baka"), i18n.__("audioPack.ga_mau"), i18n.__("audioPack.goblok")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.istigfar") }, { quoted: m })
} else {
m.reply(util.format(pickRandom(["Dosa kak 🙂","Ga mau kak 🙃","Astagfirloh kak 🙂","Astagfirloh kak itu dosa 🙂"])))
}}
//================================================================\\
if (m.budy.toLowerCase().includes("pagi") && !m.isGroup) {
if (m.ucapanWaktu == "Selamat pagi") {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([ i18n.__("audioPack.asautegondalimas"), i18n.__("audioPack.ohayoghosaimase"), i18n.__("audioPack.ohayo") ]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else {
m.reply(`${m.ucapanWaktu} kak 🙂`)
}}}
//================================================================\\
if (m.budy.toLowerCase().includes("malam") && !m.isGroup && !m.autoRespon) {
if (m.ucapanWaktu == "Selamat malam") {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([ i18n.__("audioPack.oyasumi"), i18n.__("audioPack.oyasuminasai") ]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else {
m.reply(`${m.ucapanWaktu} kak 🙂`)
}}}
//================================================================\\
if (m.budy.toLowerCase().includes("siang") && !m.isGroup && !m.autoRespon) {
if (m.ucapanWaktu == "Selamat siang") {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: i18n.__("audioPack.konichiwa"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else {
m.reply(`${m.ucapanWaktu} kak 🙂`)
}}}
//================================================================\\
if (m.body.startsWith(">")) {
if (!m.isOwner && !m.key.fromMe) return
try{
let evaled = await eval(m.text)
if (evaled == undefined) return
if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
m.reply(util.format(evaled))
} catch (e) {
m.reply(util.format(e))
}}
//================================================================\\
if (m.body.startsWith("=>")) {
if (!m.isOwner && !m.key.fromMe) return
try{
let evaled = await eval(`(async () => { return ${m.text} })()`)
if (evaled == undefined) return
if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
m.reply(util.format(evaled))
} catch (e) {
m.reply(util.format(e))
}}
//================================================================\\
if (m.budy.startsWith("$")) {
if (!m.isOwner && !m.key.fromMe) return
exec(m.text, (err, stdout) => {
if (err) return m.reply(util.format(err))
if (stdout) m.reply(util.format(stdout))
})
}
//================================================================\\
} catch (err) {
let e = String(err)
if (e.includes("this.isZero")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${err}`)
}}
//================================================================\\
const readCommands = (pathName = "./system/commands") => {
const command = fs.readdirSync("./system/commands").filter((file) => file.endsWith(".js") && !file.endsWith(".js.bak"))
for (let file of command) {
const cmdObject = require("@commands/" + file)
const cmdOptions = {
commands: cmdObject.commands,
cooldown: cmdObject?.cooldown? cmdObject.cooldown : 0,
minArgs: cmdObject?.minArgs? cmdObject.minArgs : 0,
expectedArgs: cmdObject?.expectedArgs? cmdObject.expectedArgs : null, 
example: cmdObject?.example? cmdObject.example : null,
isSewa: cmdObject?.isSewa? cmdObject.isSewa : false,
isVip: cmdObject?.isVip? cmdObject.isVip : false,
isOwner: cmdObject?.isOwner? cmdObject.isOwner : false,
isPremium: cmdObject?.isPremium? cmdObject.isPremium : false,
isPrivate: cmdObject?.isPrivate? cmdObject.isPrivate : false,
isGroup: cmdObject?.isGroup? cmdObject.isGroup : false,
isAdmin: cmdObject?.isAdmin? cmdObject.isAdmin : false, 
isBotAdmin: cmdObject?.isBotAdmin? cmdObject.isBotAdmin : false, 
isMedia: {
        isImage: cmdObject?.isMedia?.isImage? cmdObject.isMedia.isImage : false,
        isVideo: cmdObject?.isMedia?.isVideo? cmdObject.isMedia.isVideo : false, 
        isDocument: cmdObject?.isMedia?.isDocument? cmdObject.isMedia.isDocument : false, 
        isViewOnce: cmdObject?.isMedia?.isViewOnce? cmdObject.isMedia.isViewOnce : false, 
        isQuotedMedia: {
		       	  isQuotedImage: cmdObject?.isMedia?.isQuotedMedia?.isQuotedImage? cmdObject.isMedia.isQuotedMedia.isQuotedImage : false,
				  isQuotedVideo: cmdObject?.isMedia?.isQuotedMedia?.isQuotedVideo? cmdObject.isMedia.isQuotedMedia.isQuotedVideo : false,
			      isQuotedAudio: cmdObject?.isMedia?.isQuotedMedia?.isQuotedAudio? cmdObject.isMedia.isQuotedMedia.isQuotedAudio : false,
			      isQuotedSticker: cmdObject?.isMedia?.isQuotedMedia?.isQuotedSticker? cmdObject.isMedia.isQuotedMedia.isQuotedSticker : false,
			      isQuotedDocument: cmdObject?.isMedia?.isQuotedMedia?.isQuotedDocument? cmdObject.isMedia.isQuotedMedia.isQuotedDocument : false,
			      isQuotedViewOnce: cmdObject?.isMedia?.isQuotedMedia?.isQuotedViewOnce? cmdObject.isMedia.isQuotedMedia.isQuotedViewOnce : false, 
			      isQuotedContact: cmdObject?.isMedia?.isQuotedMedia?.isQuotedContact? cmdObject.isMedia.isQuotedMedia.isQuotedContact : false
				}
},
isLimit: cmdObject?.isLimit? cmdObject.isLimit : false, 
isWait: cmdObject?.isWait? cmdObject.isWait : false,
callback: cmdObject.callback
}
if (cmdObject.commands) {
cmdObject.commands.forEach((x) => {
commands.set(x, cmdOptions)
if (!Object.keys(db.allcommand).includes(x)) db.allcommand[x] = { tempFile: "./system/commands/" + file }
})
}}
}
//================================================================\\
module.exports = { Message, readCommands }



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})