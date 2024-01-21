import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux'; // Import the Provider component
import { mystore } from './redux/MyStore'; // Import your Redux store

import Home from './Screen/Home';
import Welcome from './Screen/Welcome';
import SignIn from './Screen/SignIn';
import SignUp from './Screen/SignUp';
import ForgotPassword from './Screen/ForgotPassword';
import Periodic from './Options/Periodic';
import MainContainer from './Navigation/MainContainer';
import LocationSearch from './Screen/LocationSearch';
import Mechanic from './Screen/Mechanic';
import Account from './Screen/Account';
import Profile from './Screen/Profile';
import Batteries from './Products/Batteries';
import Battery1 from './Products/Battery1';
import MyCart from './Screen/MyCart';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={mystore}> 

    <StripeProvider publishableKey="pk_test_51ORWrgBWfBrJrHZ12RNAI1gfoqIfCrabKnoZrm8jOzA8U3jOV6aZxQCCGr3NXbTvo76EqAHcUhGqHpd07FdupYBz00Z4uWPKaY">

      <NavigationContainer>

        <Stack.Navigator initialRouteName="Batteries">
        
          <Stack.Screen name="Main" options={{ headerShown: false }} component={MainContainer} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
          <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
          <Stack.Screen name="Periodic" options={{ headerShown: false }} component={Periodic} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
          <Stack.Screen name="LocationSearch" options={{ headerShown: false }} component={LocationSearch} />
          <Stack.Screen name="Account" options={{ headerShown: false }} component={Account} />
          <Stack.Screen name="Mechanic" options={{ headerShown: false }} component={Mechanic} />
          <Stack.Screen name="Batteries" options={{ headerShown: false }} component={Batteries} />
          <Stack.Screen name="Battery1" options={{ headerShown: false }} component={Battery1} />
          <Stack.Screen name="MyCart" options={{ headerShown: false }} component={MyCart} />
        </Stack.Navigator>
      </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
