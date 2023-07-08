const fs = require("fs")
const chalk = require("chalk")
const { week, calender, toFirstCase } = require("@libs/function")
const { botName } = require("@config")
const yes = "❌"
const no = ""

const featError = (cmd) => {
return Object.keys(db.listerror).includes(cmd) 
}


const menu = (m, thePrefix) => {
const mode = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].mode : "public"
return `*${botName}*
${week}, ${calender} 

 ◉ Nama : ${m.pushName}
 ◉ Status : ${m.isOwner? "Owner" : m.isPremium? "Premium" : "Users"}
 ◉ Limit : ${db.users[m.sender].limit}
 ◉ Saldo : ${db.users[m.sender].balance}
 ◉ Mode : ${toFirstCase(mode)}
 ◉ Prefix : ${thePrefix}
 ◉ Time Wib : ${m.timeWib}
 ◉ Total Feature : ${Object.keys(db.allcommand).length}
 ◉ Total Error : ${Object.keys(db.listerror).length}
 ◉ Total User : ${Object.keys(db.users).length}
 ◉ User Banned : ${Object.keys(db.banned).length}
`}

const bugMenu = (prefix) => {
return `  ╭─▸ 𝘉𝘶𝘨 𝘔𝘦𝘯𝘶
  │
  │⭔ Xospc ${featError("xospc")? yes : no }
  │⭔ Xosgc ${featError("xosgc")? yes : no }
  │⭔ Doxpc ${featError("doxpc")? yes : no }
  │⭔ Doxgc ${featError("doxgc")? yes : no }
  │⭔ Qrb ${featError("qrb")? yes : no }
  │⭔ Verfy ${featError("verfy")? yes : no }
  │⭔ Kenon ${featError("kenon")? yes : no }
  │⭔ Vidonce ${featError("vidonce")? yes : no }
  │⭔ Unban1 ${featError("unban1")? yes : no }
  │⭔ Unban2 ${featError("unban2")? yes : no }
  │⭔ Unban3 ${featError("unban3")? yes : no }
  │
  ╰────────────˧`
}

const ownerMenu = (prefix) => {
return `  ╭─▸ 𝘖𝘸𝘯𝘦𝘳 𝘔𝘦𝘯𝘶
  │
  │⭔ Anticall ${featError("anticall")? yes : no }
  │⭔ Antispam ${featError("antispam")? yes : no }
  │⭔ Auto ${featError("auto")? yes : no }
  │⭔ Autobio ${featError("autobio")? yes : no }
  │⭔ Autoblockcmd ${featError("autoblockcmd")? yes : no }
  │⭔ Autojoin ${featError("autojoin")? yes : no }
  │⭔ Autolevel ${featError("autolevel")? yes : no }
  │⭔ Autoread ${featError("autoread")? yes : no }
  │⭔ Autoreport ${featError("autoreport")? yes : no }
  │⭔ Autorespon ${featError("autorespon")? yes : no }
  │⭔ Autosticker ${featError("autosticker")? yes : no }
  │⭔ Autovn ${featError("autovn")? yes : no }
  │⭔ Ban ${featError("ban")? yes : no }
  │⭔ Unban ${featError("unban")? yes : no }
  │⭔ Block ${featError("block")? yes : no }
  │⭔ Unblock ${featError("unblock")? yes : no }
  │⭔ Blockcmd ${featError("blockcmd")? yes : no }
  │⭔ Unblockcmd ${featError("unblockcmd")? yes : no }
  │⭔ Bc ${featError("bc")? yes : no }
  │⭔ Bcgc ${featError("bcgc")? yes : no }
  │⭔ Bcpc ${featError("bcpc")? yes : no }
  │⭔ Creategc ${featError("creategc")? yes : no }
  │⭔ Updatefile ${featError("updatefile")? yes : no }
  │⭔ Backup ${featError("backup")? yes : no }
  │⭔ Getfile ${featError("getfile")? yes : no }
  │⭔ Getfitur ${featError("getfitur")? yes : no }
  │⭔ Getfolder ${featError("getfolder")? yes : no }
  │⭔ Getsesi ${featError("getsesi")? yes : no }
  │⭔ Addfitur ${featError("addfitur")? yes : no }  
  │⭔ Restart ${featError("restart")? yes : no }
  │⭔ Stopped ${featError("stopped")? yes : no }
  │⭔ Join ${featError("join")? yes : no }
  │⭔ Leave ${featError("leave")? yes : no }
  │⭔ Mode ${featError("mode")? yes : no }
  │⭔ Setbio ${featError("setbio")? yes : no }
  │⭔ Setmenu ${featError("setmenu")? yes : no }
  │⭔ Setnamabot ${featError("setnamabot")? yes : no }
  │⭔ Setnamaown ${featError("setnamaown")? yes : no }
  │⭔ Setpp ${featError("setpp")? yes : no }
  │⭔ Setnoown ${featError("setnoown")? yes : no }
  │⭔ Setprefix ${featError("setprefix")? yes : no }
  │⭔ Setreply ${featError("setreply")? yes : no }
  │⭔ Delsampah ${featError("delsampah")? yes : no }
  │
  ╰────────────˧`
}

