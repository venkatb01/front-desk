import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

const AppContext=createContext();

export const AppProvider=({children})=>{
   
    const[token,setToken]=useState(null);


    useEffect(()=>{
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
        }
    },[]);

    return (
        <AppContext.Provider value={{axios,token,setToken}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    return useContext(AppContext);
}