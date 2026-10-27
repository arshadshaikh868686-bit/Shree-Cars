import {useAuth} from '../Context/authContext1'
import { Navigate } from 'react-router'

export default function protectedRoute({childen}){
    const {dealer} = useAuth()
    if(!dealer){
        return <Navigate to ='/login' replace />
    }
    return childen
}
