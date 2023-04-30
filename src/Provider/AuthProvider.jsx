import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.confiq';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut}from "firebase/auth";
export const AuthContext=createContext(null) 

const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const creatUser =(email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    //sign in method
    const logInMethod =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    //observing the user state
    useEffect(()=>{
       const usnsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        // stopping the observing
        return ()=>{
               return usnsubscribe
        }
    },[])
    //sign out method
    const logOut =()=>{
        signOut(auth)
    }
    const authInfo ={
        creatUser,
        user,
        logOut,
        loading,
        logInMethod,
    }
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;