import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const useAxiosSecure = () => {
    const {handleSignOut} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            error => {
                console.log("error caught in the interceptor",error);
                if(error.response?.status === 401 || error.response?.status === 403){
                    handleSignOut()
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )
    }, [handleSignOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;