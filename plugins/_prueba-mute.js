const handler = async (m, { conn, participants, usedPrefix, command, text }) => {
    if (!global.db.data.settings[conn.user.jid].restrict) throw `${lenguajeGB['smsAvisoAG']()}${lenguajeGB['smsSoloOwner']()}`
    let [time, unit] = text.split(' ')
    time = parseInt(time)

    if (isNaN(time) || !['s', 'm', 'h', 'd'].includes(unit)) return m.reply(`Uso: ${usedPrefix + command} <número> <s|m|h|d> @usuario`, m.chat)

    let duration = time * ({
        s: 1,
        m: 60,
        h: 3600,
        d: 86400
    })[unit] * 1000

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    if (!user) return m.reply(`Uso: ${usedPrefix + command} <número> <s|m|h|d> @usuario`, m.chat)

    if (m.mentionedJid.includes(conn.user.jid)) return

    try {
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        setTimeout(async () => {
            await conn.groupParticipantsUpdate(m.chat, [user], 'add')
        }, duration)
        m.reply(`Usuario @${user.split('@')[0]} ha sido silenciado por ${time} ${unit}`, null, { mentions: [user] })
    } catch (e) {
        m.reply('Hubo un error al intentar silenciar al usuario.')
    }
}

handler.command = /^(mute|silenciar)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
