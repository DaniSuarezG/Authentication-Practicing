require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const api = express()

const dbConn = require('./db')

api.use(morgan('dev'))
api.use(express.json())

api.listen(process.env.PORT, async (err) => {
    if (err) throw new Error(`Cannot initialize Express on port ${process.env.PORT}:`, err)

    try {
        await dbConn.authenticate()
        console.info(`Connected to DB ${process.env.DB_NAME}.`)
    } catch (error) {
        throw new Error('Cannot connect to DB:', error)
    }
    console.info(`Netflix API listening on port ${process.env.PORT}`)
})