 const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data){
        this.users = data
    }
 }
 const fsPromises = require('fs').promises
 const path = require('path')

 const handleLogout = async (req, res) => {
    // on client also delete the access token
    const cookies = req.cookies
    console.log(cookies)
    if (!cookies?.jwt) return res.sendStatus(204) // no content
    const refreshToken = cookies.jwt

    // is refresh token in db?
        const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
        res.sendStatus(204)
    }
    //  delete refresh token in the db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken: ''}
    usersDB.setUsers([...otherUsers, currentUser])
    console.log(usersDB.users)

       await fsPromises.writeFile(path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}) // secure true - only servers on https
    res.sendStatus(204)
 }
 
 module.exports = {handleLogout}