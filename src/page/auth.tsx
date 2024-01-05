import { FormEvent, useState } from "react"
import useAuth from "../hooks/useAuth"
import { useAuthStore } from "../store/auth.store"

const Auth = () => {
  const  [auth, setAuth] = useState<"signin" | 'signup'>('signin')
  const [email, setEmail]  = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [ invalid, setInvalid ] = useState<boolean>(false)
  const { signUp, signIn }  = useAuth()
  const { isLoading, error} = useAuthStore()
 
  const toggleAuth = (state: "signin" | 'signup') => {
    setAuth(state)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!password.length) {
      setInvalid(true)
    }
    setInvalid(false)
    if (auth === 'signup') {
      signUp(email, password)
    }
    else {
      signIn(email, password)
    }
  }

  return (
      <main className="container form-signin text-center mt-4">
        <form className="m-auto w-50 " onSubmit={onSubmit}>
            <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal mt-2">{auth == 'signin' ? 'Please sign in': "Please sign up"}</h1>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="form-floating mt-2">
            <input 
              type="email" 
              className={`form-control ${invalid && 'is-invalid'}`}
              id="floatingInput" 
              placeholder="name@example.com" 
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mt-2">
            <input 
              type="password" 
              className={`form-control ${invalid && 'is-invalid'}`}
              id="floatingPassword" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <label htmlFor="floatingPassword">Password</label>
            </div>
            <button 
              className="btn btn-primary w-100 py-2 mt-2" 
              type="submit"
              disabled = {isLoading}>
              {isLoading ? 'Loading ...' : auth == "signin" ? "Sign In" : 'Sign Up'}
            </button>
              {auth == 'signin' ? (
                <p className="mt-5 mb-3 text-body-secondary">Don't you have an account yet: 
                  <span className="text-primary" onClick={() => toggleAuth('signup')}>Signup</span>
                </p>
              ):
              (
                <p className="mt-5 mb-3 text-body-secondary">Already have an account: 
                  <span className="text-primary" onClick={() => toggleAuth('signin')}>Signin</span>
                </p>
              )
              } 
        </form>
        </main>
  )
}

export default Auth
