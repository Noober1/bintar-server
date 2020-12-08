const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

var packageSchema = mongoose.Schema({
    server: {
        type: String,
        required: [true, 'Kode server dibutuhkan, panjang karakter antara 5-10 karakter'],
        minlength: 5,
        maxlength: 10
    },
    name: {
        type: String,
        required: [true, 'Nama paket dibutuhkan, panjang karakter antara 5-30 karakter'],
        minlength: 5,
        maxlength: 30
    },
    code: {
        type: String,
        unique: [true, 'Kode paket harus unik (berbeda dengan lainnya)'],
        required: [true, 'Kode paket dibutuhkan, panjang karakter antara 5-10 karakter'],
        minlength: 5,
        maxlength: 10
    },
    timelimit: {
        type: Number,
        required: [true,"Timeleft required"]
    },
    key:{
        type: String,
        maxlength:5,
        default: null
    },
    hash: {
        type: String,
        required: [true,"Package Hash required"]
    },
    kelas: {
        level : {
            type: Array,
            default: ['all'],
        },
        jurusan: {
            type: Array,
            default: ['all'],
        },
        rombel: {
            type: Array,
            default: ['all'],
        },
    },
    session: {
        type: Array,
        default: [1]
    },
    randomness: {
        question: {
            type: Boolean,
            default: true
        },
        answer: {
            type: Boolean,
            default: true
        }
    },
    status: {
        type: String,
        enum: ['inactive','active'],
        default: 'inactive'
    },
    date_creation: {
        type: Date,
        default: Date.now,
    },
    time_expire: {
        type: Date,
        required : [true,'Time Expire is required']
    }
});

packageSchema.statics = {
    /**
     * Dapatkan paket soal berdasarkan id paket
     *
     * @param {ObjectId} id - objectId dari paket.
     * @returns {Promise<package, boolean>}
     */
    async getById(id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            return await this.findById(id).select('-__v').exec();
        }
        return false;
    },
    /**
     * Mendapatkan paket soal berdasarkan daftar id paket
     *
     * @param {Object} array - Array dari daftar id paket.
     * @returns {Promise<package>}
     */
    async getByListId(array) {
        let validatedIds = array.filter(item => mongoose.Types.ObjectId.isValid(item))
        return this.find().where('_id').select('-__v').in(validatedIds).exec();
    },
    /**
     * Dapatkan paket soal berdasarkan kode server
     *
     * @param {String} id - kode dari paket.
     * @returns {Promise<package>}
     */
    async getByServer(id) {
        return await this.findOne({
            server:id
        }).select('-__v').exec();
    },
    /**
     * Mendapatkan paket soal berdasarkan daftar kode server
     *
     * @param {Object} array - Array dari daftar kode server.
     * @returns {Promise<package>}
     */
    async getByListServer(array) {
        array = typeof array === 'object' ? array : [];
        return this.find().where('server').select('-__v').in(array).exec();
    }
}

module.exports = mongoose.model('package', packageSchema);