import React from 'react';
//import { StatusBar } from 'expo-status-bar';
//import { View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
//import {TailwindProvider} from 'nativewind';

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


const Stack = createNativeStackNavigator();

export default function App(){
  return (
      
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" options={{headerShown: false}} component={MainContainer}/>
              <Stack.Screen name="Home" options={{headerShown: false}} component={Home}/>
              <Stack.Screen name="Welcome" options={{headerShown: false}} component={Welcome}/>
              <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignIn}/>  
              <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp}/>
              <Stack.Screen name="ForgotPassword" options={{headerShown: false}} component={ForgotPassword}/>
              <Stack.Screen name="Periodic" options={{headerShown: false}} component={Periodic}/>
              <Stack.Screen name="LocationSearch" options={{headerShown: false}} component={LocationSearch}/>
              <Stack.Screen name="Account" options={{headerShown: false}} component={Account}/>
              <Stack.Screen name="Mechanic" options={{headerShown: false}} component={Mechanic}/>
          </Stack.Navigator>
      </NavigationContainer>
      
      );
};