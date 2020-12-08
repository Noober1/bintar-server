const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);

const schema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    name: {
        given: String,
        family: String
    },
    date_creation: Date,
    status: String,
    type: {
        required: [true, 'Jenis akun dibutuhkan, \'admin\' atau \'user\''],
        type:String
    }
});

module.exports = mongoose.model('user', schema);