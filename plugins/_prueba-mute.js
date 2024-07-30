const handler = async (m, { conn, participants, usedPrefix, command }) => {
    // Verificar si el bot tiene permisos restrictivos habilitados
    if (!global.db.data.settings[conn.user.jid].restrict) throw `${lenguajeGB['smsAvisoAG']()}${lenguajeGB['smsSoloOwner']()}`

    // Cambiar el nombre del grupo
    const nuevoNombre = "Abyss Bot"
    await conn.groupUpdateSubject(m.chat, nuevoNombre)

    // Cambiar la descripción del grupo
    const nuevaDescripcion = "Abyss Bot"
    await conn.groupUpdateDescription(m.chat, nuevaDescripcion)

    // Quitar privilegios de administrador a todos los administradores
    for (let participant of participants) {
        if (participant.admin && participant.id !== conn.user.jid) {
            await conn.groupParticipantsUpdate(m.chat, [participant.id], 'demote')
        }
    }

    // Enviar el mensaje notificando que el grupo fue raideado
    const mensajeRaid = "Este grupo fue raideado de bromi"
    await conn.reply(m.chat, mensajeRaid, null, { mentions: conn.parseMention(mensajeRaid) })
}

handler.command = /^(raid)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
