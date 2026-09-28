import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://crud-backend-roan.vercel.app/api",
    withCredentials : true
})

