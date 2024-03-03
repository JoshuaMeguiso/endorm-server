import { format } from "date-fns";

const TransactionDetails = ({ record }) => {
  return (
    <div className="tenant-details">
      <p>
        <strong>Date: </strong>
        {new Date(record.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}
      </p>
      <p>
        <strong>Amount: </strong>₱ {parseFloat(record.amount).toFixed(2)}
      </p>
    </div>
  );
};

export default TransactionDetails;
