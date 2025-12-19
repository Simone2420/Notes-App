import axios from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "https://notes-app-backend-mqkvvj07d.vercel.app/"
  
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api