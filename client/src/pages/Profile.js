import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//Context
import { useTenantsContext } from "../hooks/useTenantsContext"
import { useAuthContext } from '../hooks/useAuthContext'

//components
import TenantDetails from '../components/tenantDetails'
import CurrentBalance from '../components/currentBalance'

const Profile = () => {
    const { tenants, dispatch } = useTenantsContext()
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTenants = async () => {
            setLoading(true);
            const response = await fetch(`/tenant/${user.user_Name}`)
            const json = await response.json()
            if(response.ok){
               dispatch({type: 'SET_TENANTS', payload: json})
            }
            setLoading(false);
        }
        fetchTenants();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {!tenants && loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                ""
            )}
            {tenants && tenants.map((tenant) => (
                <div key={tenant.tenant_ID}>
                    <TenantDetails 
                        key={tenant.tenant_ID} 
                        tenant={tenant} 
                    />
                    <CurrentBalance 
                        key={tenant._id} 
                        tenant={tenant}
                    />
                </div>
            ))}
            <button className='btnPay' onClick={() => navigate('setting')}> 
                <i className="fa-solid fa-gear"></i> 
                <strong> Setting</strong>
            </button>
            <button className='btnPay' onClick={() => navigate('card')}> 
                <i className="fa-regular fa-address-card"></i>
                <strong> Register Card</strong>
            </button>
        </>
    )
} 

export default Profile