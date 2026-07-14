const { getMediaFromMessage } = require("../library/media");

module.exports = {
    command: ["setgpp", "setgpic", "grouppp"],
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    description: "Change the group's profile picture (reply to an image)",
    execute: async (sock, m, { reply }) => {
        try {
            const media = await getMediaFromMessage(sock, m);
            if (!media || !/image/.test(media.mimetype || "")) {
                return reply("❌ Please reply to an *image* using .setgpp");
            }

            await sock.sendMessage(m.chat, { react: { text: "🖼️", key: m.key } });
            await sock.updateProfilePicture(m.chat, media.buffer);

            await sock.sendMessage(m.chat, {
                text: "✅ *Group profile picture updated successfully!*"
            }, { quoted: m });

        } catch (err) {
            console.error("setgpp error:", err);
            reply("❌ Failed to change the picture. Make sure it's a valid image and I'm an admin.");
        }
    }
};
