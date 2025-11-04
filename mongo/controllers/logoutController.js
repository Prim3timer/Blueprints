const User = require('../models/User')
 const fsPromises = require('fs').promises
 const path = require('path')

 const handleLogout = async (req, res) => {
    // on client also delete the access token
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // no content
    const refreshToken = cookies.jwt

    // is refresh token in db?
        const foundUser = await User.findOne({refreshToken}).exec() 
    if (!foundUser) {
        res.clearCookie('jwt',{httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        res.sendStatus(204)
    }
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)
    res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) // secure true - only servers on https
    res.sendStatus(204)
 }
 
 module.exports = {handleLogout}