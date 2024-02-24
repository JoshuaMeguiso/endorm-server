import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useTenantsContext } from "../hooks/useTenantsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import TenantDetails from "../components/tenantDetails";
import CurrentBalance from "../components/currentBalance";
import axios from "axios";

const Profile = () => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

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
    <>
      {!state && loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        ""
      )}
      {state && (
        <div key={`div-user`}>
          <TenantDetails key={`details`} state={state} />
          <CurrentBalance key={`balance`} state={state} />
        </div>
      )}
      <button className="btnPay" onClick={() => navigate("setting")}>
        <i className="fa-solid fa-gear"></i> <strong> Setting</strong>
      </button>
    </>
  );
};

export default Profile;
