module.exports = {
  config: {
    name: "setmoney",
    version: "1.1",
    author: "Marjhxn",
    shortDescription: {
      en: "Set a player's money or all players' money",
    },
    longDescription: {
      en: "Set a specific player's money amount or set the money of all players to the same amount.",
    },
    category: "Admin",
    role: 2, // Specify the role required to use this command (e.g., "admin")
  },
  langs: {
    en: {
      not_admin: "Only administrators can use this command.",
      invalid_format: "Invalid format. Use: /setmoney (uid|all) (amount)",
      invalid_amount: "Please enter a valid amount.",
      success_specific: "Successfully set money for user %1 to $%2.",
      success_all: "Successfully set money for all players to $%1.",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;

    // Check if the user has admin privileges
    if (!isAdmin(senderID)) {
      return message.reply(getLang("not_admin"));
    }

    // Check if the command has the correct number of arguments
    if (args.length !== 2) {
      return message.reply(getLang("invalid_format"));
    }

    // Extract UID and amount from command arguments
    const uid = args[0];
    const amount = parseInt(args[1]);

    // Check if the amount is a valid number
    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    // Update the user's money amount or all players' money
    if (uid.toLowerCase() === "all") {
      const allUsers = await usersData.getAll();
      const setAllPromises = allUsers.map(async (userData) => {
        const userID = userData.userID;
        await usersData.set(userID, { money: amount });
      });
      await Promise.all(setAllPromises);
      return message.reply(getLang("success_all", amount));
    } else {
      await usersData.set(uid, { money: amount });
      return message.reply(getLang("success_specific", uid, amount));
    }
  },
};

// Function to check if the user has admin privileges
function isAdmin(userID) {
  // Example: Check if the user is listed in an admin database or has a specific role
  // Replace this with your actual implementation
  return true; // Return true if the user is an admin, false otherwise
}
