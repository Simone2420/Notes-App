import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/Form.css'
export default function Form(props) {
    const { route, method } = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(route)
        console.log(method)
        console.log("antes de api.post")
        try {
            console.log("dentro de api.post")
            const response = await api.post(route, { username, password })
            console.log("después de api.post")
            console.log("Response data:", response.data)
            if (method === "Login") {
                console.log("Login successful!")
                //console.log("Access token:", response.data.access)
                //console.log("Refresh token:", response.data.refresh)
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                console.log("Tokens guardados, navegando a /")
                navigate("/")
            }
            else{
                alert("Registration successful! You can now login.")
                navigate("/login")
            }
        }
        catch (error) {
            alert("An error occurred: " + error)
        }
        finally {
            setLoading(false)
        }

    }
    return (
        <form onSubmit={handleSubmit} className='form-contaniner'>
            <h1>{method === "Login" ? "Login" : "Register"}</h1>
            <input 
            className='form-input' 
            type="text" 
            value={username}
            onChange={(e)=>{
                setUsername(e.target.value)
                console.log(e.target.value)
            }}
            placeholder='Username' 
            />
            <input 
            className='form-input' 
            type="password" 
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            placeholder='Password' 
            />
            <button className="form-button" type='submit'>
                {method === "Login" ? "Login" : "Register"}
            </button>
        </form>
    )
}
