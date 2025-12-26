import {useState, useContext} from 'react'
import axios from 'axios'
import UserContext from '../context/userProvider'

const CreateUser = () => {
  const {name, setName, age, setAge} = useContext(UserContext)
         const [file, setFile] = useState()
        const [files, setFiles] = useState()
        const [alert, setAlert] = useState()


    const hanldeSubmit = async (e) => {
      try {
        
        e.preventDefault()
        const formData = new FormData()
        files.map((file) => formData.append('images', file))
        console.log(formData)
        const newPerson = {
            name, 
            age,
        }
        if (files.length > 20)  {
          throw new Error('cant send more than 5 photos')
        }

        else {
          const response = await axios.post(`http://localhost:5000/create-person?name=${name}&age=${age}`, formData )
          if (response){

            setAlert('User Created')
          }
          // console.log(response.data)
        } 
  
      } catch (error) {
          console.log(error.message)
          setAlert(error.message)
      }
       

        
    }

    const handleName = (e) => {
        setName(e.target.value)
        console.log(name)
    }

     const handleAge = (e) => {
        setAge(e.target.value)
        console.log(age)
    }

           const handleFile = (e) => {
        setFile(e.target.files[0])
        const alFiles =  Object.values(e.target.files)
        setFiles(alFiles)
        console.log(alFiles)
         
        console.log(e.target.files)
    }

      const hanldeUploads = async (e) => {
        e.preventDefault()
      const formData = new FormData()
        files.map((file) => formData.append(`${name}`, file))
      
    console.log(formData)
        const response = await axios.post(`http://localhost:5000/uploads`, formData)
    }


    
  return (
    <div>
        <h2>Users List</h2>
            <form onSubmit={hanldeSubmit}>
               <label>Name</label> <input type="text" onChange={handleName} /><br/>
              <label>Age</label>     <input type="text" onChange={handleAge}/><br/>
                <input type="file" onChange={handleFile} multiple/>
                <button type="submit">Submit</button>
                <p>{alert}</p>

            </form>
    </div>
  )
}

export default CreateUser
