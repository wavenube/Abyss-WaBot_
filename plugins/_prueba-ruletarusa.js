const games = {}; // Objeto para almacenar los juegos activos

const handler = async (m, { conn, command, participants }) => {
    const chatId = m.chat;

    // Verificar si ya hay un juego activo en el grupo
    if (games[chatId]) return m.reply('Ya hay un juego de ruleta rusa en curso. Espera a que termine.');

    // Iniciar el juego
    games[chatId] = {
        players: [],
        isWaiting: true
    };
    m.reply('Juego de ruleta rusa iniciado. Esperando a 3 jugadores más. Usa el comando "add" para unirte.');

    // Función para manejar el comando "add"
    const addHandler = async (m) => {
        if (!games[chatId] || !games[chatId].isWaiting) return;

        const playerId = m.sender;
        if (games[chatId].players.includes(playerId)) return m.reply('Ya estás en el juego.');

        games[chatId].players.push(playerId);
        m.reply(`Jugador añadido. Jugadores actuales: ${games[chatId].players.length}/4`);

        if (games[chatId].players.length === 4) {
            games[chatId].isWaiting = false;
            startGame(chatId);
        }
    };

    // Registrar el handler para "add"
    conn.handler = (m) => {
        if (m.text.toLowerCase() === 'addruleta') addHandler(m);
    };

    // Función para iniciar el juego
    const startGame = async (chatId) => {
        const players = games[chatId].players;
        const unluckyPlayer = players[Math.floor(Math.random() * players.length)];

        // Expulsar al jugador desafortunado
        await conn.groupParticipantsUpdate(chatId, [unluckyPlayer], 'remove');
        conn.reply(chatId, `El jugador @${unluckyPlayer.split('@')[0]} ha sido expulsado.`, null, { mentions: [unluckyPlayer] });

        // Limpiar el juego
        delete games[chatId];
    };
};

handler.command = /^(ruletarusa)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
