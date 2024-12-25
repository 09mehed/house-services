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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            if(currentUser?.email){
                setUser(currentUser)
                const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: currentUser?.email}, {withCredentials: true})
            }else{
                setUser(currentUser)
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {withCredentials: true})
                console.log(data);
            }
            setLoading(false)
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
        userProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;