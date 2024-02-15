module.exports = {
  config: {
    name: "slot",
    version: "1.0",
    author: "OtinXSandip",
    countDown: 5,
    shortDescription: {
      en: "Slot game",
    },
    longDescription: {
      en: "Slot game.",
    },
    category: "Game",
  },
  langs: {
    en: {
      invalid_amount: "「 ✦ 𝐒𝐋𝐎𝐓𝐒 ✦ 」\n\n𝐄𝐧𝐭𝐞𝐫 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐧𝐝 𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐞 𝐚𝐦𝐨𝐮𝐧𝐭 𝐭𝐨 𝐡𝐚𝐯𝐞 𝐚 𝐜𝐡𝐚𝐧𝐜𝐞 𝐭𝐨 𝐰𝐢𝐧 𝐝𝐨𝐮𝐛𝐥𝐞",
      not_enough_money: "「 ✦ 𝐒𝐋𝐎𝐓𝐒 ✦ 」\n\n𝐂𝐡𝐞𝐜𝐤 𝐲𝐨𝐮𝐫 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 𝐢𝐟 𝐲𝐨𝐮 𝐡𝐚𝐯𝐞 𝐭𝐡𝐚𝐭 𝐚𝐦𝐨𝐮𝐧𝐭",
      spin_message: "Spinning...",
      win_message: "╔════ ≪ 𝐘𝐎𝐔 𝐖𝐎𝐍 $%1! ≫ ════╗\n\n",
      lose_message: "╔════ ≪ 𝐘𝐨𝐮 𝐋𝐨𝐬𝐭 $%1 ≫ ════╗\n\n",
      jackpot_message: "「 💲 𝐒𝐋𝐎𝐓𝐒 𝐑𝐄𝐒𝐔𝐋𝐓 💲 」\n\n𝐉𝐀𝐂𝐊𝐏𝐎𝐓! \n\n𝐘𝐎𝐔 𝐖𝐎𝐍 $%1 𝐖𝐈𝐓𝐇 𝐓𝐇𝐑𝐄𝐄 %2 𝐒𝐘𝐌𝐁𝐎𝐋𝐒!",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const slots = ["🎰", "💰", "🍒", "💰", "🎰", "🍒", "🍒", "💰", "🎰"];
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];

    const winnings = calculateWinnings(slot1, slot2, slot3, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === "🎰" && slot2 === "🎰" && slot3 === "🎰") {
    return betAmount * 10;
  } else if (slot1 === "💰" && slot2 === "💰" && slot3 === "💰") {
    return betAmount * 5;
  } else if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === "🍒" && slot2 === "🍒" && slot3 === "🍒") {
      return getLang("jackpot_message", winnings, "🍒");
    } else {
      return getLang("win_message", winnings) + `\〘 ${slot1} 〙〘 ${slot2} 〙〘 ${slot3} 〙\n\n   ╚════ ≪ °❈° ≫ ════╝`;
    }
  } else {
    return getLang("lose_message", -winnings) + `\〘 ${slot1} 〙〘 ${slot2} 〙〘 ${slot3} 〙\n\n   ╚════ ≪ °❈° ≫ ════╝`;
  }
        }