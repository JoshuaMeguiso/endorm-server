import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { add, format } from "date-fns";
import { useTransactionsContext } from "../hooks/useTransactionsContext";
import { usePay } from "../hooks/usePay";
import Loading from "../components/Loading";
import axios from "axios";

const TopUp = () => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(0);
  const { user } = useAuthContext();
  const [error, setError] = useState("Cannot Change Page until Payment");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isPayPage = location.pathname === "/pay";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/user/uid/${user}`)
      .then((response) => {
        if (response.data) {
          setState(response.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    return () => {};
  }, []);

  useEffect(() => {
    const fetchCredits = async () => {
      const response = await fetch("http://127.0.0.1:8000/credits");
      const data = await response.json();
      setCredits((prevCredits) => prevCredits + parseInt(data?.value || 0));
      setState((prevState) => ({
        ...prevState,
        balance: prevState.balance + parseInt(data?.value || 0),
      }));
    };

    if (state?._id) {
      setLoading(false);
      const intervalId = setInterval(fetchCredits, 2000); // Fetch credits every 2 seconds

      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }
  }, [state?._id]);

  return (
    <div className="tenant-details">
      <Loading loading={loading} />

      <div className="form">
        <form onSubmit={() => {}}>
          <h1>Payment</h1>
          {isPayPage && <div className="error">{error}</div>}
          <label>
            <br />
            <h2>
              <strong>Total Inserted:</strong>
            </h2>
          </label>
          <input
            style={{
              color: "white",
              fontSize: 25,
            }}
            type="float"
            disabled
            value={credits}
          />
          <label>
            <h2>
              <strong>Balance:</strong>
            </h2>
          </label>
          <input
            style={{
              color: "white",
              fontSize: 25,
            }}
            disabled
            type="float"
            onChange={(e) => {}}
            value={state.balance}
          />
          <button
            className="smallBtn"
            onClick={(e) => {
              e.preventDefault();
              if (credits === 0) {
                setError("Total Payment is Zero. Please insert bill");
                return;
              }
              axios
                .put("/transaction/", {
                  ...state,
                  date: new Date().toISOString(),
                  amount: credits,
                })
                .then((response) => {
                  if (response.data) {
                    axios
                      .post(`/user/${state._id}`, state)
                      .then(() => navigate("/profile"));
                  }
                });
            }}
          >
            <strong>Save Transaction</strong>
          </button>
          <button
            className="smallBtn"
            onClick={(e) => {
              e.preventDefault();
              if (credits === 0) {
                return navigate("/");
              }
              setError("Cannot cancel, please save the transaction");
            }}
          >
            <strong>Cancel</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopUp;
