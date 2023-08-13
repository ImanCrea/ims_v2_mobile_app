import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext('');

export const AuthProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [authToken, setAuthToken] = useState<any>(null);

    const login = () => {
        setIsLoading(true);
        setAuthToken('mytoken');
        AsyncStorage.setItem('authToken', 'mytoken');
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setAuthToken(null);
        AsyncStorage.removeItem('authToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setAuthToken(userToken);
            setIsLoading(false);

        } catch(e){
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, authToken }}>
            {children}
        </AuthContext.Provider>
    )
}