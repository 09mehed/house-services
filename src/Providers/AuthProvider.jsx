import React, { useEffect, useState } from 'react';
import AuthContext from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Components/firebase/firebase.init'
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState(null)
    const googlProvider = new GoogleAuthProvider()
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        // const newTheme = theme ? "black" : "#ffffff";
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        // return newTheme;
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleRegisterUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const handleGoogleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googlProvider)
    }

    const manageProfile = (manageProfile) => {
        setUserProfile(manageProfile.photoUrl)
        return updateProfile(auth.currentUser, manageProfile)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,  (currentUser) => {
            setUser(currentUser)
            if(currentUser?.email){
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: currentUser?.email}, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                    setLoading(false)
                })
            }else{
                axios.post(`${import.meta.env.VITE_API_URL}/logout`,{}, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                    setLoading(false)
                })
            }
            
        })
        return (() => {
            unsubscribe()
        })
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        handleRegisterUser,
        handleLogin,
        handleSignOut,
        handleGoogleLogin,
        manageProfile,
        userProfile,
        theme,
        toggleTheme
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;