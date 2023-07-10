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
return `*©${botName}*
${week}, ${calender} 

 ◉ Nama : ${m.pushName}
 ◉ Status : ${m.isOwner? "Owner" : m.isPremium? "Premium" : "Users"}
 ◉ Limit : ${db.users[m.sender].limit}
 ◉ Balance : ${db.users[m.sender].balance}
 ◉ Mode : ${toFirstCase(mode)}
 ◉ Prefix : ${thePrefix}
 ◉ Jam : ${m.timeWib}
 ◉ Total Fitur : ${Object.keys(db.allcommand).length}
 ◉ Total Error : ${Object.keys(db.listerror).length}
 ◉ Total User : ${Object.keys(db.users).length}
 ◉ User Banned : ${Object.keys(db.banned).length}
`}

const bugMenu = (prefix) => {
return `  乂 *D A N G E R  M E N U* 
  
  ぎ Xospc ${featError("xospc")? yes : no }
  ぎ Xosgc ${featError("xosgc")? yes : no }
  ぎ Doxpc ${featError("doxpc")? yes : no }
  ぎ Doxgc ${featError("doxgc")? yes : no }
  ぎ Qrb ${featError("qrb")? yes : no }
  ぎ Vidonce ${featError("vidonce")? yes : no }
  
  `
}

const ownerMenu = (prefix) => {
return `  乂 *O W N E R  M E N U*
  
  ぎ Anticall ${featError("anticall")? yes : no }
  ぎ Antispam ${featError("antispam")? yes : no }
  ぎ Auto ${featError("auto")? yes : no }
  ぎ Autobio ${featError("autobio")? yes : no }
  ぎ Autoblockcmd ${featError("autoblockcmd")? yes : no }
  ぎ Autojoin ${featError("autojoin")? yes : no }
  ぎ Autolevel ${featError("autolevel")? yes : no }
  ぎ Autoread ${featError("autoread")? yes : no }
  ぎ Autoreport ${featError("autoreport")? yes : no }
  ぎ Autorespon ${featError("autorespon")? yes : no }
  ぎ Autosticker ${featError("autosticker")? yes : no }
  ぎ Autovn ${featError("autovn")? yes : no }
  ぎ Ban ${featError("ban")? yes : no }
  ぎ Unban ${featError("unban")? yes : no }
  ぎ Block ${featError("block")? yes : no }
  ぎ Unblock ${featError("unblock")? yes : no }
  ぎ Blockcmd ${featError("blockcmd")? yes : no }
  ぎ Unblockcmd ${featError("unblockcmd")? yes : no }
  ぎ Bc ${featError("bc")? yes : no }
  ぎ Bcgc ${featError("bcgc")? yes : no }
  ぎ Bcpc ${featError("bcpc")? yes : no }
  ぎ Creategc ${featError("creategc")? yes : no }
  ぎ Updatefile ${featError("updatefile")? yes : no }
  ぎ Backup ${featError("backup")? yes : no }
  ぎ Getfile ${featError("getfile")? yes : no }
  ぎ Getfitur ${featError("getfitur")? yes : no }
  ぎ Getfolder ${featError("getfolder")? yes : no }
  ぎ Getsesi ${featError("getsesi")? yes : no }
  ぎ Addfitur ${featError("addfitur")? yes : no }  
  ぎ Restart ${featError("restart")? yes : no }
  ぎ Stopped ${featError("stopped")? yes : no }
  ぎ Join ${featError("join")? yes : no }
  ぎ Leave ${featError("leave")? yes : no }
  ぎ Mode ${featError("mode")? yes : no }
  ぎ Setbio ${featError("setbio")? yes : no }
  ぎ Setmenu ${featError("setmenu")? yes : no }
  ぎ Setnamabot ${featError("setnamabot")? yes : no }
  ぎ Setnamaown ${featError("setnamaown")? yes : no }
  ぎ Setpp ${featError("setpp")? yes : no }
  ぎ Setnoown ${featError("setnoown")? yes : no }
  ぎ Setprefix ${featError("setprefix")? yes : no }
  ぎ Setreply ${featError("setreply")? yes : no }
  ぎ Delsampah ${featError("delsampah")? yes : no }
  
  `
}

