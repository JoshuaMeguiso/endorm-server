import { format } from 'date-fns'

const transactionDetails = ({payment}) => {
    
    return(
        <div className="tenant-details">
            <p>
                <strong>Month Bill: </strong>
                {format(new Date(payment.start_Month), 'MMMM')}
            </p>
            <p>
                <strong>Due Amount: </strong>
                ₱ {parseFloat(payment.due_Amount).toFixed(2)}
            </p>
            <p>
                <strong>Paid Amount: </strong>
                ₱ {parseFloat(payment.amount_Paid).toFixed(2)}
            </p>
            <p>
                <strong>Paid On: </strong>
                {format(new Date(payment.createdAt), 'MMMM dd, Y')}
            </p>
        </div>
    )
}

export default transactionDetails