const groupMenu = (prefix) => {
return `  
  ╭─▸ 𝘎𝘳𝘰𝘶𝘱 𝘔𝘦𝘯𝘶
  │
  │⭔ Antilink ${featError("antilink")? yes : no }
  │⭔ Antilinkfb ${featError("antilinkfb")? yes : no }
  │⭔ Antilinkig ${featError("antilinkig")? yes : no }
  │⭔ Antilinktele ${featError("antilinktele")? yes : no }
  │⭔ Antilinktiktok ${featError("antilinktiktok")? yes : no }
  │⭔ Antilinktwitter ${featError("antilinktwitter")? yes : no }
  │⭔ Antilinkwa ${featError("antilinkwa")? yes : no }
  │⭔ Antilinkyt ${featError("antilinkyt")? yes : no }
  │⭔ Antiasing ${featError("antiasing")? yes : no }
  │⭔ Antidelete ${featError("antidelete")? yes : no }
  │⭔ Antisange ${featError("antisange")? yes : no }
  │⭔ Antitag ${featError("antitag")? yes : no }
  │⭔ Antivo ${featError("antivo")? yes : no }
  │⭔ Antivirtex ${featError("antivirtex")? yes : no }
  │⭔ Antitoxic ${featError("antitoxic")? yes : no }
  │⭔ Antibot ${featError("antibot")? yes : no }
  │⭔ Autoreactgc ${featError("autoreactgc")? yes : no }
  │⭔ Autorespongc ${featError("autorespongc")? yes : no }
  │⭔ Welcome ${featError("welcome")? yes : no }
  │⭔ Mute ${featError("mute")? yes : no }
  │⭔ Unmute ${featError("unmute")? yes : no }
  │⭔ Infogc ${featError("infogc")? yes : no }
  │⭔ Linkgc ${featError("linkgc")? yes : no }
  │⭔ Setppgc ${featError("setppgc")? yes : no }
  │⭔ Setnamagc ${featError("setnamagc")? yes : no }
  │⭔ Setdescgc ${featError("setdescgc")? yes : no }
  │⭔ Setwelcome ${featError("setwelcome")? yes : no }
  │⭔ Gc ${featError("gc")? yes : no }
  │⭔ Revoke ${featError("revoke")? yes : no }
  │⭔ Hidetag ${featError("hidetag")? yes : no }
  │⭔ Tagall ${featError("tagall")? yes : no }
  │⭔ Add ${featError("add")? yes : no }
  │⭔ Remove ${featError("remove")? yes : no }
  │⭔ Promote ${featError("promote")? yes : no }
  │⭔ Demote ${featError("demote")? yes : no }
  │⭔ Afk ${featError("afk")? yes : no }
  │⭔ Kickme ${featError("kickme")? yes : no }
  │⭔ Opentime ${featError("opentime")? yes : no }
  │⭔ Closetime ${featError("closetime")? yes : no }
  │⭔ Getppgc ${featError("getppgc")? yes : no }
  │⭔ Disappearing ${featError("disappearing")? yes : no }
  │⭔ Ceksewa ${featError("disappearing")? yes : no }
  │
  ╰────────────˧`
}

