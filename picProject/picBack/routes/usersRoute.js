const express = require('express')
const router = express.Router()

const usersController = require('../controller/usersCotroller')


router.route('/').
post(usersController.createUser)

router.route('/upload').post(usersController.uploadImage)


module.exports = router