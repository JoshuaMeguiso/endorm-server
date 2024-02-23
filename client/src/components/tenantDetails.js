import { add, format } from 'date-fns'

const tenantDetails = ({ tenant }) => {
    return(
        <div className="tenant-details">
            <p>
                <strong>
                    Tenant Name &emsp;&emsp;&emsp;&ensp; :&emsp;
                </strong> 
                {tenant.first_Name} {tenant.last_Name}
            </p>
            <p>
                <strong>
                    Room ID&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :&emsp;
                </strong>
                {tenant.room_ID}
            </p>
            <p>
                <strong>
                    Birthday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; :&emsp;
                </strong>
                {format ( new Date(tenant.birth_Date), 'MMMM dd, Y')}
            </p>
            <p>
                <strong>
                    Contact Information&nbsp; :&emsp;
                </strong>
                {tenant.contact_Info}
            </p>
            <p>
                <strong>
                    Emergency Number&ensp; :&emsp;
                </strong>
                {tenant.emergency_Num}
            </p>
            <p>
                <strong>
                    Address &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;:&emsp;
                </strong>
                {tenant.address}
            </p>
            <p>
                <strong>
                    Start of Term &emsp;&emsp;&emsp;&emsp; :&emsp;
                </strong>
                {format ( new Date(tenant.start_Term), 'MMMM dd, Y')}
            </p>
            <p>
                <strong>
                    Lease of Term &emsp;&emsp;&emsp;&ensp;&nbsp;&nbsp;:&emsp;
                </strong>
                {tenant.lease_Term} Months
            </p>
            <p>
                <strong>
                    End of Term &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; :&emsp;
                </strong>
                {format(add(new Date(tenant.start_Term), {months: tenant.lease_Term}), 'MMMM, dd, Y')}
            </p>
        </div>
    )
}

export default tenantDetails