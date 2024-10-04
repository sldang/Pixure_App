const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: true
            });
        console.log(`Database Connected ${conn.connection.host}`);
    } catch (error) {
        console(error);
        process.exit(1);
    }

}

module.exports = connectDB;