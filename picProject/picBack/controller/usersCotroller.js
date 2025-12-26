const asyncHandler = require('async-handler')

const createUser = () => {
    console.log('item-list')
}

const uploadImage = () => asyncHandler(async (req, res) => {

    console.log('upload')

    // const image = req.file.filename


  
//     const getAUser = db.map((user) => {
//         if (user.name === 'Dike') return {...user, img: image}
//         return user
//     })
   
//         const response = await fs.promises.writeFile(path.join(__dirname, 'imageBox', 'users.json'), JSON.stringify(getAUser, null, 2))
// res.json({message: 'success'})
// console.log({reqFile: req.file})

res.json('uploa')
})

module.exports = {
    createUser,
    uploadImage
}