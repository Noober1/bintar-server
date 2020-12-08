const Package = require('../models/package')
const httpStatus = require('http-status')
const { APIError, isValidJSON } = require('../utils')
const mongoose = require('mongoose')



exports.list = (req,res,next) => {
    Package.find().select('-__v').then(data => {
        return res.json({
            status:httpStatus.OK,
            data:data
        })
    }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status:httpStatus.INTERNAL_SERVER_ERROR,
        message:err
    }))
}


exports.getById = async(req,res,next) => {
    let { ids } = req.body
    try {
        if (!ids) throw new APIError({
            status: httpStatus.UNAUTHORIZED,
            message: 'Id atau daftar id tidak ada',
        })

        ids = isValidJSON(ids) ? JSON.parse(ids) : ids
        
        if (typeof ids === "object") {
            Package.getByListId(ids).then(data => {
                return res.json({
                    status:httpStatus.OK,
                    data:data
                })
            })
        } else {
            let getData = await Package.getById(ids)
            if (!getData) throw new APIError({
                status: httpStatus.BAD_REQUEST,
                message: 'Id / daftar id tidak valid',
            })
            return res.json({
                status:httpStatus.OK,
                data:getData
            })
        }

    } catch (error) {
        return next(error)
    }
}

exports.getByServer = async(req,res,next) => {
    let { ids } = req.body
    try {
        if (!ids) throw new APIError({
            status: httpStatus.UNAUTHORIZED,
            message: 'Kode / daftar kode server tidak ada',
        })

        ids = isValidJSON(ids) ? JSON.parse(ids) : ids
        
        if (typeof ids === "object") {
            Package.getByListServer(ids).then(data => {
                return res.json({
                    status:httpStatus.OK,
                    data:data
                })
            })
        } else {
            let getData = await Package.getByServer(ids)
            if (!getData) throw new APIError({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server error',
            })
            return res.json({
                status:httpStatus.OK,
                data:getData
            })
        }

    } catch (error) {
        return next(error)
    }
}

exports.updateById = async(req,res,next) => {
    let { packageId } = req.params,objUpdate = {},
    { server } = req.body,
    saving;

    try {
        if (!mongoose.Types.ObjectId.isValid(packageId)) throw new APIError({
            status: httpStatus.UNAUTHORIZED,
            message: 'Id tidak ada atau tidak valid',
        })
        const doc = await Package.findById(packageId);

        if(server) doc.server = server

        try {
            saving = await doc.save()
        } catch (error) {
            throw new APIError({
                status: httpStatus.FORBIDDEN,
                message: error,
            })
        }

        if (saving) {
            return res.json({
                status:httpStatus.OK,
                data:saving
            })
        }
    } catch (error) {
        next(error)
    }
}