const usersDB = {
    users: require('../models/users.json'),
    setUser: function (data){
        this.users = data
    }
}


const getUsers = (req, res)=> {
    const response = usersDB.users
    res.json(response)
}

module.exports = {
    getUsers
}