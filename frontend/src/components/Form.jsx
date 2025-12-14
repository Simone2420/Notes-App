import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
// Tailwind styles applied via className; removed custom CSS import
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
        <form onSubmit={handleSubmit} className="max-w-[350px] mx-auto my-10 p-8 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col gap-4">
            <h1 className="text-center mb-3 text-2xl text-gray-900 tracking-wide">
                {method === "Login" ? "Login" : "Register"}
            </h1>
            <input
                className="px-4 py-3 border border-gray-300 rounded-md text-base bg-gray-50 transition-colors outline-none focus:border-blue-600 focus:bg-white"
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                    console.log(e.target.value)
                }}
                placeholder="Username"
            />
            <input
                className="px-4 py-3 border border-gray-300 rounded-md text-base bg-gray-50 transition-colors outline-none focus:border-blue-600 focus:bg-white"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                placeholder="Password"
            />
            <button className="py-3 mt-2 bg-blue-600 text-white rounded-md text-lg font-semibold cursor-pointer transition-colors hover:bg-blue-700 focus:bg-blue-700" type='submit'>
                {method === "Login" ? "Login" : "Register"}
            </button>
        </form>
    )
}
