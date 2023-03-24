require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

const signUp = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send(`ERROR: Cannot create user - ${error.message}`)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({where: { email: req.body.email }})
        if (!user) return res.status(403).send('Email or password invalid.')
        
        bcrypt.compare(req.body.password, user.password, (error, result) => {
            if (!result) return res.status(403).send('Email or password invalid.')
    
            const token = jwt.sign({ email: user.email }, process.env.SECRET)
    
            res.status(201).json({ token: token })
        })        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signUp,
    login
}