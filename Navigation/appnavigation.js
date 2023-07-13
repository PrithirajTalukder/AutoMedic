import { Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth'; // Import the useAuth hook from the correct file
import SignIn from "../Screen/SignIn";
import Home from "../Screen/home";
import Welcome from "../Screen/Welcome";
import SignUp from "../Screen/SignUp";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const navigation = useNavigation();
    const { user } = useAuth(navigation);

    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SignIn">
                    <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SignUp">
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

