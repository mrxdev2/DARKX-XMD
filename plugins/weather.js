const axios = require('axios');

module.exports = {
    command: ["weather"],
    category: "tools",
    description: "Get the current weather for a city",
    execute: async (sock, m, { args, reply, prefix }) => {
        const city = args.join(' ');
        if (!city) return reply(`Please provide a city name! Example: ${prefix}weather London`);

        try {
            await sock.sendMessage(m.chat, { react: { text: "🌦️", key: m.key } });
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=06af69666874483e03405443492f310a`);

            const { name, main, weather, wind } = res.data;
            let report = `乂  *W E A T H E R  R E P O R T* 乂\n\n`;
            report += `📍 *City:* ${name}\n`;
            report += `🌡️ *Temperature:* ${main.temp}°C\n`;
            report += `☁️ *Condition:* ${weather[0].description}\n`;
            report += `💧 *Humidity:* ${main.humidity}%\n`;
            report += `💨 *Wind:* ${wind.speed} m/s`;

            await sock.sendMessage(m.chat, { text: report }, { quoted: m });
        } catch (e) {
            await reply("Couldn't find that city. Please check the spelling and try again.");
        }
    }
};
