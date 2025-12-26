const express = require('express')
const path = require('path')
const fsPromises = require('fs').promises
const data = {}
const employeesDB = {
    employees: require('./data/employees.json'),
    setEmployees: function (data){
        this.users = data
    }
}

const app = express()
const { logger, logEvents } = require('./middleware/logEvents')
const errHandler = require('./middleware/errHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const multer = require('multer')
const { fi } = require('date-fns/locale')

const PORT = process.env.PORT || 3500

app.use(logger)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


const getEmployees = (req, res) => {
    const currentEmployee = employeesDB.employees.find((employee) => employee.firstName === 'Dike')
    res.json({list: employeesDB.employees})

}

app.get('/employers', getEmployees)

app.put('/update', async (req, res) => {
   const {name} = req.body
const updatedEmployee = employeesDB.employees.map((employee) => {
    if (employee.firstName === 'Dike') employee.firstName = name
    return employee
})
    await fsPromises.writeFile(path.join(__dirname, 'data', 'employees.json'), JSON.stringify(updatedEmployee, null, 2))
   console.log({updatedEmployee})
})


app.post('/upload', upload.single('eagle'), async (req, res) => {
    console.log({ reqFile: req.file })
    console.log({reqBody: req.body})
    const updatedEmployee = employeesDB.employees.map( (employee) => {
    if (employee.firstName === 'Dike') {
        return {...employee, img: req.file}
        
    }
    return employee
})
await fsPromises.writeFile(path.join(__dirname, 'data', 'employees.json'), JSON.stringify(updatedEmployee, null, 2))
console.log({updatedEmployee})
    if (!req.file) {
        res.json({ error: 'no upload' })
    }
    res.json({ alert: updatedEmployee })
})

app.get('/download', async (req, res)=> {
    const newData = employeesDB.employees.map( (employee) => {
    return employee
})
res.json(newData)
})




app.use('/', require('./routes/subdir'))
app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))





app.use('/users', require('./routes/users'))
app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'))

// app.get('/employees', (req, res)=> {
//     res.send('international')
// })

app.get('/new-page.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))

})
app.get('/old-page.html', (req, res) => {
    res.redirect(301, '/new-page.html')

})


// app.get('/hello', (req, res, next) => {
//     console.log('first one')
//     next()
// }, (req, res)=> {
// res.send('Holla Mundial')
// })

// const one = (req, res, next)=> {
//     console.log('one')
//     next()
// }
// const two = (req, res, next)=> {
//     console.log('two')
//     next()
// }
// const three = (req, res)=> {    
//     console.log('three')
//     res.send('finished')
// }

// app.get('/chain', [one, two, three])



app.use(errHandler)




app.listen(PORT, () => console.log(`server listening on port ${PORT}`))


