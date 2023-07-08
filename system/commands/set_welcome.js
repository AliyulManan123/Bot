const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["setwelcome"],
    minArgs: 1,
    expectedArgs: "<text>",
    example: "{prefix}{command} Selamat datang kak@add",
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, isQuotedText }) => {
        if (!db.chats[m.chat].welcome) return m.reply("Fitur welcome belum aktif kak")
        const data = Object.keys(db.chats[m.chat].setwelcome).map((x) => "@" + x).filter((x) => m.text.includes(x))
        if (data[0] == "@add") {
        db.chats[m.chat].setwelcome.add = (m.text.split("@add")[0] == "" && isQuotedText)? m.quoted.budy : (m.text.split("@add")[0] == "" && m.text.split("@add")[1] !== "")? m.text.split("@add")[1] : (m.text.split("@add")[0] !== "" && m.text.split("@add")[1] == "")? m.text.split("@add")[0] : ""
        m.reply("Success set welcome add")
        } else if (data[0] == "@remove") {
        db.chats[m.chat].setwelcome.remove = (m.text.split("@remove")[0] == "" && isQuotedText)? m.quoted.budy : (m.text.split("@remove")[0] == "" && m.text.split("@remove")[1] !== "")? m.text.split("@remove")[1] : (m.text.split("@remove")[0] !== "" && m.text.split("@remove")[1] == "")? m.text.split("@remove")[0] : ""
        m.reply("Success set welcome remove")
        } else if (data[0] == "@promote") {
        db.chats[m.chat].setwelcome.promote = (m.text.split("@promote")[0] == "" && isQuotedText)? m.quoted.budy : (m.text.split("@promote")[0] == "" && m.text.split("@promote")[1] !== "")? m.text.split("@promote")[1] : (m.text.split("@promote")[0] !== "" && m.text.split("@promote")[1] == "")? m.text.split("@promote")[0] : ""
        m.reply("Success set welcome promote")
        } else if (data[0] == "@demote") {
        db.chats[m.chat].setwelcome.demote = (m.text.split("@demote")[0] == "" && isQuotedText)? m.quoted.budy : (m.text.split("@demote")[0] == "" && m.text.split("@demote")[1] !== "")? m.text.split("@demote")[1] : (m.text.split("@demote")[0] !== "" && m.text.split("@demote")[1] == "")? m.text.split("@demote")[0] : ""
        m.reply("Success set welcome demote")
        } else {
        m.reply("Ambil key kak :\n\n@add\n@remove\n@promote\n@demote")
        }       
    }
}