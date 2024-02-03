const mongoose = require('mongoose')

export const mongoose_connection = async () => {
    const url = "mongodb+srv://gohildrashti636:Jd2PbtefcxhvqU3b@cluster0.ubdskwm.mongodb.net/"

    await mongoose.connect(url);
};