// export const mongoose_connection = "mongodb://localhost:27017/money_transaction"
const mongoose = require('mongoose')

export const mongoose_connection = async () => {
    const url = "mongodb+srv://gohildrashti636:Jd2PbtefcxhvqU3b@cluster0.ubdskwm.mongodb.net/"

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};