import React, { createContext, useState, useEffect, useRef } from 'react';
import { getUsers, sleep } from '../services/api';

const blankUser = {
    "id": -1,
    "name": "*",
    "temperature": 0.0,
    "heart_rate": 0,
    "blood_pressure": 0,
    "respiratory_rate": 0
}

export const Context = createContext();

const ContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(blankUser);
    const [updating, setUpdating] = useState(false);
    const spin = useRef(null);

    async function fetchUsers(quantity){
		await sleep(1000);
        getUsers(quantity).then(data => setUsers(data));
    }

    useEffect(() => {
        if(updating){
            fetchUsers(spin.current.value);
        }
    }, [updating, users]);


    useEffect(() => {
        const array = users.filter(item => (item.id === currentUser.id));
        setCurrentUser(() => (array.length === 0)? blankUser : array[0]);
    }, [users, currentUser.id]);

    return (
        <Context.Provider
            value={{
                users,
                currentUser,
                updating,
                spin,
                setCurrentUser,
                setUpdating,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
