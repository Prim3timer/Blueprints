const express = require('express')
const path = require('path')

const app = express()
const {logger, logEvents} = require('./middleware/logEvents')         
const errHandler = require('./middleware/errHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const PORT = process.env.PORT || 3500

app.use(logger)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')))
     
app.use('/', require('./routes/subdir'))
app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT)
app.use('/users', require('./routes/users'))
app.use('/employees', require('./routes/api/employees'))

// app.get('/employees', (req, res)=> {
//     res.send('international')
// })

app.get('/new-page.html', (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))

})
app.get('/old-page.html', (req, res)=> {
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




app.listen(PORT, ()=> console.log(`server listening on port ${PORT}`))