const toolsMenu = (prefix) => {
return `  
  ╭─▸ 𝘛𝘰𝘰𝘭𝘴 𝘔𝘦𝘯𝘶
  │
  │⭔ Dashboard ${featError("dashboard")? yes : no }
  │⭔ Menu ${featError("menu")? yes : no }
  │⭔ Owner ${featError("owner")? yes : no }
  │⭔ Runtime ${featError("runtime")? yes : no }
  │⭔ Speed ${featError("speed")? yes : no }
  │⭔ Listgc ${featError("listgc")? yes : no }
  │⭔ Listpc ${featError("listpc")? yes : no }
  │⭔ Listharga ${featError("listharga")? yes : no }
  │⭔ Read ${featError("read")? yes : no }  
  │⭔ Del ${featError("del")? yes : no }  
  │⭔ Getpp ${featError("getpp")? yes : no }  
  │⭔ Getname ${featError("getname")? yes : no }  
  │⭔ Getid ${featError("getid")? yes : no }  
  │⭔ Script ${featError("script")? yes : no }  
  │⭔ Cariteman ${featError("cariteman")? yes : no }  
  │⭔ Kontak ${featError("kontak")? yes : no }  
  │⭔ React ${featError("react")? yes : no }  
  │⭔ Wame ${featError("wame")? yes : no }  
  │⭔ Report ${featError("report")? yes : no }  
  │⭔ Infobot ${featError("infobot")? yes : no }  
  │⭔ Profile ${featError("profile")? yes : no }  
  │
  ╰────────────˧`
}

const funMenu = (prefix) => {
return `  
  ╭─▸ 𝘍𝘶𝘯 𝘔𝘦𝘯𝘶
  │
  │⭔ Cekgoblok ${featError("cekgoblok")? yes : no }
  │⭔ Cekjelek ${featError("cekjelek")? yes : no }
  │⭔ Cekgay ${featError("cekgay")? yes : no }
  │⭔ Ceklesbi ${featError("ceklesbi")? yes : no }
  │⭔ Cekganteng ${featError("cekganteng")? yes : no }
  │⭔ Cekcantik ${featError("cekcantik")? yes : no }
  │⭔ Cekbego ${featError("cekbego")? yes : no }
  │⭔ Ceksuhu ${featError("ceksuhu")? yes : no }
  │⭔ Cekpinter ${featError("cekpinter")? yes : no }
  │⭔ Cekjago ${featError("cekjago")? yes : no }
  │⭔ Ceknolep ${featError("ceknolep")? yes : no }
  │⭔ Cekbabi ${featError("cekbabi")? yes : no }
  │⭔ Cekbeban ${featError("cekbeban")? yes : no }
  │⭔ Cekbaik ${featError("cekbaik")? yes : no }
  │⭔ Cekjahat ${featError("cekjahat")? yes : no }
  │⭔ Cekanjing ${featError("cekanjing")? yes : no }
  │⭔ Cekharam ${featError("cekharam")? yes : no }
  │⭔ Cekpakboy ${featError("cekpakboy")? yes : no }
  │⭔ Cekpakgirl ${featError("cekpakgirl")? yes : no }
  │⭔ Ceksange ${featError("ceksange")? yes : no }
  │⭔ Cekbaper ${featError("cekbaper")? yes : no }
  │⭔ Cekfakboy ${featError("cekfakboy")? yes : no }
  │⭔ Cekalim ${featError("cekalim")? yes : no }
  │⭔ Ceksuhu ${featError("ceksuhu")? yes : no }
  │⭔ Cekfakgirl ${featError("cekfakgirl")? yes : no }
  │⭔ Cekkeren ${featError("cekkeren")? yes : no }
  │⭔ Cekwibu ${featError("cekwibu")? yes : no }
  │⭔ Cekpasarkas ${featError("cekpasarkas")? yes : no }
  │⭔ Cekkul ${featError("cekkul")? yes : no }
  │
  ╰────────────˧`
}

const tagsMenu = (prefix) => {
return `  
  ╭─▸ 𝘛𝘢𝘨𝘴 𝘔𝘦𝘯𝘶
  │
  │⭔ Memek ${featError("memek")? yes : no }
  │⭔ Bego ${featError("bego")? yes : no }
  │⭔ Goblok ${featError("goblok")? yes : no }
  │⭔ Perawan ${featError("perawan")? yes : no }
  │⭔ Babi ${featError("babi")? yes : no }
  │⭔ Tolol ${featError("tolol")? yes : no }
  │⭔ Pintar ${featError("pintar")? yes : no }
  │⭔ Asu ${featError("asu")? yes : no }
  │⭔ Gay ${featError("gay")? yes : no }
  │⭔ Lesby ${featError("lesby")? yes : no }
  │⭔ Bajingan ${featError("bajingan")? yes : no }
  │⭔ Jancok ${featError("jancok")? yes : no }
  │⭔ Anjing ${featError("anjing")? yes : no }
  │⭔ Ngentot ${featError("ngentot")? yes : no }
  │⭔ Monyet ${featError("monyet")? yes : no }
  │⭔ Mastah ${featError("mastah")? yes : no }
  │⭔ Newbie ${featError("newbie")? yes : no }
  │⭔ Bangsat ${featError("bangsat")? yes : no }
  │⭔ Bangke ${featError("bangke")? yes : no }
  │⭔ Sange ${featError("sange")? yes : no }
  │⭔ Dakjal ${featError("dakjal")? yes : no }
  │⭔ Wibu ${featError("wibu")? yes : no }
  │⭔ Puki ${featError("puki")? yes : no }
  │⭔ Pantek ${featError("pantek")? yes : no }
  │⭔ Jadian ${featError("jadian")? yes : no }
  │⭔ Jodohku ${featError("jodohku")? yes : no }
  │
  ╰────────────˧`
  
  }

