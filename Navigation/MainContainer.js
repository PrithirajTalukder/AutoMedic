import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'




import Home from '../Screen/Home';
import Help from '../Screen/Help';
import Account from '../Screen/Account';
import Market from '../Screen/Market';
import Mechanic from '../Screen/Mechanic';


const homeName = 'Home';
const helpName = 'Help';
const marketName = 'Market';
const accountName = 'Account';
const mechanicName = 'Mechanic';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return (
        
            <Tab.Navigator initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({ focused, color, size}) => {
                    let iconName;
                    let rn= route.name;

                    if (rn === homeName){
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn=== helpName) {
                        iconName = focused ? 'help' : 'help-circle-outline';
                    }
                    else if (rn=== mechanicName) {
                        iconName = focused ? 'build' : 'build-outline';
                    } else if (rn=== marketName) {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (rn=== accountName) {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarStyle: {position: 'absolute',paddingTop: 10, height: 70, backgroundColor: "lightblue", borderRadius:10 },
                
            })}
            tabBarOptions={{
                labelStyle: { paddingBottom: 8,fontWeight:500, fontSize: 12, color: "black" },
                activeTintColor: 'black',
                
                
              }}
            >
                <Tab.Screen name={homeName} options={{headerShown:false}} component={Home}/>
                <Tab.Screen name={helpName} options={{headerShown:false}}  component={Help}/>
                <Tab.Screen name={mechanicName} options={{headerShown:false}}  component={Mechanic}/>
                <Tab.Screen name={marketName}  options={{headerShown:false}}  component={Market}/>
                <Tab.Screen name={accountName} options={{headerShown:false}}  component={Account}/>
            </Tab.Navigator>
        
    )
}
