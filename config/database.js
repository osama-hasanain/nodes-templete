require('dotenv').config({ path: '../config.env' });
const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.DB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    }).then((conn) => {
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    }).catch((err) => {
        console.log(`DataBase Error ${err}`);
        process.exit(1);
    });
}

module.exports = dbConnection;