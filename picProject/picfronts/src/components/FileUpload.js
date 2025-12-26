import React, { useEffect, useState } from "react";
import axios from 'axios'


const FileUpload = () => {
    const [file, setFile] = useState()
    const [files, setFiles] = useState()
    const [data, setData] = useState()

    const handleFile = (e) => {
        setFile(e.target.files[0])
        const alFiles =  Object.values(e.target.files)
        setFiles(alFiles)
        console.log(alFiles)
         
        console.log(e.target.files)
    }
    
    const hanldeDownload = async () => {
        console.log(files)
        const response = await axios.get(`http://localhost:5000/user`)
        console.log(response.data[0])
        setData(response.data[2])
    }


    const hanldeUpload = async () => {
      const formData = new FormData()
//  const newForm = files.map((file) => formData.append('kites', file))
        formData.append('luke', file)
   
        console.log('upload')
    //   formData.append('kite', file)
        const response = await axios.post(`http://localhost:5000/users/upload`, formData)
        // const response = await axios.post(`http://localhost:5000/upload`, formData )
        console.log
(response.data)   
 }

    const getFolderContent = async () => {
    const response = await axios.get('http://localhost:5000/folder')
    console.log(response.data)
}
    const hanldeUploads = async (e) => {
        e.preventDefault()
      const formData = new FormData()
        files.map((file) => formData.append('images', file))
      
    console.log(formData)
        const response = await axios.post(`http://localhost:5000/uploads`, formData)
    }

    useEffect(()=> {
        hanldeDownload()
    }, [])

    return (
        <div className="upload">
        <input type="file" onChange={handleFile} multiple/>
        <button onClick={hanldeUpload}>Upload</button>
        <button onClick={hanldeUploads}>Upload muliple</button>
        <img src={`http://localhost:5000/images/${data && data.name}/${data && data.image[0]}`} alt={data && data.img}/>
        <button onClick={getFolderContent}>Get Folder</button>
        {/* </form> */}
        </div>
    )
}

export default FileUpload