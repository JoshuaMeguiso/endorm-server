import { useState } from "react"
import { useChangePassword } from "../hooks/useChangePassword"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom'

const Setting = () => {
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const { change_Pass, isLoading, error } =  useChangePassword()
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await change_Pass(user.user_Name, password, password1, password2)
    }

    return (
        <div className="tenant-details">
            {isLoading ? (
                <div className="loader-container">
                <div className="spinner"></div>
                </div>
            ) : (
                ""
            )}
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h1>
                        Change Password
                    </h1>
                    <label>
                        <br/>
                        <h2>
                            User Name: 
                        </h2>
                    </label>
                    <input
                        type="username" 
                        disabled
                        value={user.user_Name} 
                    />
                    <label>
                        <h2>
                            Old Password: 
                        </h2>
                    </label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                    />
                    <label>
                        <h2>
                            New Password: 
                        </h2>
                    </label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword1(e.target.value)} 
                        value={password1} 
                    />
                    <label>
                        <h2>
                            Confirm Password: 
                        </h2>
                    </label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword2(e.target.value)} 
                        value={password2} 
                    />
                    {error && <div className="error">{error}</div>}
                    <button className="smallBtn" disabled={isLoading}>
                        <strong>
                            Confirm
                        </strong>
                    </button>
                    <button className="smallBtn" type="button" onClick={() => navigate(-1)}>
                        <strong>
                            Cancel
                        </strong>
                    </button>
                </form>
            </div> 
        </div>
    )
} 

export default Setting