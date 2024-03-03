import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import TransactionDetails from "../components/TransactionDetails";
import { useAuthContext } from "../hooks/useAuthContext";

const Transaction = () => {
  const [state, setState] = useState({});
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

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
        setError(
          "Unable to connect to the server. Please contact tech support"
        );
        console.log(err);
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (state?._id) {
      axios
        .get(`/transaction/all/${state.user_id}`)
        .then((response) => {
          setLoading(false);
          if (response.data) {
            setRecords(response.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setError(
            "Unable to connect to the server. Please contact tech support"
          );
        });
    }
    return () => {};
  }, [state?.user_id]);

  return (
    <form>
      <Loading loading={loading} />
      {error && <div className="error">{error}</div>}
      {records.length === 0 ? (
        <div className="tenant-details">
          <p>
            <strong>No History of Transaction</strong>
          </p>
        </div>
      ) : (
        records.map((record, index) => (
          <div key={`transaction-${index}`}>
            <TransactionDetails key={`trans_${index}`} record={record} />
          </div>
        ))
      )}
    </form>
  );
};

export default Transaction;
