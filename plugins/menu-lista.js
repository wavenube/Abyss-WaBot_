// Botones interactivos adptados y funcionando por Gata Dios (GataNina-Li)

import { getDevice } from '@whiskeysockets/baileys'
import fs from 'fs'
import moment from 'moment-timezone'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
const dispositivo = await getDevice(m.key.id)
try {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money, joincount } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let pp = gataVidMenu
let vn = 'https://qu.ax/bfaM.mp3'
let pareja = global.db.data.users[m.sender].pasangan 
//let fsizedoc = '1'.repeat(10)
//let adReply = { fileLength: fsizedoc, seconds: fsizedoc, contextInfo: { forwardingScore: fsizedoc, externalAdReply: { showAdAttribution: true, title: wm, body: '👋 ' + username, mediaUrl: ig, description: 'Hola', previewType: 'PHOTO', thumbnail: await(await fetch(gataMenu.getRandom())).buffer(), sourceUrl: redesMenu.getRandom() }}}
const numberToEmoji = { "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣", "4": "4️⃣", "5": "5️⃣", "6": "6️⃣", "7": "7️⃣", "8": "8️⃣", "9": "9️⃣", }
let lvl = level
let emoji = Array.from(lvl.toString()).map((digit) => numberToEmoji[digit] || "❓").join("")

const lugarFecha = moment().tz('America/Lima')
const formatoFecha = {
weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
}
lugarFecha.locale('es', formatoFecha)
const horarioFecha = lugarFecha.format('dddd, DD [de] MMMM [del] YYYY || HH:mm A').replace(/^\w/, (c) => c.toUpperCase())