const groupMenu = (prefix) => {
return `  
  乂 *G R O U P  M E N U*
  
  ぎ Antilink ${featError("antilink")? yes : no }
  ぎ Antilinkfb ${featError("antilinkfb")? yes : no }
  ぎ Antilinkig ${featError("antilinkig")? yes : no }
  ぎ Antilinktele ${featError("antilinktele")? yes : no }
  ぎ Antilinktiktok ${featError("antilinktiktok")? yes : no }
  ぎ Antilinktwitter ${featError("antilinktwitter")? yes : no }
  ぎ Antilinkwa ${featError("antilinkwa")? yes : no }
  ぎ Antilinkyt ${featError("antilinkyt")? yes : no }
  ぎ Antiasing ${featError("antiasing")? yes : no }
  ぎ Antidelete ${featError("antidelete")? yes : no }
  ぎ Antisange ${featError("antisange")? yes : no }
  ぎ Antitag ${featError("antitag")? yes : no }
  ぎ Antivo ${featError("antivo")? yes : no }
  ぎ Antivirtex ${featError("antivirtex")? yes : no }
  ぎ Antitoxic ${featError("antitoxic")? yes : no }
  ぎ Antibot ${featError("antibot")? yes : no }
  ぎ Autoreactgc ${featError("autoreactgc")? yes : no }
  ぎ Autorespongc ${featError("autorespongc")? yes : no }
  ぎ Welcome ${featError("welcome")? yes : no }
  ぎ Mute ${featError("mute")? yes : no }
  ぎ Unmute ${featError("unmute")? yes : no }
  ぎ Infogc ${featError("infogc")? yes : no }
  ぎ Linkgc ${featError("linkgc")? yes : no }
  ぎ Setppgc ${featError("setppgc")? yes : no }
  ぎ Setnamagc ${featError("setnamagc")? yes : no }
  ぎ Setdescgc ${featError("setdescgc")? yes : no }
  ぎ Setwelcome ${featError("setwelcome")? yes : no }
  ぎ Gc ${featError("gc")? yes : no }
  ぎ Revoke ${featError("revoke")? yes : no }
  ぎ Hidetag ${featError("hidetag")? yes : no }
  ぎ Tagall ${featError("tagall")? yes : no }
  ぎ Add ${featError("add")? yes : no }
  ぎ Remove ${featError("remove")? yes : no }
  ぎ Promote ${featError("promote")? yes : no }
  ぎ Demote ${featError("demote")? yes : no }
  ぎ Afk ${featError("afk")? yes : no }
  ぎ Kickme ${featError("kickme")? yes : no }
  ぎ Opentime ${featError("opentime")? yes : no }
  ぎ Closetime ${featError("closetime")? yes : no }
  ぎ Getppgc ${featError("getppgc")? yes : no }
  ぎ Disappearing ${featError("disappearing")? yes : no }
  ぎ Ceksewa ${featError("disappearing")? yes : no }
  
  `
}

const toolsMenu = (prefix) => {
return `  
  乂 *T O O L S  M E N U*
  
  ぎ Dashboard ${featError("dashboard")? yes : no }
  ぎ Menu ${featError("menu")? yes : no }
  ぎ Owner ${featError("owner")? yes : no }
  ぎ Runtime ${featError("runtime")? yes : no }
  ぎ Speed ${featError("speed")? yes : no }
  ぎ Listgc ${featError("listgc")? yes : no }
  ぎ Listpc ${featError("listpc")? yes : no }
  ぎ Listharga ${featError("listharga")? yes : no }
  ぎ Read ${featError("read")? yes : no }  
  ぎ Del ${featError("del")? yes : no }  
  ぎ Getpp ${featError("getpp")? yes : no }  
  ぎ Getname ${featError("getname")? yes : no }  
  ぎ Getid ${featError("getid")? yes : no }  
  ぎ Script ${featError("script")? yes : no }  
  ぎ Cariteman ${featError("cariteman")? yes : no }  
  ぎ Kontak ${featError("kontak")? yes : no }  
  ぎ React ${featError("react")? yes : no }  
  ぎ Wame ${featError("wame")? yes : no }  
  ぎ Report ${featError("report")? yes : no }  
  ぎ Infobot ${featError("infobot")? yes : no }  
  ぎ Profile ${featError("profile")? yes : no }  
  ぎ mediafire 
  ぎ jawalsholat  
  
  `
}

