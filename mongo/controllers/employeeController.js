const Employee = require('../models/Employee')
const getAllEmployees = (req, res)=> {
    console.log('on the employees route')
    res.json(data.employees)
}

const createEmployee = async(req, res)=> {
  const newEmployee = await Employee.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
    res.json(newEmployee)
}

const getAnEmployee = async (req, res)=> {
  const employees = await Employee.find()
    res.json(employees)
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