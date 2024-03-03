import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginCard } from "../hooks/useLoginCard";
import axios from "axios";
import Loading from "../components/Loading";
import InputSettings from "../components/InputSettings";
import { useAuthContext } from "../hooks/useAuthContext";

const LoginCard = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  const [error, setError] = useState("");
  const [uid_key, setUidKey] = useState("123123");
  const { dispatch } = useAuthContext();
  const { loginCard, new_user, setNewUser, isLoading } = useLoginCard();

  const handleTapCard = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    loginCard(uid_key);
    // axios
    //   .get("http://127.0.0.1:8000/uid")
    //   .then((response) => {
    //     setLoading(false);
    //     if (response.data) {
    //       loginCard(response.data);
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(err);
    //     setError("Login Failed, Please Try Again");
    //   });
  };

  return (
    <form className="login">
      {!new_user ? (
        [
          <div className="logoHome">
            <i className="fa-solid fa-motorcycle"></i>
          </div>,
          <h1 style={{ textAlign: "center" }}>WELCOME USER!</h1>,
          <button
            style={{ marginTop: 50, marginBottom: 20 }}
            className="full-width-btn"
            onClick={handleTapCard}
          >
            Tap Your Card
          </button>,
        ]
      ) : (
        <div>
          <h1 style={{ marginBottom: 50 }}>New User Profile</h1>
          <InputSettings
            label="Name"
            name="name"
            value={state.name}
            setState={setState}
          />

          <InputSettings
            label="Address"
            name="address"
            value={state.address}
            setState={setState}
          />

          <InputSettings
            label="Motorcycle Brand"
            name="motorcycle_brand"
            value={state.motorcycle_brand}
            setState={setState}
          />

          <InputSettings
            label="Motorcycle Name"
            name="motorcycle_name"
            value={state.motorcycle_name}
            setState={setState}
          />

          <InputSettings
            label="Plate Number"
            name="plate_no"
            value={state.plate_no}
            setState={setState}
          />

          <InputSettings
            label="Contact Number"
            name="contact_no"
            value={state.contact_no}
            setState={setState}
          />
          <button
            className="smallBtn"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              axios
                .put("/user/", { ...state, uid_key })
                .then((response) => {
                  if (response.data) {
                    loginCard(response.data.uid_key);
                  }
                })
                .catch((err) => console.log(err));
            }}
          >
            <strong>Confirm</strong>
          </button>
          <button
            className="smallBtn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setNewUser(false);
            }}
          >
            <strong>Cancel</strong>
          </button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <Loading loading={isLoading} className="loginLoader-container" />
    </form>
  );
};

export default LoginCard;
