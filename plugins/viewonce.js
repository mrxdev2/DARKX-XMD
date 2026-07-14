"use strict";

/**
 * Command: .vv / .viewonce
 * Function: Reveals a quoted "View Once" message (image/video/audio)
 */

const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = {
    command: ["vv", "viewonce", "reveal"],
    isOwner: false, // badilisha kuwa true kama unataka owner pekee
    isGroup: false,
    execute: async (sock, m, { reply, chat, isOwner }) => {
        try {
            // Lazima mtumiaji arudishe (reply) kwenye ujumbe wa ViewOnce
            const quoted = m.quoted ? m.quoted : m;
            const mtype = quoted.mtype || Object.keys(quoted.message || {})[0];

            // Angalia aina tofauti za ViewOnce (V1, V2, V2 Extension)
            let viewOnceMsg =
                quoted.message?.viewOnceMessageV2?.message ||
                quoted.message?.viewOnceMessageV2Extension?.message ||
                quoted.message?.viewOnceMessage?.message ||
                null;

            if (!viewOnceMsg) {
                return reply("❌ Tafadhali *reply* kwenye ujumbe wa *View Once* (picha/video/voice) kisha tuma *.vv*");
            }

            // Tambua aina ya media ndani ya viewOnce
            const type = Object.keys(viewOnceMsg)[0]; // imageMessage | videoMessage | audioMessage
            const media = viewOnceMsg[type];

            if (!media) {
                return reply("❌ Sikuweza kusoma media ya ujumbe huu.");
            }

            // Pakua content ya media
            const stream = await downloadContentFromMessage(
                media,
                type === "imageMessage" ? "image" :
                type === "videoMessage" ? "video" : "audio"
            );

            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            // Tuma tena kama ujumbe wa kawaida (siyo ViewOnce tena)
            const caption = media.caption ? `🔓 *View Once Revealed*\n\n${media.caption}` : "🔓 *View Once Revealed*";

            if (type === "imageMessage") {
                await sock.sendMessage(chat, { image: buffer, caption }, { quoted: m });
            } else if (type === "videoMessage") {
                await sock.sendMessage(chat, { video: buffer, caption }, { quoted: m });
            } else if (type === "audioMessage") {
                await sock.sendMessage(chat, { audio: buffer, mimetype: "audio/ogg; codecs=opus", ptt: true }, { quoted: m });
            } else {
                return reply("⚠️ Aina hii ya media haitumiki kwa sasa.");
            }

        } catch (err) {
            console.error("VIEWONCE ERROR:", err);
            reply("❌ Imeshindwa kufungua View Once. Hakikisha ume-reply kwenye ujumbe sahihi.");
        }
    }
};
