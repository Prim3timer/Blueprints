import { useContext, useEffect, useState } from "react"
import UserContext from "../context/userProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'


const EditUser = () => {
    const {currentUser, handleEdit, user, setUser, name, users, setUsers, setName, age, setAge, images, setImages} = useContext(UserContext)
    const [currentImages, setCurrentImages] = useState()    
    const [id, setId] = useState()    
    const [instantId, setInstantId]  = useState()
    const [file, setFile] = useState()
    const [instantFile, setInstantFile] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [initialName, setInitialName] = useState('')
    const [success, setSuccess] = useState(false)
    const [instantSelect, setInstantSelect] = useState(false)
    const [initialFileName, setInitialFileName] = useState()
        const [data, setData] = useState()

const fiveArray = []

let i = 0
while (i < 20) {
  fiveArray.push({id: i + 1, name: 'noPic'})
  i++
}


console.log(fiveArray)
console.log(currentUser)
const handleUPdate = async () => {
  console.log(currentUser.id)
  const newPerson = {
    name,
    age,
    initialName
  }
  const response = await axios.put(`http://localhost:5000/users/update/${currentUser.id}`, newPerson)
  console.log(response.data)
}

const dynamFileInput = file ?  'show-add-pic-edit' : 'add-pic-edit' 
   const handleFile = (e, id) => {
        setFile(e.target.files[0])
        setId(id)
        console.log(e.target.files[0])
      }
      
      const instantHandleFile = (e, id) => {
        setInstantFile(e.target.files[0])
        console.log(e.target.files[0])
         setInstantId(id)
    }


    const hanldeInstantUpload = async (id)=> {
      const userId = currentUser.id
      console.log(currentUser)
      const formData = new FormData()
      const imgObj = {id, name: instantFile.name}
      formData.append('image', instantFile)
      const response = await axios.post(`http://localhost:5000/users/intantUpload/${id}?userId=${userId}&name=${currentUser.name}&initialFile=${initialFileName}`, formData)
      currentUser.image.map((item, i)=> {
        fiveArray.splice(item.id - 1, 1 ,item)
      })
      fiveArray.filter((item) => item.id !== id)
      fiveArray.splice(id - 1, 1, imgObj)
      setCurrentImages(fiveArray)
      setInstantFile('')
      console.log(response.data.message)
    }

const hanldeUpload = async (id) => {
   setId(id)
  const userId = currentUser.id
  console.log(userId)
  const formData = new FormData()
  const imgObj =  {id, name: file.name}
  formData.append('image', file)
  setIsLoading(true)
    console.log(fiveArray) 
    currentUser.image.map((item, i) => {
    fiveArray.splice(item.id -1, 1, item)
  })
  // fiveArray.filter((item) => item.id !== id)
  fiveArray.splice(id - 1, 1, imgObj) 
  console.log(fiveArray)
  setImages(fiveArray)
    const response = await axios.post(`http://localhost:5000/users/upload/${id}?userId=${userId}&name=${currentUser.name}&fiveArray=${JSON.stringify(fiveArray)}`, formData)
    setIsLoading(false)
    
    
    if (response) setSuccess(true)
    // const streamlinedImages = []
    //      fiveArray.map((item) => {
    //        if (item.name !== 'noPic') streamlinedImages.push(item)
    //        })
    //       console.log(streamlinedImages)

      console.log(fiveArray)
    setCurrentImages(fiveArray)

    console.log(currentImages)

}


const imageFunc = (e) => {

  try {
    if (!currentUser){
      throw new Error('no current user')
    } else {

      
      const backendUser = users.find((user)  => user.id === currentUser.id).image
      console.log(backendUser)
      
      backendUser.map((item, i) => {
       fiveArray.splice(item.id -1, 1, item)
       console.log(fiveArray) 
      })
      
      setInitialName(currentUser.name)
      setName(currentUser.name)
      setAge(currentUser.age)
      setCurrentImages(fiveArray)
      console.log(backendUser)
      // console.log(fiveArray) 
    }
  } catch (error) {
    setData(error.message)
  }
}
console.log(currentImages && currentImages)




const handleDelete = async ( image, id, index) => {
  const userId = currentUser.id
  console.log(userId)
   const latestArray = currentImages.map((item) => {
     if (item.id === id) return  {id: id, name: 'noPic'}
     return item
    })
    console.log(latestArray)
  const response = await axios.delete(`http://localhost:5000/delete/${currentUser.id}?name=${currentUser.name}&file=${image.name}&latestArray=${JSON.stringify(latestArray)}`)
    console.log(response.data)
  setCurrentImages(latestArray)
  setFile('')
  setSuccess(false)
  setImages(latestArray)
      }

      const hanldeImageId = (ide) => {
        setId(ide)
        setSuccess(false)
      
      }

      const hanldePreviousFileName = (name) => {
        setInitialFileName(name)
        console.log(initialFileName && initialFileName)
      }

        const handleName = (e) => {
        setName(e.target.value)
        console.log(name)
    }

     const handleAge = (e) => {
        setAge(e.target.value)
        console.log(age)
    }

      useEffect(()=> {
  imageFunc()
}, [])
      useEffect(()=> {
 handleEdit()
}, [])








    console.log(currentImages)
            return (
                <section className="edit-user">
                  <h2>Edit</h2>
             <h2>Edit User</h2>
    <article className='edit-user-images-container'
    >


{currentImages && currentImages.map((image, index) => {
  return (
    <article className="inner-cont" key={image.id}>
      <div
       className="del-icon"
       >
        {isLoading && image.name === file && file.name ?  <p className="loading">Loading...</p> : ''}
       
                {image.name === 'noPic' ?  '':   <div className="the-icons"><p 
        className="edit-icon-inner"
        ><input type="file"  className="input-for-edit" 
        onChange={(e) => instantHandleFile(e, image.id)}
        onClick={() => hanldePreviousFileName(image.name)}
        /><FontAwesomeIcon icon={faPenToSquare}/> </p><p 
        className="del-icon-inner"
        onClick={() => handleDelete(image, image.id, index)}
        > <FontAwesomeIcon icon={faTimes} /> </p></div>}
          
       
      
        </div>
  {image.name === 'noPic' ? <div className="input-icon">{id === image.id && file ? <p
  className="image-name"
  >{ file ? file.name : '' }</p> : ''}<br/> {id !== image.id || !file  ? <p  className="plus"><FontAwesomeIcon icon={faPlus}/></p> : ''}<input type="file" className={'add-pic-edit'}  onChange={(e) => handleFile(e, image.id)}  onClick={() => hanldeImageId(image.id)}/>
 </div> : <img className="edit-image" src={`http://localhost:5000/images/${currentUser.name}/${image.name}`} alt={image.name} key={index}/>}
{ instantFile && instantId === image.id ? <p
  className="image-name"
  >{ instantFile.name}</p> : ''}<br/> 
{file && <button className={id === image.id && !success ? 'show-button': 'hide-button'} onClick={() => hanldeUpload(image.id,)}
  style={{
    position: 'absolute',
    zIndex: 10
  }}
  >upload image</button>}

{instantFile && <button  
style={{
    position: 'absolute',
    zIndex: 10,
    fontSize: '.6rem',
    padding: '.2rem'
  }}
  className={instantId === image.id && !instantSelect ? 'show-button': 'hide-button'}
onClick={() => hanldeInstantUpload(image.id)}> delete and upload </button>} 
    </article>
  )
})}
</article>
 <form className="edit-user-form">
  <input type="text" value={name}  onChange={(e) => handleName(e)}/>
  <input type="text" value={age} onChange={e => handleAge(e)}/>
  </form>
<button 
onClick={handleUPdate}
  >update</button>
  <p>{data}</p>
</section>
    )
}

export default EditUser