const funMenu = (prefix) => {
return `  
  乂 *F U N  M E N U*
  
  ぎ Cekgoblok ${featError("cekgoblok")? yes : no }
  ぎ Cekjelek ${featError("cekjelek")? yes : no }
  ぎ Cekgay ${featError("cekgay")? yes : no }
  ぎ Ceklesbi ${featError("ceklesbi")? yes : no }
  ぎ Cekganteng ${featError("cekganteng")? yes : no }
  ぎ Cekcantik ${featError("cekcantik")? yes : no }
  ぎ Cekbego ${featError("cekbego")? yes : no }
  ぎ Ceksuhu ${featError("ceksuhu")? yes : no }
  ぎ Cekpinter ${featError("cekpinter")? yes : no }
  ぎ Cekjago ${featError("cekjago")? yes : no }
  ぎ Ceknolep ${featError("ceknolep")? yes : no }
  ぎ Cekbabi ${featError("cekbabi")? yes : no }
  ぎ Cekbeban ${featError("cekbeban")? yes : no }
  ぎ Cekbaik ${featError("cekbaik")? yes : no }
  ぎ Cekjahat ${featError("cekjahat")? yes : no }
  ぎ Cekanjing ${featError("cekanjing")? yes : no }
  ぎ Cekharam ${featError("cekharam")? yes : no }
  ぎ Cekpakboy ${featError("cekpakboy")? yes : no }
  ぎ Cekpakgirl ${featError("cekpakgirl")? yes : no }
  ぎ Ceksange ${featError("ceksange")? yes : no }
  ぎ Cekbaper ${featError("cekbaper")? yes : no }
  ぎ Cekfakboy ${featError("cekfakboy")? yes : no }
  ぎ Cekalim ${featError("cekalim")? yes : no }
  ぎ Ceksuhu ${featError("ceksuhu")? yes : no }
  ぎ Cekfakgirl ${featError("cekfakgirl")? yes : no }
  ぎ Cekkeren ${featError("cekkeren")? yes : no }
  ぎ Cekwibu ${featError("cekwibu")? yes : no }
  ぎ Cekpasarkas ${featError("cekpasarkas")? yes : no }
  ぎ Cekkul ${featError("cekkul")? yes : no }
  
  `
}

const tagsMenu = (prefix) => {
return `  
  乂 *T A G S  M E N U*
  
  ぎ Memek ${featError("memek")? yes : no }
  ぎ Bego ${featError("bego")? yes : no }
  ぎ Goblok ${featError("goblok")? yes : no }
  ぎ Perawan ${featError("perawan")? yes : no }
  ぎ Babi ${featError("babi")? yes : no }
  ぎ Tolol ${featError("tolol")? yes : no }
  ぎ Pintar ${featError("pintar")? yes : no }
  ぎ Asu ${featError("asu")? yes : no }
  ぎ Gay ${featError("gay")? yes : no }
  ぎ Lesby ${featError("lesby")? yes : no }
  ぎ Bajingan ${featError("bajingan")? yes : no }
  ぎ Jancok ${featError("jancok")? yes : no }
  ぎ Anjing ${featError("anjing")? yes : no }
  ぎ Ngentot ${featError("ngentot")? yes : no }
  ぎ Monyet ${featError("monyet")? yes : no }
  ぎ Mastah ${featError("mastah")? yes : no }
  ぎ Newbie ${featError("newbie")? yes : no }
  ぎ Bangsat ${featError("bangsat")? yes : no }
  ぎ Bangke ${featError("bangke")? yes : no }
  ぎ Sange ${featError("sange")? yes : no }
  ぎ Dakjal ${featError("dakjal")? yes : no }
  ぎ Wibu ${featError("wibu")? yes : no }
  ぎ Puki ${featError("puki")? yes : no }
  ぎ Pantek ${featError("pantek")? yes : no }
  ぎ Jadian ${featError("jadian")? yes : no }
  ぎ Jodohku ${featError("jodohku")? yes : no }
  
  `
  
  }

