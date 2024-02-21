import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux'; // Import the Provider component
import { mystore } from './redux/MyStore'; // Import your Redux store
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import Home from './Screen/Home';
import Welcome from './Screen/Welcome';
import SignIn from './Screen/SignIn';
import SignUp from './Screen/SignUp';
import ForgotPassword from './Screen/ForgotPassword';
import Periodic from './Options/Periodic';
import AC from './Options/AC';
import Wheel from './Options/Wheel';
import Denting from './Options/Denting';
import Batteriesservice from './Options/Batteriesservice';
import Carspa from './Options/Carspa';
import Detailing from './Options/Detailing';
import MainContainer from './Navigation/MainContainer';
import Workshoplocation from './Screen/Workshoplocation';
import Mechaniclocation from './Screen/Mechaniclocation';
import Mylocation from './Screen/Mylocation';
import Mechanic from './Screen/Mechanic';
import Account from './Screen/Account';
import Profile from './Screen/Profile';
import Batteries from './Products/Batteries';
import MyCar from './Screen/MyCar';
import CarType from './Screen/CarType';
import MyCart from './Screen/MyCart';
import Preparingorder from './Screen/Preparingorder';
import DeliveryScreen from './Screen/DeliveryScreen';
import Market from './Screen/Market';
import Payment from './Screen/Payment';
import Chat from './Screen/Chat';
import Myorder from './Screen/Myorder';
import Orderdetails from './Screen/Orderdetails';
import Schedule from './Screen/Schedule';

import { StripeProvider } from '@stripe/stripe-react-native';
import Lights from './Products/Lights';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <Provider store={mystore}> 

    <StripeProvider publishableKey="pk_test_51ORWrgBWfBrJrHZ12RNAI1gfoqIfCrabKnoZrm8jOzA8U3jOV6aZxQCCGr3NXbTvo76EqAHcUhGqHpd07FdupYBz00Z4uWPKaY">

    

      <NavigationContainer>

        <Stack.Navigator initialRouteName="DeliveryScreen">
        
          <Stack.Screen name="Main" options={{ headerShown: false }} component={MainContainer} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
          <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
          <Stack.Screen name="Periodic" options={{ headerShown: false }} component={Periodic} />
          <Stack.Screen name="AC" options={{ headerShown: false }} component={AC} />
          <Stack.Screen name="Wheel" options={{ headerShown: false }} component={Wheel} />
          <Stack.Screen name="Denting" options={{ headerShown: false }} component={Denting} />
          <Stack.Screen name="Batteriesservice" options={{ headerShown: false }} component={Batteriesservice} />
          <Stack.Screen name="Carspa" options={{ headerShown: false }} component={Carspa} />
          <Stack.Screen name="Detailing" options={{ headerShown: false }} component={Detailing} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
          <Stack.Screen name="Workshoplocation" options={{ headerShown: false }} component={Workshoplocation} />
          <Stack.Screen name="Mechaniclocation" options={{ headerShown: false }} component={Mechaniclocation} />
          <Stack.Screen name="Mylocation" options={{ headerShown: false }} component={Mylocation} />
          <Stack.Screen name="Account" options={{ headerShown: false }} component={Account} />
          <Stack.Screen name="Mechanic" options={{ headerShown: false }} component={Mechanic} />
          <Stack.Screen name="Batteries" options={{ headerShown: false }} component={Batteries} />
          <Stack.Screen name="Lights" options={{ headerShown: false }} component={Lights} />
          <Stack.Screen name="MyCart" options={{ headerShown: false }} component={MyCart} />
          <Stack.Screen name="Preparingorder" options={{ headerShown: false }} component={Preparingorder} />
          <Stack.Screen name="DeliveryScreen" options={{ headerShown: false }} component={DeliveryScreen} />
          <Stack.Screen name="Market" options={{ headerShown: false }} component={Market} />
          <Stack.Screen name="Payment" options={{ headerShown: false }} component={Payment} />
          <Stack.Screen name="Chat" options={{ headerShown: false }} component={Chat} />
          <Stack.Screen name="Myorder" options={{ headerShown: false }} component={Myorder} />
          <Stack.Screen name="Orderdetails" options={{ headerShown: false }} component={Orderdetails} />
          <Stack.Screen name="Schedule" options={{ headerShown: false }} component={Schedule} />
          <Stack.Screen name="MyCar" options={{ headerShown: false }} component={MyCar} />
          <Stack.Screen name="CarType" options={{ headerShown: false }} component={CarType} />
        </Stack.Navigator>
      </NavigationContainer>
      
      </StripeProvider>
    </Provider>
   
  );
}

export default gestureHandlerRootHOC(App);
