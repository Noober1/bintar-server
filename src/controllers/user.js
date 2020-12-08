const httpStatus = require('http-status')
const utils = require('../utils')
const { genAccessToken } = require('../middlewares/auth')

//models
const User = require('../models/user')

/**
 * Controller untuk login di /users/login
 * @public
 */
exports.login = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(httpStatus.BAD_REQUEST).json({
        status:httpStatus.BAD_REQUEST,
        message:'Username atau password kosong'
    })
    User.findOne({
        username:username
    }).then(data => {
        if (!data) return res.status(httpStatus.FORBIDDEN).json({
            status:httpStatus.FORBIDDEN,
            message:'Username tidak ditemukan'
        })
        const isPasswordMatch = utils.compare(password,data.password)
        if (isPasswordMatch) {
            const accessToken = genAccessToken({
                username:username,
                name:data.name,
                type:data.type
            })
            return res.json({
                status:httpStatus.OK,
                username:username,
                name:data.name,
                type:data.type,
                accessToken: accessToken
            })
        } else {
            res.status(httpStatus.FORBIDDEN).json({
                status:httpStatus.FORBIDDEN,
                message:'Password salah'
            })
        }
    })
};


/**
 * Controller untuk pembuatan user admin di /users/createAdmin
 * @public
 */
exports.createAdmin = (req,res,next) => {
    const {username,password,first_name,last_name } = req.body;
    if (username || password || first_name || last_name) {
        User.countDocuments({
            type:'admin'
        }).then(result => {
            if (result > 0) return res.status(httpStatus.FORBIDDEN).json({
                status:httpStatus.FORBIDDEN,
                message:'User admin telah ada'
            })

            User.create({
                username: username,
                password: utils.hash(password),
                type:'admin',   
                name:{
                    given:first_name,
                    family:last_name
                }
            }, function (err, data) {
                if (err) {
                    console.log(err)
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                        status:httpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Gagal membuat user'
                    })
                }
                return res.status(httpStatus.CREATED).json({
                    status:httpStatus.CREATED,
                    message:'User telah dibuat',
                    data:data
                })
            });
        })
    } else {
        return res.status(httpStatus.BAD_REQUEST).json({
            status:httpStatus.BAD_REQUEST,
            message:'Data tidak lengkap'
        })
    }
}