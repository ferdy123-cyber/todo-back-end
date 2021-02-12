require('dotenv').config()

const { User } = require('../models')
const jwt = require('jsonwebtoken')

const { SECRET_TOKEN } = process.env

const authorization = async (req, res, next) => {
    try{
        const authorization = req.header('Authorization')

        if(!authorization) {
            throw new Error('Invalid token1')
        }

        const token = authorization.split('Bearer ')[1]

        if(!token) {
            throw new Error('Invalid token2')
        }
        const decodedToken = jwt.verify(token, SECRET_TOKEN)

        if(!decodedToken.userId) {
            throw new Error('Invalid token3')
        }

        const user = await User.findByPk(decodedToken.userId)

        if(!user) {
            throw new Error('Invalid token4')
        }

        req.user = user
        return next

    }catch (err) {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: err.message
        })
    }
}

module.exports = {
    authorization,
}