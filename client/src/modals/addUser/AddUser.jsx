import './addUser.css'
import {toast} from 'react-toastify';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import {isIP} from 'is-ip';

function containsAnyLetter(str) {
    return /[a-zA-Z]/.test(str);
  }

function validateName(str) {
    if(str.length < 1) {
        toast.error("Name is required",
            {position: toast.POSITION.BOTTOM_CENTER});
        return false;
    }
    return true;
}

function validateId(str) {
    if(str.length < 1) {
        toast.error("Id is required",
            {position: toast.POSITION.BOTTOM_CENTER});
        return false;
    }
    if(containsAnyLetter(str)) {
        toast.error("Id is invalid",
            {position: toast.POSITION.BOTTOM_CENTER});
        return false;
    }
    
    return true;
}

function validatePhone(str) {
    if(str.length < 1) {
        toast.error("Phone Number is required",
            {position: toast.POSITION.BOTTOM_CENTER});
        return false;
    }
    if(containsAnyLetter(str)) {
        toast.error("Phone Number is invalid",
            {position: toast.POSITION.BOTTOM_CENTER});
        return false;
    }
    return true;
}

function validateIp(str) {
    debugger;
    if(str.length < 1) {
        toast.error("IP is required",
            {position: toast.POSITION.BOTTOM_CENTER});
        return false;
    }
    if(!isIP(str)) {
        toast.error("IP is invalid",
            {position: toast.POSITION.BOTTOM_CENTER});
        return false;
    }
    return true;
}



export const AddUser = ({open,closeWindow}) => {
    const userContext = useContext(UserContext);
    const {addUser} = userContext;
    const [user, setUser] = useState({
        fullName:"",
        id:"",
        phoneNumber:"",
        ip:""
    });

    
    const onChange = e => setUser({...user, [e.target.name]:e.target.value});
    const validateForm = e =>{
        e.preventDefault(); 
        if(validateName(user.fullName) && validateId(user.id) &&
        validatePhone(user.phoneNumber) && validateIp(user.ip))
        {
            addUser(user);
            closeWindow();
        }
    };
    
    if(!open)
        return null
        
    return (
        <div className="overlay">
            <div className='userModal'>
                <h2>Add A user</h2>
                <form className="userForm">
                    <input
                        type="text"
                        placeholder="FullName"
                        name="fullName"
                        value={user.fullName}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        placeholder="id"
                        name="id"
                        value={user.id}
                        onChange={onChange}
                    />
                    <input 
                        type="text" 
                        placeholder="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        placeholder="ip"
                        name="ip"
                        value={user.ip}
                        onChange={onChange}
                    />
                    <button type="submit" onClick={validateForm}>
                        Submit
                    </button>
                </form>
                <button className='closeButton' onClick={closeWindow}>
                    Close
                </button>
            </div>
        </div>
  )
}