if (!/web|desktop|unknown/gi.test(dispositivo)) {  
let menu = `
╔═════ ∘◦ ✾ ◦∘ ══════╗
║        𝐀𝐛𝐲𝐬𝐬 - 𝐁𝐨𝐭        
╚═════ ∘◦ ❈ ◦∘ ══════╝

🕸️ *𝓦𝓮𝓵𝓬𝓸𝓶𝓮, ${taguser}* 🕸️

║⬛ 𝗨𝘀𝗲𝗿: ${username}
║⬛ 𝗗𝗮𝘁𝗲: ${horarioFecha}
║⬛ 𝗨𝗽𝘁𝗶𝗺𝗲: ${uptime}

══════════════
𝕴𝖓𝖋𝖔𝖗𝖒𝖆𝖈𝖎𝖔𝖓 𝖉𝖊𝖑 𝖀𝖘𝖚𝖆𝖗𝖎𝖔
══════════════

⬛ *𝗧𝗶𝗽𝗼 𝗱𝗲 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼:*
${user.registered === true ? `_${user.registroC === true ? 'Registro Completo 🗂️' : 'Registro Rápido 📑'}_` : '❌ _Sin registro_'}
⬛ *𝗠𝗶 𝗲𝘀𝘁𝗮𝗱𝗼:* ${typeof user.miestado !== 'string' ? '❌ _' + usedPrefix + 'miestado_' : '_Me siento ' + user.miestado + '_'}
⬛ *𝗥𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼:* ${user.registered === true ? '✅' : '❌ _' + usedPrefix + 'verificar_'}
⬛ *𝗣𝗿𝗲𝗺𝗶𝘂𝗺:* ${user.premiumTime > 0 ? '✅' : '❌ _' + usedPrefix + 'pase premium_'}
⬛ *𝗥𝗼𝗹:* ${role}
⬛ *𝗡𝗶𝘃𝗲𝗹:* ${emoji} || ${user.exp - min}/${xp}
⬛ *𝗣𝗮𝗿𝗲𝗷𝗮:* ${pareja ? `\n*»* ${name} 💕 ${conn.getName(pareja)}` : `🛐 ${lenguajeGB['smsResultPareja']()}`}
⬛ *𝗣𝗮𝘀𝗮𝘁𝗶𝗲𝗺𝗽𝗼(𝘀):* ➺ ${user.pasatiempo === 0 ? '*Sin Registro*' : user.pasatiempo + '\n'}
⬛ *𝗘𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗶𝗮:* ${exp} ⚡
⬛ *𝗗𝗶𝗮𝗺𝗮𝗻𝘁𝗲𝘀:* ${limit} 💎
⬛ *𝗚𝗮𝘁𝗮𝗖𝗼𝗶𝗻𝘀:* ${money} 🐈
⬛ *𝗧𝗼𝗸𝗲𝗻𝘀:* ${joincount} 🪙

══════════════
𝕺𝖕𝖈𝖎𝖔𝖓𝖊𝖘 𝖉𝖊𝖑 𝕸𝖊𝖓𝖚
══════════════

⛧ _${usedPrefix}menucompleto | allmenu_
⛧ _${usedPrefix}menuaudio | menuaudios_
⛧ _${usedPrefix}infomenu_
⛧ _${usedPrefix}juegosmenu_
⛧ _${usedPrefix}serxgrupos_

══════════════
⛤ *${vs}* 
> ║⬛ *_𝐀𝐁𝐘𝐒𝐒 - 𝐁𝐎𝐓_* ⛤
> ║⬛ *_𝗖𝗥𝗘𝗔𝗗𝗢𝗥 𝗢𝗙𝗖._* ${ig}
> ║⬛ *_𝗥𝗘𝗗𝗘𝗦 𝗢𝗙𝗖._* ${wm}
> ╚══════════════ `.trim()
      
const buttonParamsJson = JSON.stringify({
title: "VER LISTA",
description: "Infórmate por medios oficiales sobre GataBot",
sections: [
{ title: "ℹ️ Información", highlight_label: "Popular",
rows: [
{ header: "✅ Redes", title: "🔓 Para: Todos", description: "Infórmate por medios oficiales sobre GataBot", id: usedPrefix + "cuentasgb" },
{ header: "📢 Grupos/Canales", title: "🔓 Para: Todos", description: "¡Te esperamos!", id: usedPrefix + "grupos" },
{ header: "🎁 Donar", title: "🔓 Para: Todos", description: "GataBot se mantiene funcionando gracias a donaciones ¡tú también puedes sumarte apoyando el proyecto!", id: usedPrefix + "donar" }
]},
{ title: "🔖 Atajos", highlight_label: "Popular",
rows: [
{ header: "🆕 Ser Bot (código)", title: "🔓 Para: Todos", description: "¡Conviértete en Bot con el método de código de 8 dígitos!", id: usedPrefix + "serbot --code" },
{ header: "🤖 Ser Bot (qr)", title: "🔓 Para: Todos", description: "Forma estándar de ser bot con código QR", id: usedPrefix + "serbot" },
{ header: "🚄 Velocidad", title: "🔓 Para: Todos", description: "Seleccione esto si desea saber el ping del Bot", id: usedPrefix + "ping" },
{ header: "🚀 Estado", title: "🔓 Para: Todos", description: "Conoce en que estado se encuentra GataBot", id: usedPrefix + "estado" }
]},
{ title: "Ⓜ️ Menú", highlight_label: "Popular",
rows: [
{ header: "⭐ Menú completo", title: "", description: "Visita todos los comandos", id: usedPrefix + "allmenu" }
]}
]})
const interactiveMessage = {
body: { text: menu },
footer: { text: wm + ` \nSi algo no funciona utilice el comando *${usedPrefix}menu2*` },
header: { title: `⭐ *------- NUEVO MENÚ -------* ⭐\n${lenguajeGB['smsConfi2']()} *${user.genero === 0 ? '👤' : user.genero == 'Ocultado 🕶️' ? `🕶️` : user.genero == 'Mujer 🚺' ? `🚺` : user.genero == 'Hombre 🚹' ? `🚹` : '👤'} ${user.registered === true ? user.name : taguser} 💖*`, subtitle: "test4", hasMediaAttachment: false },
nativeFlowMessage: { buttons: [{ 
name: "single_select",
buttonParamsJson
}]
}}
const message = { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 }, interactiveMessage }
await conn.relayMessage(m.chat, { viewOnceMessage: { message } }, {})
      
} else { 
let menu = `${lenguajeGB['smsConfi2']()} *${user.genero === 0 ? '👤' : user.genero == 'Ocultado 🕶️' ? `🕶️` : user.genero == 'Mujer 🚺' ? `🚺` : user.genero == 'Hombre 🚹' ? `🚹` : '👤'} ${user.registered === true ? user.name : taguser} 💖*

╔═════ ∘◦ ✾ ◦∘ ══════╗
║        𝐀𝐛𝐲𝐬𝐬 - 𝐁𝐨𝐭        
╚═════ ∘◦ ❈ ◦∘ ══════╝

🕸️ *𝓦𝓮𝓵𝓬𝓸𝓶𝓮, ${taguser}* 🕸️

║⬛ 𝗨𝘀𝗲𝗿: ${username}
║⬛ 𝗗𝗮𝘁𝗲: ${horarioFecha}
║⬛ 𝗨𝗽𝘁𝗶𝗺𝗲: ${uptime}

══════════════
𝕴𝖓𝖋𝖔𝖗𝖒𝖆𝖈𝖎𝖔𝖓 𝖉𝖊𝖑 𝖀𝖘𝖚𝖆𝖗𝖎𝖔
══════════════

⬛ *𝗧𝗶𝗽𝗼 𝗱𝗲 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼:*
${user.registered === true ? `_${user.registroC === true ? 'Registro Completo 🗂️' : 'Registro Rápido 📑'}_` : '❌ _Sin registro_'}
⬛ *𝗠𝗶 𝗲𝘀𝘁𝗮𝗱𝗼:* ${typeof user.miestado !== 'string' ? '❌ _' + usedPrefix + 'miestado_' : '_Me siento ' + user.miestado + '_'}
⬛ *𝗥𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼:* ${user.registered === true ? '✅' : '❌ _' + usedPrefix + 'verificar_'}
⬛ *𝗣𝗿𝗲𝗺𝗶𝘂𝗺:* ${user.premiumTime > 0 ? '✅' : '❌ _' + usedPrefix + 'pase premium_'}
⬛ *𝗥𝗼𝗹:* ${role}
⬛ *𝗡𝗶𝘃𝗲𝗹:* ${emoji} || ${user.exp - min}/${xp}
⬛ *𝗣𝗮𝗿𝗲𝗷𝗮:* ${pareja ? `\n*»* ${name} 💕 ${conn.getName(pareja)}` : `🛐 ${lenguajeGB['smsResultPareja']()}`}
⬛ *𝗣𝗮𝘀𝗮𝘁𝗶𝗲𝗺𝗽𝗼(𝘀):* ➺ ${user.pasatiempo === 0 ? '*Sin Registro*' : user.pasatiempo + '\n'}
⬛ *𝗘𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗶𝗮:* ${exp} ⚡
⬛ *𝗗𝗶𝗮𝗺𝗮𝗻𝘁𝗲𝘀:* ${limit} 💎
⬛ *𝗚𝗮𝘁𝗮𝗖𝗼𝗶𝗻𝘀:* ${money} 🐈
⬛ *𝗧𝗼𝗸𝗲𝗻𝘀:* ${joincount} 🪙

══════════════
𝕺𝖕𝖈𝖎𝖔𝖓𝖊𝖘 𝖉𝖊𝖑 𝕸𝖊𝖓𝖚
══════════════

⛧ _${usedPrefix}menucompleto | allmenu_
⛧ _${usedPrefix}menuaudio | menuaudios_
⛧ _${usedPrefix}infomenu_
⛧ _${usedPrefix}juegosmenu_
⛧ _${usedPrefix}serxgrupos_

══════════════
⛤ *${vs}* 
> ║⬛ *_𝐀𝐁𝐘𝐒𝐒 - 𝐁𝐎𝐓_* ⛤
> ║⬛ *_𝗖𝗥𝗘𝗔𝗗𝗢𝗥 𝗢𝗙𝗖._* ${ig}
> ║⬛ *_𝗥𝗘𝗗𝗘𝗦 𝗢𝗙𝗖._* ${wm}
> ╚══════════════ 

*╭━〔 ⬛ OPCIONES DE MENÚ ⬛ 〕⬣
┃
┃🌑 MENÚ COMPLETO 🌑
┃➺ ${usedPrefix}menucompleto | allmenu
┃
┃🔊 MENÚ DE AUDIOS 🔊
┃➺ ${usedPrefix}menuaudio | menuaudios
┃
┃💫 ${lenguajeGB'smsTex13'} 💫
┃➺ ${usedPrefix}infomenu
┃
┃👾 ${lenguajeGB'smsTex10'} 👾
┃➺ ${usedPrefix}juegosmenu
┃
┃🚀 ${lenguajeGB'smsTex9'} 🚀
┃➺ ${usedPrefix}descargasmenu
┃
┃🔐 ${lenguajeGB'smsTex11'} 🔐
┃➺ ${usedPrefix}grupomenu
┃
┃🧸 ${lenguajeGB'smsTex22'} 🧸
┃➺ ${usedPrefix}stickermenu
┃
┃🛠️ ${lenguajeGB'smsTex12'} 🛠️
┃➺ ${usedPrefix}herramientasmenu
┃
┃⛩️ ${lenguajeGB'smsTex23'} ⛩️
┃➺ ${usedPrefix}randommenu
┃
┃🛰️ ${lenguajeGB'smsTex8'} 🛰️
┃➺ ${usedPrefix}convertidormenu
┃
┃🎈 ${lenguajeGB'smsTex1'} 🎈
┃➺ ${usedPrefix}buscarmenu
┃
┃🎧 ${lenguajeGB'smsTex2'} 🎧
┃➺ ${usedPrefix}audioefectomenu
┃
┃🔞 ${lenguajeGB'smsTex3'} 🔞
┃➺ ${usedPrefix}menu18 | hornymenu
┃
┃⚗️ ${lenguajeGB'smsTex21'} ⚗️
┃➺ ${usedPrefix}rpgmenu
┃
┃⛺ ${lenguajeGB'smsTex14'} ⛺
┃➺ ${usedPrefix}makermenu
┃
┃💮 ${lenguajeGB'smsTex15'} 💮
┃➺ ${usedPrefix}menulogos2
┃
┃🌅 ${lenguajeGB'smsTex15'} 🌅
┃➺ ${usedPrefix}menulogos2
┃
┃💎 ${lenguajeGB'smsTex20'} 💎
┃➺ ${usedPrefix}ownermenu
┃
┃✅ CUENTAS OFICIALES GATABOT ✅
┃➺ ${usedPrefix}cuentasgatabot | cuentasgb
┃
╰━━━━━━━━━━━━━⬣*`.trim()
await conn.sendFile(m.chat, gataImg, 'lp.jpg', menu, fkontak, false, { contextInfo: {mentionedJid, externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: imagen4, sourceUrl: redesMenu}}}) 
await conn.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m }) 
//conn.sendFile(m.chat, gataVidMenu.getRandom(), 'gata.mp4', menu, fkontak)
}} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /^(menu|menú|memu|memú|help\?)$/i
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}  
