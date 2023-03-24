const router = require('express').Router()
const authRouter = require('./auth.route')
const videoRouter = require('./video.route')

router.use('/auth', authRouter)
router.use('/videos', videoRouter)

module.exports = router