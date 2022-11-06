import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../../Firebase/Firebase.Config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logoutUser = () => {
        localStorage.removeItem('product-token')
        setLoading(true);
        return signOut(auth);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false)
            
        })
        return () => unsubscribe();
    }, [])




    // const [ContextProducts, setContextProducts] = useState([]);
    // useEffect(() => {
    //     fetch('https://product-crud-pagination-jwt-server.vercel.app/products', {
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('product-token')}`
    //         }
    //     })
    //         .then(res => {
    //             if(res.status === 401 || res.status === 403){
    //                 return logoutUser();
    //             }
    //             return res.json();
    //         })
    //         .then(data => setContextProducts(data));
    // }, [ContextProducts])





    const AuthInfo = {user, loading, createUser, loginUser, setLoading, logoutUser, googleLogin}
    
    
    
    return (
        <AuthContext.Provider value ={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;