import React, { createContext, useContext, useEffect } from "react";
import axiosAuth from "../config/axios_auth";
interface User {
    _id: string,
    name: string,
    email: string,
    isAdmin: boolean,
    createdAt: string,
    profileImage: string
}

interface UserContextType {
    users: User[] | null,
    error: any,
    loading: boolean,
    refetchUsers: () => void
}


const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [error, setError] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [users, setUsers] = React.useState<User[] | null>(null);
    const fetchUsers = async () => {
        try {
            const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users`);
            if (data) setUsers(data.data);
        } catch (error: any) {
            console.log(error)
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    const refetchUsers = () => {
        fetchUsers();
    }
    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <UserContext.Provider value={{ users, error, loading, refetchUsers }}>
            {children}
        </UserContext.Provider>
    );
}

export const setUsers = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
}