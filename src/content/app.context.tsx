import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useMemo } from "react";
import { useAuthStore } from "../store/auth.store";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export interface AuthContextState {
    user: User,
    isLoading: boolean,
}

export const AuthContext = createContext<AuthContextState>({
    isLoading: false,
    user: {} as User,
})

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const navigate = useNavigate()
    const { isLoading, user, setUser, setIsLoading } = useAuthStore()
    const value = useMemo(() => ({
        user,
        isLoading 
    }), [user, isLoading])

    useEffect (() => 
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            }
            else{
                setIsLoading(true)
                setUser({} as User)
                navigate('/auth')
            }
            setIsLoading(false)
        }), 
        []
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}