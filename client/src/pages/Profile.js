import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import TenantDetails from "../components/TenantDetails";
import CurrentBalance from "../components/currentBalance";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/user/uid/${user}`)
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setState(response.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(
          "Unable to connect to the server. Please contact tech support"
        );
      });
    return () => {};
  }, []);

  return (
    <form>
      <Loading loading={loading} />
      {error && <div className="error">{error}</div>}
      {state && (
        <div key={`div-user`}>
          <TenantDetails key={`details`} state={state} />
          <CurrentBalance key={`balance`} state={state} />
        </div>
      )}
      <button className="btnPay" onClick={() => navigate("setting")}>
        <i className="fa-solid fa-gear"></i> <strong> Edit Profile</strong>
      </button>
    </form>
  );
};

export default Profile;
