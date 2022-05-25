import { createContext, useReducer } from "react";
import axios from 'axios';
const INITIAL_STATE = {
    users:[],
    loading:false
}

export const UserContext = createContext(INITIAL_STATE);

const UserReducer = (state, action) => {
    switch(action.type) {
        case "NEW_SEARCH":
            return {
                users:action.payload,
                loading:false
            };
        case "DELETE_USER":
            return {
                users: state.users.filter(
                    user => user.id === action.payload.id
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
                res = await axios.get(`http://localhost:7200/api/users?name=${nameQuery}`);
            else 
                res = await axios.get(`http://localhost:7200/api/users`);  
            dispatch({type:"NEW_SEARCH", payload:res.data});
        } 
        catch (error) {
           console.log(error); 
        }
    };

    return  (
        <UserContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                getUsers,
                dispatch
            }}
        >
            {children}
        </UserContext.Provider>
    )
}