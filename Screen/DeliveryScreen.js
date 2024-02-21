import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet,} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { themeColors } from '../assets/themes';
import * as Icon from 'react-native-feather';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';



export default function DeliveryScreen() {
  
  // Set up navigation hook
  const navigation = useNavigation();
  
  return (
  <>
   <LottieView 
  style={{flex:1, position:'relative', zIndex:55,}}
  source={require('../assets/confetti.json')}
  autoPlay
  loop

  />
  
  
      
  <View style={styles.modalBox}>
  
   
    <Text style={{
    width:'99%',
    paddingLeft:10,
    fontSize:18, 
    fontWeight:700, 
    color:'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
  }}>
    THANK YOU FOR TAKING OUR SERVICES!
    </Text>
    
    <Text style={{marginTop:30, color:'white', fontSize:10}}>For any query, you can email us at automedic@gmail.com</Text>
     <TouchableOpacity 
     style={{marginTop:60, padding:10, borderWidth:1,elevation:6, borderRadius:5, backgroundColor:'#bad6e3'}}
     onPress={() => navigation.navigate("Main")}>
      <Text style={{color:'black', fontWeight:700}}>Continue</Text>
      </TouchableOpacity>  
  </View>
  
  </>
  
)
}
const styles = StyleSheet.create({

modalBox: {
  position:'absolute',
  backgroundColor: '#15174f',
  borderRadius: 15,
  marginLeft: 10,
  paddingTop: 20,
  paddingLeft: 2,
  paddingRight: 2,
  paddingBottom: 30,
  justifyContent:'center',
  alignItems:'center',
  top:'25%',
  width: '95%',
  height: '50%', 
  elevation:5,
},


});
  

