import React from 'react'
import { Text, View } from 'react-native';
import HomeMap from '../HireMechanic/HomeMap';
import CovidMessage from '../HireMechanic/CovidMeessage';
import HomeSearch from '../HireMechanic/HomeSearch';
import { useEffect, useState } from 'react';


const Mechanic =()=>{
    return (
        <View>
            <HomeMap/>
            <CovidMessage/>
            <HomeSearch/>
        </View>
        
    )
}

export default Mechanic