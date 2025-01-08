const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://mahbublimon:HFU2_pCQLN-9SKf@wellwomen.riytf.mongodb.net/wellwomen?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB successfully.");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;