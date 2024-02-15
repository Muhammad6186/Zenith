module.exports = {
  config: {
    name: "addmoney",
    version: "1.0",
    author: "Marjhxn",
    role: 2,
    shortDescription: "Add money to user(s)",
    longDescription: "Add money to a specific user or to all users",
    category: "economy",
    usages: [
      "{prefix}addmoney <uid/all> <amount>",
      "{prefix}addmoney all 1000"
    ],
  },

  onStart: async function ({ api, event, args }) {
    const [target, amountStr] = args;
    const amount = parseInt(amountStr);

    if (isNaN(amount) || amount <= 0) {
      return api.sendMessage("Invalid amount. Please provide a valid positive number.", event.threadID);
    }

    if (target === "all") {
      const users = await getUsers(); // Function to get all users in the system
      for (const user of users) {
        // Add the amount to each user's balance
        // Example: user.balance += amount;
      }
      return api.sendMessage(`Successfully added ${amount} units to all users.`, event.threadID);
    } else {
      const user = await getUserById(target); // Function to get user by ID
      if (!user) {
        return api.sendMessage("User not found.", event.threadID);
      }
      // Add the amount to the specific user's balance
      // Example: user.balance += amount;
      return api.sendMessage(`Successfully added ${amount} units to user ${user.name}.`, event.threadID);
    }
  }
};
