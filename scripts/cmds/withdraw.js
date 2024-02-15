module.exports = {
  config: {
    name: "withdraw",
    version: "1.0",
    author: "Marjhxn",
    role: 0,
    shortDescription: "Withdraw money",
    longDescription: "Withdraw money from your account.",
    category: "Economy",
  },
  onStart: async function ({ api, event, args, message }) {
    const replyMessage = `
―――――――――――――――
「 ✦ 𝐎𝐑𝐆𝐀 𝐏𝐀𝐘𝐎𝐔𝐓 ✦ 」

𝐕𝐈𝐀:
1. Gcash
2. Regular Load

𝐑𝐞𝐩𝐥𝐲 𝐰𝐢𝐭𝐡 𝐭𝐡𝐞 𝐍𝐮𝐦𝐛𝐞𝐫 𝐭𝐨 𝐂𝐡𝐨𝐨𝐬𝐞.
―――――――――――――――`;

    const reply = await message.reply(replyMessage);
    const data = {
      commandName: this.config.name,
      messageID: reply.messageID,
    };
    global.GoatBot.onReply.set(reply.messageID, data);
  },
  onReply: async function ({ api, event, Reply, args, message }) {
    const userInput = args[0];

    if (userInput === '1') {
      const gcashForm = `
――――――――――――――――
「 ✦ 𝐏𝐀𝐘𝐎𝐔𝐓 𝐅𝐎𝐑𝐌 ✦ 」

🌐 𝐍𝐀𝐌𝐄:
🌐 𝐆𝐂𝐀𝐒𝐇 𝐍𝐔𝐌𝐁𝐄𝐑:
🌐 𝐏𝐔𝐑𝐄𝐓𝐀𝐒𝐊 𝐓𝐎 𝐖𝐈𝐓𝐇𝐑𝐀𝐖:
🌐 𝐃𝐑𝐁 𝐓𝐎 𝐖𝐈𝐓𝐇𝐑𝐀𝐖:
🌐 𝐃𝐋 𝐍𝐀𝐌𝐄’𝐒:
🌐 𝐔𝐏𝐋𝐈𝐍𝐄 𝐍𝐀𝐌𝐄:
🌐 𝐌𝐄𝐌𝐁𝐄𝐑/𝐎𝐅𝐅𝐈𝐂𝐄𝐑:

Reply with the form.
―――――――――――――――`;

      message.reply(gcashForm);
    } else if (userInput === '2') {
      const regularLoadForm = `
――――――――――――――――
「 ✦ 𝐎𝐑𝐆𝐀 𝐏𝐀𝐘𝐎𝐔𝐓 𝐅𝐎𝐑𝐌 ✦ 」

🌐 𝐍𝐀𝐌𝐄:
🌐 𝐍𝐔𝐌𝐁𝐄𝐑:
🌐 𝐏𝐔𝐑𝐄𝐓𝐀𝐒𝐊 𝐓𝐎 𝐖𝐈𝐓𝐇𝐑𝐀𝐖:
🌐 𝐃𝐑𝐁 𝐓𝐎 𝐖𝐈𝐓𝐇𝐑𝐀𝐖:
🌐 𝐃𝐋 𝐍𝐀𝐌𝐄’𝐒:
🌐 𝐔𝐏𝐋𝐈𝐍𝐄 𝐍𝐀𝐌𝐄:
🌐 𝐌𝐄𝐌𝐁𝐄𝐑/𝐎𝐅𝐅𝐈𝐂𝐄𝐑:

Reply with the form.
―――――――――――――――`;

      message.reply(regularLoadForm);
    } else {
      message.reply("Invalid option. Please reply with either '1' or '2'.");
    }

    // Delete the onReply data to prevent further replies
    global.GoatBot.onReply.delete(Reply.messageID);
  },
};
