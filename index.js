require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const api = express()

api.use(morgan('dev'))
api.use(express.json())

api.listen(process.env.PORT, (err) => {
    if (err) throw new Error(`Cannot initialize Express on port ${process.env.PORT}`)

    console.info(`Netflix API listening on port ${process.env.PORT}`)
})