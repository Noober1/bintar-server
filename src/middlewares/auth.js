require('dotenv').config()

const { TOKEN_EXPIRE,TOKEN_SECRET } = process.env
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')


/**
 * Middleware pengecekan akses token
*/
module.exports.authToken = (req,res,next) => {
    const header = req.headers['authorization']
    const { UNAUTHORIZED, FORBIDDEN } = httpStatus
    if (typeof header === "undefined") return res.status(UNAUTHORIZED).json({
        status: UNAUTHORIZED,
        msg: "No access token"
    })

    const bearerToken = header.split(' ')[1]

    jwt.verify(bearerToken, TOKEN_SECRET, (err,data) => {
        if(err) return res.status(FORBIDDEN).json({
            status: FORBIDDEN,
            response:err
        })
        req.userData = data
        next()
    })
}

/**
 * Untuk generate akses token
 * @param {Object} data - Data token 
 * @returns {String} - Access token
 */
module.exports.genAccessToken = data => {
    return jwt.sign(data, TOKEN_SECRET, {
        expiresIn:TOKEN_EXPIRE
    })
}