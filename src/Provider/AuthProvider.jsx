import { GoogleAuthProvider, onAuthStateChanged,  signInWithPopup, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

import AuthContext from './AuthContext';
import auth from '../Firebase/firebase.config';



const AuthProvider = ({children}) => {
  const [user , setUser] =useState(null)
  const [loading , setLoading] =useState(true)
 
  const googleProvider = new GoogleAuthProvider()

 

  const updateProfileUser = (name , photo ) =>{
 return updateProfile(auth.currentUser ,{
  displayName:name , photoURL:photo
 })
  }



  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  
    return () => unsubscriber(); 
  }, []);
  

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  };


  const authInfo ={
    user,
    loading,
    updateProfileUser,
    googleSignIn,
   setUser
 

  }
 
  return (
   <AuthContext.Provider value={authInfo}>
    {children}
   </AuthContext.Provider>
  );
};

export default AuthProvider;