import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const usePay = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate();


    const Payment = async (id, amount_Paid, compareAmount, tenant_Name, room_ID, bill_Month, start_Month, end_Month, room_Rate, water_Charge, individual_Consume, amount_Due, date_Paid) => {
        setIsLoading(true)
        setError(null)
        
        if(id === '' || amount_Paid === '' || compareAmount === ''){
            setIsLoading(false)
            setError('All fields must be filled')
        }
        else{
            if(parseInt(amount_Paid) >= parseInt(compareAmount)){
                const response = await fetch(`/transaction/${id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ amount_Paid })
                })
                const json = await response.json()
                if (!response.ok) {
                    setIsLoading(false)
                    setError(json.error)
                }
                else{
                    setIsLoading(false)

                    const postString = async () => {
                        try {
                            const response = await fetch('http://127.0.0.1:8000/send_string', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ 
                                    command_string: `2|${tenant_Name}|${room_ID}|${bill_Month}|${start_Month}|${end_Month}|${parseFloat(room_Rate).toFixed(2)}|${parseFloat(water_Charge).toFixed(2)}|${parseFloat(individual_Consume).toFixed(2)}|${parseFloat(amount_Due).toFixed(2)}|${parseFloat(amount_Paid).toFixed(2)}|${date_Paid}\x0D` 
                                }),
                            });
                            const data = await response.json();
                            console.log(data.message);
                        } catch (error) {
                        console.error(error);
                        }
                    }
                    postString();
                    navigate(-1);
                }
            }   
            else{
                setIsLoading(false)
                setError('Did not Reach the Minimum Amount')
            }
        }
    }
    return { Payment, isLoading, error }
}