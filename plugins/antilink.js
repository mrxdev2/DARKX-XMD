const { updateSettings } = require("../library/settingsStore");

module.exports = {
    command: ["antilink"],
    category: "owner",
    isOwner: true,
    description: "Toggle anti-link protection for all groups this number manages (default OFF)",
    execute: async (sock, m, { args, reply, config, sessionId }) => {
        const choice = (args[0] || "").toLowerCase();

        if (choice === "on") {
            updateSettings(sessionId, { antilink: true });
            return reply("✅ Anti-Link has been turned ON. Non-admins posting links will be removed.");
        }
        if (choice === "off") {
            updateSettings(sessionId, { antilink: false });
            return reply("📴 Anti-Link has been turned OFF.");
        }
        return reply(`🔗 Anti-Link is currently: *${config.antilink ? "ON" : "OFF"}*\n\nUse:\n${config.prefix}antilink on\n${config.prefix}antilink off`);
    }
};
