const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["repo", "script", "sc"],
    category: "INFO",

    execute: async (sock, m, { reply, config }) => {
        try {
            const imagePath = path.join(__dirname, "../media/repo.jpg");
            const audioPath = path.join(__dirname, "../media/repo.mp3");

            const repoLink = "https://github.com/darkx-pro/DarkX-Ultra.git";
            const ownerNumber = config.ownerNumber;
            const ownerName = config.ownerName;
            const botName = `${config.botName} 👑`;

            // SEND AUDIO FIRST
            if (fs.existsSync(audioPath)) {
                await sock.sendMessage(
                    m.chat,
                    {
                        audio: fs.readFileSync(audioPath),
                        mimetype: "audio/mpeg",
                        ptt: false
                    },
                    { quoted: m }
                );
            }

            const caption = `
*╭━━━〔 👑 DARKX ULTRA SYSTEM 👑 〕━━━⬣*
*┃ ⚡ BOT NAME:* ${botName}
*┃ 👑 OWNER:* ${ownerName}
*┃ 📞 NUMBER:* wa.me/${ownerNumber}
*┃ 🌐 VERSION:* v2.0.2
*┃ 🚀 STATUS:* ONLINE
*┃ 🧠 ENGINE:* Smart Auto Response
*┃ 🔥 TYPE:* WhatsApp Assistant Bot
*╰━━━━━━━━━━━━━━━━━━⬣*

*╭━━━〔 ⚔️ FEATURES LIST ⚔️ 〕━━━⬣*
*┃ ⬡ Fast Response Speed*
*┃ ⬡ Auto AI Chat Mode*
*┃ ⬡ Anti Delete System*
*┃ ⬡ Stylish Menu System*
*┃ ⬡ Plugin Commands*
*┃ ⬡ Group Management*
*┃ ⬡ Media Downloader*
*┃ ⬡ Stable Connection*
*┃ ⬡ Owner Controls*
*┃ ⬡ Clean Performance*
*╰━━━━━━━━━━━━━━━━━━⬣*

*╭━━━〔 📂 REPOSITORY 📂 〕━━━⬣*
*┃ 🔗 GitHub Script:*
${repoLink}
*╰━━━━━━━━━━━━━━━━━━⬣*

> _Powerful • Fast • Clean • DarkX Official_ 🔥
`;

            // SEND IMAGE + INFO
            const imageBuffer = fs.existsSync(imagePath) ? fs.readFileSync(imagePath) : null;
            await sock.sendMessage(
                m.chat,
                {
                    image: imageBuffer || { url: "https://files.catbox.moe/pc5uec.png" },
                    caption: caption,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        externalAdReply: {
                            title: "DARKX-ULTRA 👑",
                            body: "Official Repository & Bot Info",
                            mediaType: 1,
                            thumbnail: imageBuffer || undefined,
                            sourceUrl: repoLink,
                            renderLargerThumbnail: true,
                            showAdAttribution: true
                        }
                    }
                },
                { quoted: m }
            );

        } catch (err) {
            console.error("Repo Command Error:", err);

            await sock.sendMessage(
                m.chat,
                { text: "❌ Repo command failed." },
                { quoted: m }
            );
        }
    }
};