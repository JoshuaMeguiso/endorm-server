import { useState, useEffect } from "react";
import { useChangePassword } from "../hooks/useChangePassword";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import InputSettings from "../components/InputSettings";
import axios from "axios";

const Setting = () => {
  const [state, setState] = useState({});
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { change_Pass, isLoading, error } = useChangePassword();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`/user/${state._id}`, state)
      .then((response) => {
        if (response.data) {
          navigate(-1);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`/user/uid/${user}`)
      .then((response) => {
        if (response.data) {
          setState(response.data);
        }
      })
      .catch((err) => console.log(err));
    return () => {};
  }, []);

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
          <h1>User Profile</h1>
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
          <button className="smallBtn" disabled={isLoading}>
            <strong>Confirm</strong>
          </button>
          <button
            className="smallBtn"
            type="button"
            onClick={() => navigate(-1)}
          >
            <strong>Cancel</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