const downloadMenu = (prefix) => {
return `
  乂 *D O W N L O A D E R*
  
  ぎ Tiktokmp3 ${featError("tiktokmp3")? yes : featError("ttmp3")? yes : no }
  ぎ Tiktokmp4 ${featError("tiktokmp4")? yes : featError("ttmp4")? yes : no }
  ぎ Ytmp3 ${featError("ytmp3")? yes : no }
  ぎ Ytmp4 ${featError("ytmp4")? yes : no }
  ぎ Mediafire ${featError("mediafire")? yes : no }
  ぎ Gitclone ${featError("gitclone")? yes : no }
  
  `
}

const converterMenu = (prefix) => {
return `
  乂 *C O N V E R T E R  M E N U*
  
  ぎ Sticker ${featError("sticker")? yes : featError("s")? yes : no }
  ぎ Toimg ${featError("toimg")? yes : featError("s")? yes : no }
  ぎ Qc ${featError("qc")? yes : no }
  
  `
}

const searchMenu = (prefix) => {
return `
  乂 *S E A R C H  M E N U*
  
  ぎ Searchm ${featError("searchm")? yes :no }
  ぎ Yts ${featError("yts")? yes :no }
  
  `
}

const jadibotMenu = (prefix) => {
return `
  乂 *J A D I  B O T*
  
  ぎ Jadibot ${featError("jadibot")? yes :no }
  ぎ Stopjadibot ${featError("stopjadibot")? yes :no }
  ぎ Deljadibot ${featError("deljadibot")? yes :no }
  ぎ Listjadibot ${featError("listjadibot")? yes :no }
  ぎ Clearjadibot ${featError("clearjadibot")? yes :no }
  
  `
}

