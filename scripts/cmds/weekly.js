module.exports = {
    config: {
        name: "weekly",
        version: "1.0",
        author: "Marjhxn",
        countDown: 7,
        role: 0,
        shortDescription: {
            vi: "Nhận quà hàng tuần",
            en: "Receive weekly gift"
        },
        longDescription: {
            vi: "Nhận quà hàng tuần",
            en: "Receive weekly gift"
        },
        category: "game",
        guide: {
            vi: "   {pn}: Nhận quà hàng tuần",
            en: "   {pn}: Receive weekly gift"
        },
        envConfig: {
            weeklyReward: {
                coin: 500,
                exp: 50
            }
        }
    },

    langs: {
        vi: {
            alreadyReceived: "Bạn đã nhận quà hàng tuần rồi",
            received: "Bạn đã nhận được %1 coin và %2 exp"
        },
        en: {
            alreadyReceived: "You have already received the weekly gift",
            received: "You have received your Weekly Reward - %1 coin and %2 exp"
        }
    },

    onStart: async function ({ message, event, usersData, commandName, getLang }) {
        const reward = this.config.envConfig.weeklyReward;
        const { senderID } = event;

        const userData = await usersData.get(senderID);
        if (userData.data.lastTimeGetWeeklyReward === message.threadID)
            return message.reply(getLang("alreadyReceived"));

        userData.data.lastTimeGetWeeklyReward = message.threadID;
        await usersData.set(senderID, {
            money: userData.money + reward.coin,
            exp: userData.exp + reward.exp,
            data: userData.data
        });
        message.reply(getLang("received", reward.coin, reward.exp));
    }
};
