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
                console.log("error cought in the interceptor",error);
                if(error.status === 401 || error.status === 403){
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