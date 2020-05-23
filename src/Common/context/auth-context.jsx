import {createContext} from 'react';

export const AuthContext=createContext({
    userId:null,
    isLoggedin:false,
    token:null,
    role:null,
    login:()=>{},
    logout:()=>{}
});//This is a object , we can use this for manage our logins

/* go for app.js to see the implementation of this thing. */