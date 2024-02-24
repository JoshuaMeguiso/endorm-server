const currentBalance = ({ state }) => {
  const balanceConverted = parseFloat(state.balance);
  return (
    <div className="tenant-details">
      <p>
        <strong>Balance: ₱ {balanceConverted.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default currentBalance;
