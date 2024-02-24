import { useEffect, useState } from "react";

import TransactionDetails from "../components/transactionDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHistoryContext } from "../hooks/useHistoryContext";
import axios from "axios";

const Transaction = () => {
  const [state, setState] = useState({});
  const [records, setRecords] = useState([]);
  const { history, dispatch } = useHistoryContext();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

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

  useEffect(() => {
    if (state._id) {
      axios
        .get(`/transaction/all/${state.user_id}`)
        .then((response) => {
          if (response.data) {
            setRecords(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
    return () => {};
  }, [state.user_id]);

  return (
    <form>
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
      {records.length === 0 ? (
        <div className="tenant-details">
          <p>
            <strong>No History of Transaction</strong>
          </p>
        </div>
      ) : (
        <>
          {records.map((record, index) => (
            <div key={`transaction-${index}`}>
              <TransactionDetails key={`trans_${index}`} record={record} />
            </div>
          ))}
        </>
      )}
    </form>
  );
};

export default Transaction;
