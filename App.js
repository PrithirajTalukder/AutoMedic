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

const Stack = createNativeStackNavigator();

export default function App(){
  return (
      
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen name="Home" options={{headerShown: false}} component={Home}/>
              <Stack.Screen name="Welcome" options={{headerShown: false}} component={Welcome}/>
              <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignIn}/>
              <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp}/>
          </Stack.Navigator>
      </NavigationContainer>
      
      );
};