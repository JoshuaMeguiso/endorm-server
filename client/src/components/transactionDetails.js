import { format } from "date-fns";

const transactionDetails = ({ record }) => {
  return (
    <div className="tenant-details">
      <p>
        <strong>Month Bill: </strong>
        {format(new Date(record.start_Month), "MMMM")}
      </p>
      <p>
        <strong>Due Amount: </strong>₱{" "}
        {parseFloat(record.due_Amount).toFixed(2)}
      </p>
      <p>
        <strong>Paid Amount: </strong>₱{" "}
        {parseFloat(record.amount_Paid).toFixed(2)}
      </p>
      <p>
        <strong>Paid On: </strong>
        {format(new Date(record.createdAt), "MMMM dd, Y")}
      </p>
    </div>
  );
};

export default transactionDetails;
