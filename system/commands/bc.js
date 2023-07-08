const fs = require("fs") 
const chalk = require("chalk")
const { getContentType } = require("baileys")
const { sleep } = require("@libs/function")
module.exports = {
    commands: ["bc"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, store, isImage, isVideo, isViewOnce, isDocument, isAllMedia, isQuotedAllMedia, isQuotedDocument, isQuotedLocation, isQuotedViewOnce, isQuotedImage, isQuotedSticker, isQuotedVideo, isQuotedAudio, isQuotedContact }) => {
        const data = await store.chats.all().filter(({ id }) => id.includes("@s.whatsapp.net") || id.endsWith("@g.us")).map(x => x.id)
        if (isImage || isQuotedImage) {
        let teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
        for (let x of data) {        
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, image: media, caption: teks })
        await sleep(2000)
        } 
        } else if (isVideo || isQuotedVideo) {
        if ((isQuotedVideo? m.quoted.message[m.type].seconds : m.message[m.type].seconds) > 600) return m.reply("Terlalu gede sizenya kak")
        const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, video: media, caption: teks })
        await sleep(2000)
        }
        } else if (isViewOnce || isQuotedViewOnce) {
        if (isQuotedViewOnce && getContentType(m.quoted.message) == "videoMessage" && m.quoted.message["videoMessage"].seconds > 600 || getContentType(m.message) == "videoMessage" && m.message["videoMessage"].seconds > 600) { return m.reply("Terlalu gede sizenya kak") }
        const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedViewOnce? m.quoted : m)
        for (let x of data) {
        if (isQuotedViewOnce && getContentType(m.quoted.message) == "videoMessage" ||  getContentType(m.message) == "videoMessage") {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, video: media, caption: teks, viewOnce: true })
        await sleep(2000)
        } else if (isQuotedViewOnce && getContentType(m.quoted.message) == "imageMessage" ||  getContentType(m.message) == "imageMessage") {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, image: media, caption: teks, viewOnce: true })
        await sleep(2000)
        }}
        } else if (isDocument || isQuotedDocument) {
        const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
        const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, document: media, mimetype: "application/bin", fileName }) 
        await sleep(2000)              
        }
        } else if (isQuotedSticker || isQuotedAudio || isQuotedContact || isQuotedLocation) {
        for (let x of data) {
        await sock.copyNForward(x, m.quoted)
        await sleep(2000)
        }
        } else if (!isAllMedia && !isQuotedAllMedia) {
        if (!m.text) return m.reply("Text?")
        let teks = "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, text: teks })
        await sleep(2000)
        }
        }
        m.reply(`Success send broadcast message to ${data.length} chats`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})