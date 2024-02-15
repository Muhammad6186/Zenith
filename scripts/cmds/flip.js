module.exports = {
  config: {
    name: "flip",
    version: "1.0",
    author: "Marjhxn",
    countDown: 5,
    shortDescription: {
      en: "Bet on a coin flip!",
    },
    longDescription: {
      en: "Try your luck with a coin flip game!",
    },
    category: "Game",
  },
  langs: {
    en: {
      invalid_amount: "Please enter a valid and positive amount to bet.",
      not_enough_money: "You don't have enough 💰 to place that bet.",
      flipping_coin: "Flipping the coin...",
      win_message: "Congratulations! You won $%1! 🎉",
      lose_message: "Sorry, you lost $%1. 😔",
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

    const result = flipCoin();
    const winnings = calculateWinnings(result, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getFlipResultMessage(result, winnings, getLang);

    return message.reply(messageText);
  },
};

function flipCoin() {
  return Math.random() < 0.5 ? "heads" : "tails";
}

function calculateWinnings(result, betAmount) {
  // If the result is "heads", the user wins double their bet amount
  // If the result is "tails", the user loses their bet amount
  return result === "heads" ? betAmount * 2 : -betAmount;
}

function getFlipResultMessage(result, winnings, getLang) {
  if (winnings > 0) {
    return getLang("win_message", winnings) + ` The coin landed on ${result}! 🎉`;
  } else {
    return getLang("lose_message", -winnings) + ` The coin landed on ${result}. Better luck next time! 😔`;
  }
}
