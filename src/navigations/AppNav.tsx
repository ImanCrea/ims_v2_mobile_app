/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AppStack from '../routes/AppStack';
import AuthStack from '../routes/AuthStack';
import { useDispatch, useSelector } from 'react-redux';

export default function AppNav(): JSX.Element {
    const {userToken} = useSelector((state:any) => state.user);
    const dispatch = useDispatch();


    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <ActivityIndicator size={"large"} />
    //         </View>
    //     )
    // }

    useEffect(() => {
        // getAuthToken().then(token => {
        //     if(token !== null ) {
        //         //setAuthJWT(token);
        //         dispatch(getToken(token));
        //     }            
        // })
        
    }, []);

    return (
        <NavigationContainer>
            { (userToken !== null) ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    );
}
