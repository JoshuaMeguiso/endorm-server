import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { add, format } from 'date-fns'

import { useAuthContext } from '../hooks/useAuthContext'
import { useTransactionsContext } from  '../hooks/useTransactionsContext'

const Statement = () => {
    const { transactions, dispatch } = useTransactionsContext()
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatements = async () => {
            setLoading(true);
            const response = await fetch(`/transaction/${user.user_Name}/false`)
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_TRANSACTIONS', payload: json[0]})
                setLoading(false);
            }
        }
        fetchStatements();
        // eslint-disable-next-line
    }, [])
    
    return (
        <>
            {!transactions && loading ? (
                <div className="loader-container">
                <div className="spinner"></div>
                </div>
            ) : (
                <>
                    {!transactions && (
                        <div className='tenant-details'>
                            <p><strong>No Statement of Account</strong></p>
                        </div>
                    )}
                </>
            )}
            {transactions && (
                <>
                    <div className="tenant-details">
                        <p>
                            <strong>
                                Tenant Name &emsp;&emsp;&emsp;&emsp;:&emsp;
                            </strong>
                            {transactions.tenant_Name}
                        </p>
                        <p>
                            <strong>
                                Tenant ID&emsp;&emsp;&emsp;&emsp; &emsp;&emsp; :&emsp;
                            </strong>
                            {transactions.tenant_ID}
                        </p>
                        <p>
                            <strong>
                                Room ID&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;:&emsp;
                            </strong>
                            {transactions.room_ID}
                        </p>
                        <p>
                            <strong>
                                Period Covered&emsp;&emsp;&emsp; &nbsp;:&emsp;
                            </strong>
                            {format(new Date(transactions.start_Month), 'MMMM dd, Y')} - 
                        </p>
                        <p>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &nbsp;{format(add(new Date(transactions.start_Month), {months: 1}), 'MMMM dd, Y')}
                        </p>
                        <p>
                            <strong>
                                Room Rate&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :&emsp;
                            </strong>
                            ₱ {parseFloat(transactions.room_Rate).toFixed(2)}
                        </p>
                        <p>
                            <strong>
                                Water Charge&emsp;&emsp;&emsp;&emsp;:&emsp; 
                            </strong>
                            ₱ {parseFloat(transactions.water_Charge).toFixed(2)}
                        </p>
                        <p>
                            <strong>
                                Previous Reading&emsp;&emsp; :&emsp;
                            </strong>
                            {transactions.previous_Reading} KWH
                        </p>
                        <p>
                            <strong>
                                Present Reading&emsp;&emsp;&ensp; :&emsp;
                            </strong>
                            {transactions.present_Reading} KWH
                        </p>
                        <p>
                            <strong>
                                Total Consume &emsp;&emsp;&emsp; :&emsp;
                            </strong>
                            {transactions.total_Consume} KWH
                        </p>
                        <p>
                            <strong>
                                Room Consume&emsp;&emsp;&emsp;:&emsp;
                            </strong>
                            ₱ {parseFloat(transactions.room_Consume).toFixed(2)}
                        </p>
                        <p>
                            <strong>
                                Individual Consume&ensp; :&emsp;
                            </strong>
                            ₱ {parseFloat(transactions.individual_Consume).toFixed(2)}
                        </p>
                        <p>
                            <strong>
                                Total Amount&emsp;&emsp;&emsp;&emsp; :&emsp; 
                            </strong>
                            ₱ {parseFloat(transactions.total_Amount).toFixed(2)}
                        </p>
                    </div>
                    <button className='btnPay' onClick={() => navigate('pay')}>
                        <i className="fa-solid fa-money-bills"></i>
                        <strong> Pay </strong>
                    </button>
                    <button className='btnPay' onClick={() => navigate('print')}>
                        <i className="fa-sharp fa-solid fa-receipt"></i>
                        <strong> Print</strong>
                    </button>
                </>
            )}
        </>
    )
} 

export default Statement