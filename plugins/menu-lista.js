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

    let sections = [
      {
        title: "Información del Usuario",
        rows: [
          { title: "Tipo de Registro", description: user.registered === true ? `Registro Completo 🗂️` : 'Registro Rápido 📑' },
          { title: "Mi Estado", description: typeof user.miestado !== 'string' ? 'Sin Registro' : `Me siento ${user.miestado}` },
          { title: "Registrado", description: user.registered === true ? 'Sí' : 'No' },
          { title: "Premium", description: user.premiumTime > 0 ? 'Sí' : 'No' },
          { title: "Rol", description: role },
          { title: "Nivel", description: `${emoji} || ${user.exp - min}/${xp}` },
          { title: "Pareja", description: pareja ? `${name} 💕 ${conn.getName(pareja)}` : 'Sin Pareja' },
          { title: "Pasatiempo(s)", description: user.pasatiempo === 0 ? 'Sin Registro' : user.pasatiempo },
          { title: "Experiencia", description: `${exp - min}/${xp} (restan ${max - exp})` },
          { title: "Límites", description: limit.toString() }
        ]
      },
      {
        title: "Menú de Comandos",
        rows: [
          { title: "Menú Principal", rowId: `${usedPrefix}menu` },
          { title: "Ayuda", rowId: `${usedPrefix}ayuda` },
          { title: "Herramientas", rowId: `${usedPrefix}herramientas` }
        ]
      }
    ];

    let listMessage = {
      text: `🕸️ Bienvenido, ${taguser} 🕸️\n\nUsuario: ${username}\nFecha: ${horarioFecha}\nUptime: ${uptime}\n`,
      footer: 'Abyss - Bot',
      title: 'Información del Usuario',
      buttonText: 'Opciones',
      sections
    };

    if (!/web|desktop|unknown/gi.test(dispositivo)) {
      await conn.sendMessage(m.chat, listMessage, { quoted: m });
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
