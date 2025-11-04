const data = {}
data.employees = require('../data/employees.json')

const getAllEmployees = (req, res)=> {
    console.log('on the employees route')
    res.json(data.employees)
}

const createEmployee = (req, res)=> {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    data.employees.push(newEmployee)
    res.json(data.employees)
}

const getAnEmployee = (req, res)=> {
    const inQ = data.employees.find((item)=>  item.id === Number(req.params.id))
    console.log(inQ)
    res.json({user: inQ})
}

const deleteEmployee = (req, res)=> {
    res.json({id: req.params.id})
}

const editEmployee = (req, res)=> {
    const currentEmployee = data.employees.find((item)=> item.id === Number(req.params.id))
    currentEmployee.firstName = req.body.firstName
    res.json(data.employees)
}

module.exports = {
    getAllEmployees,
    createEmployee,
    getAnEmployee,
    deleteEmployee,
    editEmployee
}       