const randomMenu = (prefix) => {
return `
  乂 *R A N D O M  M E N U*
  
  ぎ Awoo ${featError("awoo")? yes : no }
  ぎ Bite ${featError("bite")? yes : no }
  ぎ Blowjob ${featError("blowjob")? yes : no }
  ぎ Blush ${featError("blush")? yes : no }
  ぎ Bonk ${featError("bonk")? yes : no }
  ぎ Boobs ${featError("boobs")? yes : no }
  ぎ Bully ${featError("bully")? yes : no }
  ぎ Cringe ${featError("cringe")? yes : no }
  ぎ Cry ${featError("cry")? yes : no }
  ぎ Cuddle ${featError("cuddle")? yes : no }
  ぎ Cuddle2 ${featError("cuddle2")? yes : no }
  ぎ Dance ${featError("dance")? yes : no }
  ぎ Glomp ${featError("glomp")? yes : no }
  ぎ Handhold ${featError("handhold")? yes : no }
  ぎ Happy ${featError("happy")? yes : no }
  ぎ Hentai ${featError("hentai")? yes : no }
  ぎ Highfive ${featError("highfive")? yes : no }
  ぎ Hug ${featError("hug")? yes : no }
  ぎ Hug2 ${featError("hug2")? yes : no }
  ぎ Kick ${featError("kick")? yes : no }
  ぎ Kill ${featError("kill")? yes : no }
  ぎ Kill2 ${featError("kill2")? yes : no }
  ぎ Kiss ${featError("kiss")? yes : no }
  ぎ Kiss2 ${featError("kiss2")? yes : no }
  ぎ Lesbian ${featError("lesbian")? yes : no }
  ぎ Lick ${featError("lick")? yes : no }
  ぎ Megumin ${featError("megumin")? yes : no }
  ぎ Neko ${featError("neko")? yes : no }
  ぎ Neko2 ${featError("neko2")? yes : no }
  ぎ Nom ${featError("nom")? yes : no }
  ぎ Pat ${featError("pat")? yes : no }
  ぎ Pat2 ${featError("pat2")? yes : no }
  ぎ Poke ${featError("poke")? yes : no }
  ぎ Punch ${featError("punch")? yes : no }
  ぎ Shinobu ${featError("shinobu")? yes : no }
  ぎ Slap ${featError("slap")? yes : no }
  ぎ Slap2 ${featError("slap2")? yes : no }
  ぎ Smile ${featError("smile")? yes : no }
  ぎ Smug ${featError("smug")? yes : no }
  ぎ Trap ${featError("trap")? yes : no }
  ぎ Waifu ${featError("waifu")? yes : no }
  ぎ Waifu2 ${featError("waifu2")? yes : no }
  ぎ Waifu3 ${featError("waifu3")? yes : no }
  ぎ Wave ${featError("wave")? yes : no }
  ぎ Wink ${featError("wink")? yes : no }
  ぎ Wink2 ${featError("wink2")? yes : no }
  ぎ Yeet ${featError("yeet")? yes : no }
  
  `
}

const storageMenu = (prefix) => {
return `
  乂 *S T O R A G E  M E N U*
  
  ぎ Addowner ${featError("addowner")? yes : no }
  ぎ Addpremium ${featError("addpremium")? yes : no }
  ぎ Addsewa ${featError("addsewa")? yes : no }
  ぎ Addstick ${featError("addstick")? yes : no }
  ぎ Addvn ${featError("addvn")? yes : no }
  ぎ Addlimit ${featError("addlimit")? yes : no }
  ぎ Addbalance ${featError("addbalance")? yes : no }
  ぎ Setcmd ${featError("setcmd")? yes : no }
  ぎ Delowner ${featError("delowner")? yes : no }
  ぎ Depremium ${featError("depremium")? yes : no }
  ぎ Delsewa ${featError("delsewa")? yes : no }
  ぎ Delstick ${featError("delstick")? yes : no }
  ぎ Delvn ${featError("delvn")? yes : no }
  ぎ Dellimit ${featError("dellimit")? yes : no }
  ぎ Delbalance ${featError("delbalance")? yes : no }
  ぎ Delcmd ${featError("delcmd")? yes : no }
  ぎ Listowner ${featError("listowner")? yes : no }
  ぎ Listpremium ${featError("listpremium")? yes : no }
  ぎ Listsewa ${featError("listsewa")? yes : no }
  ぎ Liststick ${featError("liststick")? yes : no }
  ぎ Listvn ${featError("listvn")? yes : no }
  ぎ Listblock ${featError("listblock")? yes : no }  
  ぎ Listban ${featError("listban")? yes : no }  
  ぎ Listblockcmd ${featError("listblockcmd")? yes : no }  
  ぎ Listerror ${featError("listerror")? yes : no }  
  ぎ Clearowner ${featError("clearowner")? yes : no }  
  ぎ Clearpremium ${featError("clearpremium")? yes : no }  
  ぎ Clearsewa ${featError("clearsewa")? yes : no }  
  ぎ Clearstick ${featError("clearstick")? yes : no }  
  ぎ Clearvn ${featError("clearvn")? yes : no }  
  ぎ Clearban ${featError("clearban")? yes : no }  
  ぎ Clearblock ${featError("clearblock")? yes : no }  
  ぎ Clearblockcmd ${featError("clearblockcmd")? yes : no }  
  ぎ Clearerror ${featError("clearerror")? yes : no }  
  
  `
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