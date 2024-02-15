module.exports = {
  config: {
    name: "dice",
    version: "1.0",
    author: "Marjhxn",
    countDown: 5,
    shortDescription: {
      en: "Roll the 🎲 game",
    },
    longDescription: {
      en: "Roll the 🎲 and win big!",
    },
    category: "Game",
  },
  langs: {
    en: {
      invalid_bet: "Please enter a valid bet in the format `/dice <number> <amount>`.",
      not_enough_money: "You don't have enough 💰 to place that bet.",
      rolling_dice: "Rolling the 🎲...",
      win_message: "Congratulations! You guessed correctly and won $%1! 🎉",
      lose_message: "Sorry, you guessed incorrectly and lost $%1. 😔",
      near_win_message: "Close enough! You win $%1. 🎉",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    // Check if the correct number of arguments is provided
    if (args.length !== 2) {
      return message.reply(getLang("invalid_bet"));
    }

    const number = parseInt(args[0]);
    const amount = parseInt(args[1]);

    // Check if the inputs are valid numbers
    if (isNaN(number) || isNaN(amount) || number < 1 || number > 6 || amount <= 0) {
      return message.reply(getLang("invalid_bet"));
    }

    // Check if the user has enough money
    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const diceResult = rollDice();
    const winnings = calculateWinnings(number, diceResult, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getRollResultMessage(number, diceResult, winnings, getLang);

    return message.reply(messageText);
  },
};

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function calculateWinnings(selectedNumber, diceResult, betAmount) {
  if (selectedNumber === diceResult) {
    return betAmount * 5;
  } else if (Math.abs(selectedNumber - diceResult) === 1) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getRollResultMessage(selectedNumber, diceResult, winnings, getLang) {
  if (winnings > 0) {
    if (selectedNumber === diceResult) {
      return getLang("win_message", winnings) + ` You guessed ${selectedNumber} and the dice rolled ${diceResult}! 🎉`;
    } else {
      return getLang("near_win_message", winnings) + ` You guessed ${selectedNumber}, and the dice rolled ${diceResult}. Close enough! 🎉`;
    }
  } else {
    return getLang("lose_message", -winnings) + ` You guessed ${selectedNumber}, but the dice rolled ${diceResult}. Better luck next time! 😔`;
  }
}