const downloadMenu = (prefix) => {
return `
  ╭─▸ 𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥𝘦𝘳
  │
  │⭔ Tiktokmp3 ${featError("tiktokmp3")? yes : featError("ttmp3")? yes : no }
  │⭔ Tiktokmp4 ${featError("tiktokmp4")? yes : featError("ttmp4")? yes : no }
  │⭔ Ytmp3 ${featError("ytmp3")? yes : no }
  │⭔ Ytmp4 ${featError("ytmp4")? yes : no }
  │
  ╰────────────˧`
}

const converterMenu = (prefix) => {
return `
  ╭─▸ 𝘊𝘰𝘯𝘷𝘦𝘳𝘵𝘦𝘳 𝘔𝘦𝘯𝘶
  │
  │⭔ Sticker ${featError("sticker")? yes : featError("s")? yes : no }
  │⭔ Toimg ${featError("toimg")? yes : featError("s")? yes : no }
  │⭔ Qc ${featError("qc")? yes : no }
  │
  ╰────────────˧`
}

const searchMenu = (prefix) => {
return `
  ╭─▸ 𝘚𝘦𝘢𝘳𝘤𝘩 𝘔𝘦𝘯𝘶
  │
  │⭔ Searchm ${featError("searchm")? yes :no }
  │⭔ Yts ${featError("yts")? yes :no }
  │
  ╰────────────˧`
}

const jadibotMenu = (prefix) => {
return `
  ╭─▸ 𝘑𝘢𝘥𝘪 𝘉𝘰𝘵 𝘔𝘦𝘯𝘶
  │
  │⭔ Jadibot ${featError("jadibot")? yes :no }
  │⭔ Stopjadibot ${featError("stopjadibot")? yes :no }
  │⭔ Deljadibot ${featError("deljadibot")? yes :no }
  │⭔ Listjadibot ${featError("listjadibot")? yes :no }
  │⭔ Clearjadibot ${featError("clearjadibot")? yes :no }
  │
  ╰────────────˧`
}

const randomMenu = (prefix) => {
return `
  ╭─▸ 𝘙𝘢𝘯𝘥𝘰𝘮 𝘔𝘦𝘯𝘶
  │
  │⭔ Awoo ${featError("awoo")? yes : no }
  │⭔ Bite ${featError("bite")? yes : no }
  │⭔ Blowjob ${featError("blowjob")? yes : no }
  │⭔ Blush ${featError("blush")? yes : no }
  │⭔ Bonk ${featError("bonk")? yes : no }
  │⭔ Boobs ${featError("boobs")? yes : no }
  │⭔ Bully ${featError("bully")? yes : no }
  │⭔ Cringe ${featError("cringe")? yes : no }
  │⭔ Cry ${featError("cry")? yes : no }
  │⭔ Cuddle ${featError("cuddle")? yes : no }
  │⭔ Cuddle2 ${featError("cuddle2")? yes : no }
  │⭔ Dance ${featError("dance")? yes : no }
  │⭔ Glomp ${featError("glomp")? yes : no }
  │⭔ Handhold ${featError("handhold")? yes : no }
  │⭔ Happy ${featError("happy")? yes : no }
  │⭔ Hentai ${featError("hentai")? yes : no }
  │⭔ Highfive ${featError("highfive")? yes : no }
  │⭔ Hug ${featError("hug")? yes : no }
  │⭔ Hug2 ${featError("hug2")? yes : no }
  │⭔ Kick ${featError("kick")? yes : no }
  │⭔ Kill ${featError("kill")? yes : no }
  │⭔ Kill2 ${featError("kill2")? yes : no }
  │⭔ Kiss ${featError("kiss")? yes : no }
  │⭔ Kiss2 ${featError("kiss2")? yes : no }
  │⭔ Lesbian ${featError("lesbian")? yes : no }
  │⭔ Lick ${featError("lick")? yes : no }
  │⭔ Megumin ${featError("megumin")? yes : no }
  │⭔ Neko ${featError("neko")? yes : no }
  │⭔ Neko2 ${featError("neko2")? yes : no }
  │⭔ Nom ${featError("nom")? yes : no }
  │⭔ Pat ${featError("pat")? yes : no }
  │⭔ Pat2 ${featError("pat2")? yes : no }
  │⭔ Poke ${featError("poke")? yes : no }
  │⭔ Punch ${featError("punch")? yes : no }
  │⭔ Shinobu ${featError("shinobu")? yes : no }
  │⭔ Slap ${featError("slap")? yes : no }
  │⭔ Slap2 ${featError("slap2")? yes : no }
  │⭔ Smile ${featError("smile")? yes : no }
  │⭔ Smug ${featError("smug")? yes : no }
  │⭔ Trap ${featError("trap")? yes : no }
  │⭔ Waifu ${featError("waifu")? yes : no }
  │⭔ Waifu2 ${featError("waifu2")? yes : no }
  │⭔ Waifu3 ${featError("waifu3")? yes : no }
  │⭔ Wave ${featError("wave")? yes : no }
  │⭔ Wink ${featError("wink")? yes : no }
  │⭔ Wink2 ${featError("wink2")? yes : no }
  │⭔ Yeet ${featError("yeet")? yes : no }
  │
  ╰────────────˧`
}

