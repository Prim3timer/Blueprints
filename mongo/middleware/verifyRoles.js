const { all } = require("../routes/logout")

const verifyRoles = (...allowedRoles)=> {
    return (req, res, next) => {
        if(!req?.roles) return res.sendStatus(401)
        const rolesArray = [...allowedRoles]
        console.log(rolesArray)
        console.log(req.roles)
        // the req.roles will coming from the jwt
        const result = req.roles.map(role => allowedRoles.includes(role)).find(val => val === true)
        if(!result) return res.sendStatus(401)
            next()
    }
}

module.exports = verifyRoles