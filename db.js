// export const mongoose_connection = "mongodb://localhost:27017/money_transaction"
const mongoose = require('mongoose')

export const mongoose_connection = async () => {
    const uri = "mongodb://localhost:27017/money_transaction"

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};