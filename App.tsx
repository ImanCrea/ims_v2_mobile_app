/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/routes/AuthStack';
//import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import AppNav from './src/navigations/AppNav';
import { store } from './src/store/store';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store);

export default function App(): JSX.Element {
  //const { isLoading, authToken }: any = useContext(AuthContext);
  // const {isLoading} = useSelector((state:any) => state.user);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size={"large"} />
  //     </View>
  //   )
  // }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNav />
      </PersistGate>
    </Provider>
    // <AuthProvider>
    //   <AppNav />
    // </AuthProvider>
  );
}
