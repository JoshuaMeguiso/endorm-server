import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginCard } from "../hooks/useLoginCard";
import axios from "axios";

const LoginCard = () => {
  const navigate = useNavigate();
  const { loginCard, error, isLoading } = useLoginCard();

  //   useEffect(() => {
  //     axios
  //       .get("http://127.0.0.1:8000/uid")
  //       .then((response) => {
  //         if (response.data) {
  //           loginCard(response.data);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //     return () => {};
  //   }, []);

  return (
    <form className="login">
      <h1 style={{ textAlign: "center" }}>WELCOME!</h1>
      <h1 style={{ textAlign: "center" }}>Tap Card to Start</h1>
      <div className="logoHome">
        <i
          onClick={() => loginCard("123123")}
          className="fa-regular fa-address-card"
        ></i>
      </div>
      {error && <div className="error">{error}</div>}

      {isLoading ? (
        <div className="loginLoader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default LoginCard;
