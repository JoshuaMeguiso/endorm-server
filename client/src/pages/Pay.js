import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { add, format } from "date-fns";
import { useTransactionsContext } from "../hooks/useTransactionsContext";
import { usePay } from "../hooks/usePay";
import Loading from "../components/Loading";

const Pay = () => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //     const fetchCredits = async () => {
  //       const response = await fetch('http://127.0.0.1:8000/credits');
  //       const data = await response.json();
  //       setCredits(prevCredits => prevCredits + parseInt(data?.value || 0));
  //     };

  //     const intervalId = setInterval(fetchCredits, 2000); // Fetch credits every 2 seconds

  //     return () => clearInterval(intervalId); // Clean up the interval on component unmount
  // }, []);

  return (
    <div className="tenant-details">
      <Loading loading={loading} />
      <div className="form">
        <form onSubmit={() => {}}>
          <h1>Payment</h1>
          <label>
            <br />
            <h2>
              <strong>Total :</strong>
            </h2>
          </label>
          <input type="float" disabled value={""} />
          <label>
            <h2>
              <strong>Insert Money to Pay</strong>
            </h2>
          </label>
          <input
            //disabled={showForm}
            type="float"
            onChange={(e) => {}}
            value={""}
          />
          {/* {!showForm && (
            <>
              <button
                className="smallBtn"
                disabled={isLoading}
                onClick={() => setShowForm(true)}
              >
                <strong>Confirm</strong>
              </button>
              <button
                className="smallBtn"
                type="button"
                onClick={() => navigate(-1)}
              >
                <strong>Cancel</strong>
              </button>
            </>
          )}
          {showForm && (
            <>
              <label htmlFor="credits">
                <h2>
                  <strong>Total Cash Inserted:</strong>
                </h2>
              </label>
              <input
                type="number"
                id="credits"
                name="credits"
                value={credits}
                readOnly
              />
              {error && <div className="error">{error}</div>}
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
            </>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default Pay;
