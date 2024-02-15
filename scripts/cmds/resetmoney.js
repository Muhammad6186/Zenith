module.exports = {
  config: {
    name: "resetmoney",
    version: "1.1",
    author: "Marjhxn",
    shortDescription: {
      en: "Reset a specific player's money",
    },
    longDescription: {
      en: "Reset the money of a specific player to 0.",
    },
    category: "Admin",
    role: 2, // Specify the role required to use this command (e.g., "admin")
  },
  langs: {
    en: {
      not_admin: "Only administrators can use this command.",
      success: "Successfully reset money for the specified player.",
    },
  },
  onStart: async function ({ message, event, envCommands, usersData, getLang }) {
    const { senderID } = event;
    const [targetUserID] = event.body.split(" ").slice(1);

    // Check if the user has admin privileges
    if (!isAdmin(senderID)) {
      return message.reply(getLang("not_admin"));
    }

    // Get the target user's data and reset their money to 0
    const targetUserData = await usersData.get(targetUserID);
    if (!targetUserData) {
      return message.reply("User not found.");
    }

    await usersData.set(targetUserID, { money: 0 });

    // Respond with success message
    return message.reply(getLang("success"));
  },
};

// Function to check if the user has admin privileges
function isAdmin(userID) {
  // Example: Check if the user is listed in an admin database or has a specific role
  // Replace this with your actual implementation
  return true; // Return true if the user is an admin, false otherwise
}
