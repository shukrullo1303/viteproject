import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../firebase'
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store"

const useAuth = () => {
    const { user, setUser, isLoading, setIsLoading, error, setError} = useAuthStore()
    const navigate = useNavigate()

    const signUp = async (email: string, password: string) => {
        setIsLoading(true)
        await createUserWithEmailAndPassword(auth, email, password).then(res=> {
            navigate('/')
            setUser(res.user)
            setIsLoading(false)
        }).catch(error => {
            const result = error as Error
            setError(result.message)
        }).finally(() => setIsLoading(false))
    }
    const signIn = async (email: string, password: string) => {
        setIsLoading(true)
        await signInWithEmailAndPassword(auth, email, password).then(res=> {
            navigate('/')
            setUser(res.user)
            setIsLoading(false)
        }).catch(error => {
            const result = error as  Error
            setError(result.message)
        }).finally(() => setIsLoading(false))
    }
    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
        .then(() => {
            setUser({} as User)
            navigate('/auth')
        })
        .catch(err => {
            const result = err as Error
            setError (result.message)
        })
        .finally(() => setIsLoading(false))
    }
    return {signUp, signIn, logOut, user, error, isLoading}
}

export default useAuth
