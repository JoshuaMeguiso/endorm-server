import { useEffect, useState } from 'react'

import TransactionDetails from '../components/transactionDetails'
import { useAuthContext } from '../hooks/useAuthContext'
import { useHistoryContext } from  '../hooks/useHistoryContext'

const Transaction = () => {
    const { history, dispatch } = useHistoryContext()
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            const response = await fetch(`/payment/${user.user_Name}`)
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_HISTORY', payload: json})
                setLoading(false);
            }
        }
        fetchTransactions();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {!history && loading ? (
                <div className="loader-container">
                <div className="spinner"></div>
                </div>
            ) : (
                <>
                    {history && (
                        <>
                            {!history[0] && (
                                <div className='tenant-details'>
                                    <p><strong>No History of Transaction</strong></p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
            {history && history.map((payment)=> (
                <div key={payment._id}>
                    <TransactionDetails 
                        key={payment._id} 
                        payment={payment} 
                    />
                </div>
            ))}
        </>
    )
} 

export default Transaction