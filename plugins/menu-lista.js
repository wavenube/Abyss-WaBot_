// Botones interactivos adaptados y funcionando por Gata Dios (GataNina-Li)

import { getDevice } from '@whiskeysockets/baileys';
import fs from 'fs';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
import PhoneNumber from 'awesome-phonenumber';
import { promises } from 'fs';
import { join } from 'path';

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
  const dispositivo = await getDevice(m.key.id);
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {};
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);
    let d = new Date(Date.now() + 3600000);
    let locale = 'es';
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    let dateIslamic = Intl.DateTimeFormat(`${locale}-TN-u-ca-islamic`, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d);
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    let _uptime = process.uptime() * 1000;
    let _muptime;
    if (process.send) {
      process.send('uptime');
      _muptime = await new Promise(resolve => {
        process.once('message', resolve);
        setTimeout(resolve, 1000);
      }) * 1000;
    }
    let { money, joincount } = global.db.data.users[m.sender];
    let user = global.db.data.users[m.sender];
    let muptime = clockString(_muptime);
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
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
    };
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join('|')})`, 'g'), (_, name) => '' + replace[name]);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let mentionedJid = [who];
    let username = conn.getName(who);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let pp = gataVidMenu;
    let vn = 'https://qu.ax/bfaM.mp3';
    let pareja = global.db.data.users[m.sender].pasangan;

    const numberToEmoji = { "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣", "4": "4️⃣", "5": "5️⃣", "6": "6️⃣", "7": "7️⃣", "8": "8️⃣", "9": "9️⃣" };
    let lvl = level;
    let emoji = Array.from(lvl.toString()).map((digit) => numberToEmoji[digit] || "❓").join("");

    const lugarFecha = moment().tz('America/Lima');
    const formatoFecha = {
      weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    };
    lugarFecha.locale('es', formatoFecha);
    const horarioFecha = lugarFecha.format('dddd, DD [de] MMMM [del] YYYY || HH:mm A').replace(/^\w/, (c) => c.toUpperCase());

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
⬛ *𝗘𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗶𝗮:* ${exp - min}/${xp} (restan ${max - exp})
⬛ *𝗟𝗶𝗺𝗶𝘁𝗲𝘀:* ${limit}

═══════════════
║ *🕹️ 𝕸𝖊𝖓𝖚 𝖉𝖊 𝕮𝖔𝖒𝖆𝖓𝖉𝖔𝖘 🕹️*
║  ${usedPrefix}menu
═══════════════
║ *ℹ️ 𝕴𝖓𝖋𝖔𝖗𝖒𝖆𝖈𝖎𝖔𝖓 ℹ️*
║  ${usedPrefix}ayuda
═══════════════
║ *🛠️ 𝖀𝖙𝖎𝖑𝖎𝖙𝖆𝖗 𝖙𝖔𝖔𝖑𝖘 🛠️*
║  ${usedPrefix}herramientas
═══════════════

*𝕬𝖇𝖞𝖘𝖘 - 𝕭𝖔𝖙*
`.trim();

      await conn.sendFile(m.chat, pp, 'gata.jpg', menu, m, false, {
        contextInfo: { mentionedJid }
      });
    } else {
      // ...
    }

  } catch (e) {
    console.error(e);
  }
};

handler.command = /^(prueba|test)$/i;
export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

function readMore() {
  return '...';
}
