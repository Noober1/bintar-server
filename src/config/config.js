require('dotenv').config()
const { DB_URI, ENV } = process.env;
const mongoose = require('mongoose');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

// print mongoose logs in dev env
if (ENV === 'development') {
    mongoose.set('debug', true);
}

exports.connect = () => {
    mongoose
        .connect(DB_URI, {
            useCreateIndex: true,
            keepAlive: 1,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => console.log('Database status: mongoDB connected...'));
    return mongoose.connection;
};
