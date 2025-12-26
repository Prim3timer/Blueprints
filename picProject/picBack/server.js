// require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const db = require('./imageBox/users.json')


const app = express()
app.use(express.json())
app.use(cors())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
// app.use('/users', require('./routes/usersRoute'))



const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const {name} = req.query
        const files = req.files
        console.log({files})
        console.log({name})
        // console.log({fileO: req.files})
            if (!fs.existsSync(path.join(__dirname, 'public', 'images', `./${req.query.name}`))){
            await fs.promises.mkdir(path.join(__dirname, 'public', 'images', `./${req.query.name}`))
            cb(null, `./public/images/${req.query.name}`)
            console.log(`./${req.query.name} created`) 
        } else cb(null, `./public/images/${req.query.name}`)
    },
    filename: (req, file, cb) => {
         cb(null, file.originalname)
    }
})


const upload = multer({
    storage
})

app.post('/users/intantUpload/:id', upload.single('image'), async (req, res)=>  {
    const {id} = req.params
   const userId = req.query.userId
    const initialFile = req.query.initialFile
    const image = req.file.filename
    console.log({reqName: req.query.name})
      const imgObj = {id: Number(id), name: image}
    const foundUser = db.find((user) => user.id === Number(userId))
     const userImages = foundUser.image

     console.log({id, image, initialFile, userId, foundUser})
     const splicedImages = userImages.map((image) => {
         if (image.id === Number(id)) return imgObj
         return image
     })
     console.log({splicedImages: JSON.stringify(splicedImages)})
        const updatedDb = db.map((user => {
         if (user.id === Number(userId)){
             return {...user, image: splicedImages}
 
         }
         return user
     }))
     console.log({updatedDb: JSON.stringify(updatedDb, null, 2)})
     const removal = await fs.promises.unlink(path.join(__dirname, 'public', 'images', foundUser.name, initialFile), 
     JSON.stringify(updatedDb))
     
     const response = await fs.promises.writeFile(path.join(__dirname, 'imageBox', 'users.json' ), JSON.stringify(updatedDb, null, 2))

    res.json({message: 'updated'})
})

app.post('/users/upload/:id', upload.single('image'), async (req, res) => {

    const id = req.params.id
    const {userId, fiveArray} = req.query
    const image = req.file.filename
    const imgObj = {id: Number(id), name: image}
    console.log({userId: Number(userId)})
    const foundUser = db.find((user) => user.id === Number(userId))
    const userImages = foundUser.image
    // const parsed = JSON.parse(userImages)
    // const newUserImages = [...userImages, imgObj]
    const newUserImages = userImages.map((img) => {
        // console.log({imgId: img.id, imgObjId: imgObj.id})
       if (img.id === imgObj.id){
        return imgObj
       }
      return img
    })
    const newFoundUser = {...foundUser, image: newUserImages}
    // const expFoundUser = JSON.stringify(newUserImages, null, 2)
    // console.log({expFoundUser})

    
    const updatedDb = db.map((user => {
        if (user.id === Number(userId)){
            return {...foundUser,    image: JSON.parse(fiveArray)}

        }
        return user
    }))

    const expFoundUser = JSON.stringify(updatedDb, null, 2)
    console.log({expFoundUser})
 
    const response = await fs.promises.writeFile(path.join(__dirname, 'imageBox', 'users.json' ), expFoundUser)
 
        res.json({message: 'image upload successfull'})
  

})


app.post('/create-person',  upload.array('images', 20), async (req, res) => {
    console.log({reqBody: req.body})
    const {name, age} = req.query

    try {
         if (name, age) {

        const files =  req.files.map((file, index) => {
            return {id: index + 1, name: file.originalname}
        })
        const newUser = {
            id: '',
            name, 
            age,
            image: files
        }
        let updatedNewUser = []
        if (db.length )  {
    
            updatedNewUser = {...newUser, id: db[db.length - 1].id + 1}
        } else updatedNewUser = {...newUser, id:  1}
        const newDb = [...db, updatedNewUser]
        console.log(newDb)
        const response = await fs.promises.writeFile(path.join(__dirname, 'imageBox', 'users.json'), JSON.stringify(newDb, null, 2))
        res.json({message: 'user created'})
    }
    } catch (error) {
        res.json({message: 'something went wrong'})
    }


})

app.post('/uploads',  upload.array('images', 3), async (req, res) => {

    const images = req.files
    console.log({images})
  
//     const getAUser = db.map((user) => {
//         if (user.name === 'Dike') return {...user, img: image}
//         return user
//     })
   
//         const response = await fs.promises.writeFile(path.join(__dirname, 'imageBox', 'users.json'), JSON.stringify(getAUser, null, 2))
// res.json({message: 'success'})
})



app.get('/', (req, res) => {
    const users = db
    console.log({users})
    res.json(users)
})

app.get('/user', (req, res) => {
     const users = db
    // console.log({dikeImage: users[2].image})
    res.json(users)


})

app.put('/users/update/:id', async (req, res) => {
    const id = req.params.id
  const {name, age, initialName} = req.body
  console.log(initialName)
    try {
        const updatedDb = db.map((user) => {
            if (user.id === Number(id)){
                return {...user, name, age}
            }
            return user
        })
        await fs.promises.writeFile(path.join(__dirname, 'imageBox', 'users.json'), JSON.stringify(updatedDb, null, 2))
        const response = await fs.promises.rename(path.join(__dirname, 'public', 'images', initialName), path.join(__dirname, 'public', 'images', name))
    
        console.log({updatedDb})
        res.json({message: `${initialName} updated`})
        
    } catch (error) {
        res.json({message: error.message})
    }
})


app.delete('/:id', async (req, res) => {
    const reqParams = req.params.id
   const myObj =  JSON.parse(reqParams)
   const {id, name} = myObj
   console.log(id, name)
   const data = await fs.promises.readdir(path.join(__dirname, 'public', 'images', name))
   console.log({content: data.length})
   if (data.length){

       data.map( async (file)=> {
        await fs.promises.unlink(path.join(__dirname, 'public', 'images', name, file))
       })
    }
    if (db.length) {
        const newDb = db.filter((user) => user.id !== id)
        console.log({newDb})
        const response = await fs.promises.writeFile(path.join(__dirname, 'imageBox', 'users.json'), JSON.stringify(newDb, null, 2))

         await fs.promises.rmdir(path.join(__dirname, 'public', 'images', name))
    res.json(response)
        
    } else res.send('no such user found')
})

  app.delete(`/delete/:id`, async (req, res) => {
    try {
        
        const {id} = req.params
        const {name, file, latestArray} = req.query
        const parseArray = JSON.parse(latestArray)
        console.log({name, parseArray})
        const filResponse = await fs.promises.unlink(path.join(__dirname, 'public', 'images', name, file))
       

   const currentDb = db.map((user) => { 
    if (user.id === Number(id)) {
        return {...user, image: parseArray}
    }   
    return user
     })     

     
     const response = await fs.promises.writeFile(path.join(__dirname, 'imageBox', 'users.json'), JSON.stringify(currentDb, null, 2))
     res.json({message: 'deleted image', file})
    } catch (error) {
        res.json(error)
    }
    })  

app.get('/folder', async (req, res) => {
    const foundFolder = await fs.promises.readFile(path.join(__dirname, 'imageBox', 'users.json'), 'utf8')
    console.log({foundFolder})
    res.json(foundFolder)
})

const PORT = 5000


app.listen(PORT, () => console.log(`server listening on port: ${PORT}`))