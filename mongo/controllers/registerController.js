const User = require('../models/User')

 const bcrypt = require('bcrypt')

 const hanldeNewUser = async (req, res) => {
    const {user, pwd} = req.body
    if (!user|| !pwd) return res.status(404).json({"message": "username and password are required"})
        const duplicate = await User.findOne({username: user}).exec()
      console.log({duplicate})
     if (duplicate) return res.sendStatus(409) //conflict
     try {
        const hashedPassword = await bcrypt.hash(pwd, 10)
        const result = await User.create({
         "username": user,
         "password": hashedPassword })
         console.log(result)
       
        res.status(201).json({"success": `new user ${user} created`})
     } catch (error) {
        res.statue(500).json({"message": error.message})
     }
 }
 module.exports = {hanldeNewUser}