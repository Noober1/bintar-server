const httpStatus = require('http-status')

exports.notFound = (req, res, next) => {
    return res.status(httpStatus.NOT_FOUND).json({
        status:httpStatus.NOT_FOUND,
        message:'Not found'
    })
};