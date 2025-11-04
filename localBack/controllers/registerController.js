 const usersDB = {
    users: require('../models/users.json'),
    setUser: function (data){
        this.users = data
    }
 }

 const fsPromises = require('fs').promises
 const path = require('path')
 const bcrypt = require('bcrypt')

 const hanldeNewUser = async (req, res) => {
    const {user, pwd} = req.body
    if (!user|| !pwd) return res.status(404).json({"message": "username and password are required"})
        const duplicate = usersDB.users.find((person) => person.username === user)
      console.log({duplicate})
     if (duplicate) return res.sendStatus(409) //conflict
     try {
        const hashedPassword = await bcrypt.hash(pwd, 10)
        const newUser = {"username": user,
         "roles": {"User": 2001},
         "password": hashedPassword }
        usersDB.setUser([...usersDB.users, newUser])
        await fsPromises.writeFile(path.join(__dirname, '..', 'models', 'users.json' ),
        JSON.stringify(usersDB.users))
        console.log(usersDB.users)
        res.status(201).json({"success": `new user ${user} created`})
     } catch (error) {
        res.status(500).json({"message": error.message})
     }
 }
 module.exports = {hanldeNewUser}