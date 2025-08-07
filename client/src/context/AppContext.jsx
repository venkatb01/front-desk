import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

const AppContext=createContext();

export const AppProvider=({children})=>{
    // const navigate=useNavigate();
    const[token,setToken]=useState(null);


    useEffect(()=>{
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization']=`${token}`
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