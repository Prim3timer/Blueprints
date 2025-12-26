import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import axios from "../api/axios"

const ImageUpload = () => {
    const [data, setData] = useState()
    const axiosPrivate = useAxiosPrivate()
    const [file, setFile] = useState()
    const getEmployees = async () => {
        const response = await axios.get('/employers')
        console.log(response.data)
    }
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const hanldeUpload = async () => {
        const formData = new FormData()
        formData.append('eagle', file)
        try {
            const response = await axios.post('/upload', formData)
            console.log(response.data.alert)
            
        } catch (error) {
            
        }
    }

    const hanldeDownload = async () => {
        const response = await axios.get('/download')
        setData(response.data[0])
        console.log(data)
    }

    const updateEmployee = async () => {
        const newName = {name: "Emeka"}
        const response = await axios.put('/update', newName)


    }
useEffect(()=> {
    getEmployees()
}, [])

    useEffect(()=> {
       hanldeDownload()
    }, [])
    return (
        <div>
            <input type="file"  onChange={handleFile} name="callbacks"/>
            <button onClick={hanldeUpload}>Upload</button><br/>
            <button onClick={hanldeDownload}>Donwload</button>
             <img src={axios.get(`/data/${data.img.filename}`)} alt="images"/>
            <button onClick={updateEmployee}>Update Employee</button>
            </div>
    )
}

export default ImageUpload
