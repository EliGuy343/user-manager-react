import { Fragment, useContext, useEffect, useState } from 'react'
import './users.css'
import { AddUser } from '../../modals/addUser/AddUser';
import { UserContext } from '../../context/UserContext';
import { Spinner } from '../../components/loading/Loading';
export const Users = () => {
    const userContext = useContext(UserContext);
    const {loading, users, getUsers} = userContext;
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    useEffect(()=> {
            getUsers(query);
        },
    // eslint-disable-next-line
    [query, open]);
    return (<> 
            <div className='mainDiv'>
                <AddUser open={open} closeWindow={()=>setOpen(false)}/>
                <div className='userSearch'>
                    <h3>Search Users</h3>
                    <input
                        type="text" 
                        className='searchBar'
                        onChange={(e)=> {setQuery(e.target.value)}}/>
                </div>
                {loading ? <Spinner/> : <div className='usersDiv'>
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
                                    <button className='tableLocationButton'>
                                        View Location
                                    </button>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                    <div className='addUser'>
                        <button onClick={() => setOpen(true)}
                            className='addUserButton'
                        >
                            Add Users
                        </button>
                    </div>
                </div>}
            </div>
    </>);
}
