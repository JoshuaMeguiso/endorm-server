import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { add, format } from 'date-fns'
import { useTransactionsContext } from  '../hooks/useTransactionsContext'
import { usePay } from '../hooks/usePay'

const Pay = () => {
    const { transactions } = useTransactionsContext()
    const { Payment, isLoading, error } =  usePay()
    const [showForm, setShowForm] = useState(false);
    const [ compareCash, setCompareCash ] = useState('')
    const [credits, setCredits] = useState(0);
    const navigate = useNavigate();

    //Information for Reciept 
    const cashRemaining = parseFloat(transactions.total_Amount) - credits
    const id = transactions._id
    const tenant_Name = transactions.tenant_Name
    const room_ID = transactions.room_ID
    const bill_Month = format(new Date(transactions.start_Month), 'MMMM, Y')
    const start_Month = format(new Date(transactions.start_Month), 'MMMM dd, Y')
    const end_Month = format(add(new Date(transactions.start_Month), {months: 1}), 'MMMM dd, Y')
    const water_Charge = transactions.water_Charge
    const individual_Consume = transactions.individual_Consume
    const room_Rate = transactions.room_Rate
    const amount_Due = transactions.total_Amount
    const date_Paid = format(new Date(transactions.updatedAt), 'MMMM dd, Y')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await Payment(id, credits, compareCash, tenant_Name, room_ID, bill_Month, start_Month, end_Month, room_Rate, water_Charge, individual_Consume, amount_Due, date_Paid)
    }

    useEffect(() => {
        const fetchCredits = async () => {
          const response = await fetch('http://127.0.0.1:8000/credits');
          const data = await response.json();
          setCredits(prevCredits => prevCredits + parseInt(data?.value || 0));
        };
    
        const intervalId = setInterval(fetchCredits, 2000); // Fetch credits every 2 seconds
    
        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    return (
        <div className="tenant-details">
            {isLoading ? (
                <div className="loader-container">
                <div className="spinner"></div>
                </div>
            ) : (
                ""
            )}
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h1>
                        Payment
                    </h1>
                    <label>
                        <br/><h2>
                            <strong>
                                Amount Due: 
                            </strong>
                        </h2>
                    </label>
                    <input
                        type="float" 
                        disabled
                        value={cashRemaining.toFixed(2)} 
                    />
                    <label>
                        <h2>
                            <strong>
                                Insert Money to Pay
                            </strong>
                        </h2>
                    </label>
                    <input 
                        disabled = {showForm}
                        type="float" 
                        onChange={(e) => setCompareCash(e.target.value)} 
                        value={compareCash}
                    />
                    {!showForm && (
                        <>
                            <button className="smallBtn" disabled={isLoading} onClick={() => setShowForm(true)}>
                                <strong>
                                    Confirm
                                </strong>
                            </button>
                            <button className="smallBtn" type="button" onClick={() => navigate(-1)}>
                                <strong>    
                                    Cancel
                                </strong>
                            </button>
                        </>
                    )}
                    {showForm && (
                        <>
                            <label htmlFor="credits">
                                <h2>
                                    <strong>
                                        Total Cash Inserted: 
                                    </strong>
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
                                <strong>
                                    Confirm
                                </strong>
                            </button>
                            <button className="smallBtn" type="button" onClick={() => navigate(-1)}>
                                <strong>    
                                    Cancel
                                </strong>
                            </button>
                        </>
                    )}
                </form>
            </div> 
        </div>
    )
} 

export default Pay