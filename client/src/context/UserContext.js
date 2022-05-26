import { createContext, useReducer } from "react";
import {toast} from 'react-toastify';
import axios from 'axios';
const INITIAL_STATE = {
    users:[],
    loading:false
}

export const UserContext = createContext(INITIAL_STATE);

const UserReducer = (state, action) => {
    debugger;
    switch(action.type) {
        case "NEW_SEARCH":
            return {
                users:action.payload,
                loading:false
            };
        case "DELETE_USER":
            return {
                users: state.users.filter(
                    user => user.id !== action.payload
                ),
                loading:false
            };
        case "ADD_USER":
            return {
                users: [...state.users, action.payload],
                loading:false
            };
        case "LOADING":
            return {
                ...state,
                loading:true
            };
        default:
            return state;
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    const getUsers = async (nameQuery) => {
        dispatch({type:'LOADING', payload:null});
        let res;
        try {
            if(nameQuery)
                res = await axios.get(`/users?name=${nameQuery}`);
            else 
                res = await axios.get(`/users`);  
            dispatch({type:"NEW_SEARCH", payload:res.data});
        } 
        catch (error) {
            toast.error(error.response.data,
                {position:toast.POSITION.BOTTOM_CENTER});
            console.log(error);
        }
    };

    const addUser = async(user) => {
        dispatch({type:'LOADING', payload:null});
        let res;
        try {
            res = await axios.post(`/users`, user); 
            dispatch({type:"ADD_USER", payload:res.data});
            toast.success("user Added",
                    {position:toast.POSITION.BOTTOM_CENTER});
        } 
        catch (error) {
            toast.error(error.response.data,
                {position:toast.POSITION.BOTTOM_CENTER});
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        dispatch({type:'LOADING', payload:null});
        try {
            await axios.delete(`/users/${id}`);
            dispatch({type:"DELETE_USER", payload:id});
            toast.success("User successfully deleted",
                {position:toast.POSITION.BOTTOM_CENTER});
        } catch (error) {
            toast.error(error.response.data,
                {position:toast.POSITION.BOTTOM_CENTER});
            console.log(error);
        }
    }
    return  (
        <UserContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                getUsers,
                addUser,
                deleteUser,
                dispatch
            }}
        >
            {children}
        </UserContext.Provider>
    )
}