const storageMenu = (prefix) => {
return `
  ╭─▸ 𝘚𝘵𝘰𝘳𝘢𝘨𝘦 𝘔𝘦𝘯𝘶
  │
  │⭔ Addowner ${featError("addowner")? yes : no }
  │⭔ Addpremium ${featError("addpremium")? yes : no }
  │⭔ Addsewa ${featError("addsewa")? yes : no }
  │⭔ Addstick ${featError("addstick")? yes : no }
  │⭔ Addvn ${featError("addvn")? yes : no }
  │⭔ Addlimit ${featError("addlimit")? yes : no }
  │⭔ Addbalance ${featError("addbalance")? yes : no }
  │⭔ Setcmd ${featError("setcmd")? yes : no }
  │⭔ Delowner ${featError("delowner")? yes : no }
  │⭔ Depremium ${featError("depremium")? yes : no }
  │⭔ Delsewa ${featError("delsewa")? yes : no }
  │⭔ Delstick ${featError("delstick")? yes : no }
  │⭔ Delvn ${featError("delvn")? yes : no }
  │⭔ Dellimit ${featError("dellimit")? yes : no }
  │⭔ Delbalance ${featError("delbalance")? yes : no }
  │⭔ Delcmd ${featError("delcmd")? yes : no }
  │⭔ Listowner ${featError("listowner")? yes : no }
  │⭔ Listpremium ${featError("listpremium")? yes : no }
  │⭔ Listsewa ${featError("listsewa")? yes : no }
  │⭔ Liststick ${featError("liststick")? yes : no }
  │⭔ Listvn ${featError("listvn")? yes : no }
  │⭔ Listblock ${featError("listblock")? yes : no }  
  │⭔ Listban ${featError("listban")? yes : no }  
  │⭔ Listblockcmd ${featError("listblockcmd")? yes : no }  
  │⭔ Listerror ${featError("listerror")? yes : no }  
  │⭔ Clearowner ${featError("clearowner")? yes : no }  
  │⭔ Clearpremium ${featError("clearpremium")? yes : no }  
  │⭔ Clearsewa ${featError("clearsewa")? yes : no }  
  │⭔ Clearstick ${featError("clearstick")? yes : no }  
  │⭔ Clearvn ${featError("clearvn")? yes : no }  
  │⭔ Clearban ${featError("clearban")? yes : no }  
  │⭔ Clearblock ${featError("clearblock")? yes : no }  
  │⭔ Clearblockcmd ${featError("clearblockcmd")? yes : no }  
  │⭔ Clearerror ${featError("clearerror")? yes : no }  
  │
  ╰────────────˧`
}

const fitur = (prefix) => {
return `
${bugMenu(prefix)}
${ownerMenu(prefix)}
${groupMenu(prefix)}
${toolsMenu(prefix)}
${funMenu(prefix)}
${tagsMenu(prefix)}
${downloadMenu(prefix)}
${converterMenu(prefix)}
${searchMenu(prefix)}
${jadibotMenu(prefix)}
${randomMenu(prefix)}
${storageMenu(prefix)}
`}


module.exports = { bugMenu, ownerMenu, groupMenu, toolsMenu, downloadMenu, funMenu, tagsMenu, converterMenu, randomMenu, storageMenu, menu, fitur }



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})