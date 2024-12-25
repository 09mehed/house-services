import React from 'react';
import useAuth from '../Components/Hook/useAuth';
import {  Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <span className="loading loading-ring loading-lg"></span>
    }
   
    if(user){
        return children
    }
    
    return <Navigate to='/login' state={location?.pathName}></Navigate>
};

export default PrivateRoute;