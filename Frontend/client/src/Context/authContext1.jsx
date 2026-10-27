import { Children, createContext , useContext , useState } from "react";
import api from '../api'


const AuthContext = createContext()

export function authProvider({Children}){
    const [dealer , setDealer] = useState(()=>{
        const saved  = localStorage.getItem('dealer');
        return saved ? JSON.parse(saved): null
    })

   const saveSession = (data)=>{
    localStorage.setItem("token" , data.token)
    localStorage.setItem("dealer" , JSON.stringify(data.dealer))
   }

    const login = async (email , password)=>{
        const {data} = await api.post('/auth/login' , {email , password})
        saveSession(data)
    }

    const register = async(form)=>{
        const {data} = await api.post('/auth/register' , form)
        saveSession(data)
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("dealer")
        setDealer(null)
    }

    return (
        <AuthContext.Provider value={{login , register , logout , dealer}}>
            {Children}
        </AuthContext.Provider>
    )
}
