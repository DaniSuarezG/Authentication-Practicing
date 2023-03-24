const router = require('express').Router()
const checkAuth = require('../middleware/auth')


router.get('/', checkAuth, (req, res) => {
    res.send('Aquí están los vídeos.')
})

module.exports = router