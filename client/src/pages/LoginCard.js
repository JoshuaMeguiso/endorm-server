import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { useLoginCard } from '../hooks/useLoginCard';

const LoginCard = () => {
    const navigate = useNavigate();
    const { loginCard, error, isLoading } =  useLoginCard()

    useEffect(() => {
        const fetchUid = async () => {
          const response = await fetch('http://127.0.0.1:8000/uid');
          const data = await response.json();
          loginCard(data);
        };
        fetchUid();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <form className="login">
                <h1>
                    &emsp;&emsp;&nbsp;TAP YOUR CARD
                </h1>
                <div className="logoHome">
                    <i className="fa-regular fa-address-card"></i>
                </div>
                {error && <div className="error">{error}</div>}
                <button className="btnPassword" type="button" onClick={() => navigate(-1)}>
                    <strong>
                        Return
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
        </>
    )
}

export default LoginCard