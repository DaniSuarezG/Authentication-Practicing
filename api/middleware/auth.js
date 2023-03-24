const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const checkAuth = (req, res, next) => {
    const token = req.headers.token

    jwt.verify(token, process.env.SECRET, async (error, payload) => {
        if (error) return res.status(400).send('Unauthorized.')
        
        const user = await User.findOne({ where: { email: payload.email } })
        if (!user) res.status(400).send('User doesn´t exists.')

        console.log(payload)
        next()
    })
}

module.exports = checkAuth