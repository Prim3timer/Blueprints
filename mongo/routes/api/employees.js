const express = require('express')
const router = express.Router()
const path = require('path')
const employeeController = require('../../controllers/employeeController')
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')



router.route('/').get(employeeController.getAllEmployees)

.post(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor), employeeController.createEmployee)

router.route('/:id').get(employeeController.getAnEmployee)
.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.editEmployee)
.delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee)

module.exports = router
