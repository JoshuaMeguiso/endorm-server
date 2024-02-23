
const currentBalance = ({tenant}) => { 
    const balanceConverted = parseFloat(tenant.balance);
    return(
        <div className="tenant-details">
            <p>
                <strong>Amount Payable: ₱ {balanceConverted.toFixed(2)}</strong>
            </p>
        </div>
    )
}

export default currentBalance