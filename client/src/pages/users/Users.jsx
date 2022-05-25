import { useState } from 'react'
import './users.css'
import { AddUser } from '../../modals/addUser/AddUser';
export const Users = () => {

    const [open, setOpen] = useState(false);
    const users = [
        {
            fullName:"some govnar",
            id:"123456789",
            phoneNumber:"0501123213",
            ip:"192.168.1.1",
            location:"unknown"
        },
        {
            fullName:"some govnar",
            id:"123456788",
            phoneNumber:"0501123213",
            ip:"192.168.1.1",
            location:"unknown"
        },
        {
            fullName:"some govnar",
            id:"123456787",
            phoneNumber:"0501123213",
            ip:"192.168.1.1",
            location:"unknown"
        },
        {
            fullName:"some govnar",
            id:"123456786",
            phoneNumber:"0501123213",
            ip:"192.168.1.1",
            location:"unknown"
        },
    ]
    return (
        <div className='mainDiv'>
            <AddUser open={open} closeWindow={()=>setOpen(false)}/>
        <div className='userSearch'>
            <h3>Search Users</h3>
            <input type="text" className='searchBar'/>
        </div>
        <div className='usersDiv'>
            <table className='usersTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Phone Number</th>
                        <th>IP Address</th> 
                    </tr>
                </thead>
                <tbody>
                {users && users.map(
                    user=> (
                        <tr key={user.id} className="tableRow">
                            <td>{user.fullName}</td>
                            <td>{user.id}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.ip}</td>
                            <button className='tableDeleteButton'>
                                Remove
                            </button>
                            <button className='tableLocationButton' >
                                View Location
                            </button>
                        </tr>
                    )
                )}
                </tbody>
            </table>
            <div className='addUser'>
                <button onClick={() => setOpen(true)} className='addUserButton'>
                    Add Users
                </button>
            </div>
        </div>
    </div>
  )
}
