import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } =  useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(userName, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1>
                Log In
            </h1>
            <label>
                <h2>
                    User Name: 
                </h2>
            </label>
            <input 
                type="username" 
                onChange={(e) => setUsername(e.target.value)} 
                value={userName} 
            />
            <label>
                <h2>
                    Password: 
                </h2>
            </label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
            {error && <div className="error">{error}</div>}
            <button className="btnPassword" disabled={isLoading}>
                <strong>
                    Log in
                </strong>
            </button>
            <button className="btnPassword" type="button" onClick={() => navigate("/card")}>
                <strong>
                    Use ID Card
                </strong>
            </button>

            {isLoading ? (
                <div className="loginLoader-container">
                <div className="spinner"></div>
                </div>
            ) : (
                ""
            )}
        </form>
    )
}

export default Login