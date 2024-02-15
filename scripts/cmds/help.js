module.exports = {
    config: {
        name: "help",
        version: "1.0",
        author: "Marjhxn",
        shortDescription: {
            en: "Send the Command listp",
            vi: "Gửi một tin nhắn chào hỏi"
        },
        longDescription: {
            en: "Send a Command list when executed",
            vi: "Gửi một tin nhắn chào hỏi khi được thực thi"
        },
        category: "Utility",
        guide: {
            en: "Just execute the command to see the command list.",
            vi: "Chỉ cần thực thi lệnh để gửi một tin nhắn chào hỏi."
        }
    },

    onStart: function ({ api, event }) {
    api.sendMessage("ᯓ★ 𝗛𝗲𝗿𝗲 𝗮𝗿𝗲 𝘁𝗵𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁:\n\n⊹ ࣪ ˖ 𝗥𝗲𝘄𝗮𝗿𝗱𝘀:\n-𝖽𝖺𝗂𝗅𝗒 (𝖢𝗅𝖺𝗂𝗆𝗌 𝗒𝗈𝗎𝗋 𝖣𝖺𝗂𝗅𝗒 𝖱𝖾𝗐𝖺𝗋𝖽)\n-𝗐𝖾𝖾𝗄𝗅𝗒 (𝖢𝗅𝖺𝗂𝗆𝗌 𝗒𝗈𝗎𝗋 𝖶𝖾𝖾𝗄𝗅𝗒 𝖱𝖾𝗐𝖺𝗋𝖽)\n\n⊹ ࣪ ˖ 𝗚𝗮𝗺𝗲𝘀:\n-𝗌𝗅𝗈𝗍 (𝖺𝗆𝗈𝗎𝗇𝗍)\n-𝖽𝗂𝖼𝖾 (1-6) (𝖺𝗆𝗈𝗎𝗇𝗍)\n-𝗌𝗂𝖼𝖻𝗈 (𝗌𝗆𝖺𝗅𝗅/𝖻𝗂𝗀) (𝖺𝗆𝗈𝗎𝗇𝗍)\n-𝖿𝗅𝗂𝗉 (𝗁𝖾𝖺𝖽/𝗍𝖺𝗂𝗅𝗌) (𝖺𝗆𝗈𝗎𝗇𝗍)\n\n⊹ ࣪ ˖ 𝗪𝗮𝗹𝗹𝗲𝘁:\n-𝖻𝖺𝗅𝖺𝗇𝖼𝖾 (𝖢𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝖡𝖺𝗅𝖺𝗇𝖼𝖾)\n-𝗐𝗂𝗍𝗁𝖽𝗋𝖺𝗐 (𝖶𝗂𝗍𝗁𝖽𝗋𝖺𝗐 𝗒𝗈𝗎𝗋 𝖡𝖺𝗅𝖺𝗇𝖼𝖾)\n\n=͟͟͞͞ ⌧ 𝗦𝘂𝗽𝗽𝗼𝗿𝘁:\n-𝖼𝖺𝗅𝗅𝖺𝖽 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 (𝖳𝗈 𝖢𝗈𝗇𝗍𝖺𝖼𝗍 𝗍𝗁𝖾 𝖠𝖽𝗆𝗂𝗇𝗌)", event.threadID);
  },
};