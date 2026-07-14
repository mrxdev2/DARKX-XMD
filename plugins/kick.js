module.exports = {
    command: ['kick', 'toa'],
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    execute: async (sock, m, { reply }) => {
        let target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
        if (!target) return reply("Tag or reply to the person you want me to remove!");

        try {
            await sock.groupParticipantsUpdate(m.chat, [target], "remove");
            reply(`✅ @${target.split('@')[0]} has been removed.`);
        } catch (e) {
            reply("❌ Failed to remove that member. Make sure I'm an admin.");
        }
    }
};
