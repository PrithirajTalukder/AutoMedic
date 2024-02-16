import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { themeColors } from '../assets/themes';
import * as Icon from 'react-native-feather';

export default function DeliveryScreen() {
  // Set up navigation hook
  const navigation = useNavigation();

  // State to store the current device location
  const [location, setLocation] = useState(null);

  // State to store the dynamically updated estimated arrival time
  const [estimatedArrival, setEstimatedArrival] = useState('30-40 Minutes');

  // Effect to fetch the current device location on component mount
  useEffect(() => {
    // Get the current device location
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    // Call the fetchLocation function
    fetchLocation();
  }, []);

  // Effect to simulate dynamically updating the estimated arrival time
  useEffect(() => {
    // Simulated logic: Calculate the distance between rider and destination
    // and update the estimated arrival time accordingly
    // This logic would depend on your backend or the way you track the rider's location

    // For demonstration purposes, let's assume the rider is getting closer over time
    const intervalId = setInterval(() => {
      const newEstimatedArrival = Math.max(5, Math.random() * 40); // Simulated time in minutes
      setEstimatedArrival(`${Math.floor(newEstimatedArrival)} Minutes`);
    }, 30000); // Update every 30 seconds (adjust as needed)

    // Clean up the interval when the component is unmounted or navigated away
    return () => clearInterval(intervalId);
  }, []);

  // Dummy coordinates for Auto Medic location
  const sylhetCoordinates = {
    latitude: 24.8949,
    longitude: 91.8687,
  };

  // Render the component
  return (
    <View style={{ flex: 1 }}>
      {/* Check if location is available before rendering MapView */}
      {location && (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ height:600 }}
          mapType="standard"
        >
          {/* Marker for Your Location */}
          <Marker
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            title="Your Location"
            description="Your current location"
            pinColor={'red'}
          />
          {/* Marker for Auto Medic location */}
          <Marker
            coordinate={sylhetCoordinates}
            title="Auto Medic"
            description="All in one solution"
            pinColor={'lightblue'}
            
          />
        </MapView>
      )}

      {/* View for delivery details */}
      <View style={{ marginTop:-30,flex: 1, backgroundColor: 'white',borderTopLeftRadius:20, borderTopRightRadius:20,elevation:10 }}>
        <View style={{ backgroundColor: 'white', paddingTop: 10, paddingHorizontal: 15,borderTopLeftRadius:20, borderTopRightRadius:20, }}>
          {/* Button to navigate back to Market screen */}
          <TouchableOpacity
            style={{ position: 'absolute', right: 15, top: 10 }}
            onPress={() => navigation.navigate('Market')}
          >
            <Icon.X stroke={'red'} strokeWidth="2" />
          </TouchableOpacity>
          {/* Text displaying estimated arrival time */}
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Estimated Arrival</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#181f63' }}>{estimatedArrival}</Text>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: 'bold' }}>
            Your Order is on its way
          </Text>
        </View>

        {/* View for rider information */}
        <View
          style={{
            backgroundColor: '#bad6e3', // Change background color to light blue
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 35,
            marginHorizontal: 10,
            borderRadius: 10,
            elevation:2
          }}
        >
          {/* Rider's profile picture */}
          <View style={{ backgroundColor: 'rgba(255,255,255,0.4)', padding: 5, borderRadius: 50 }}>
            <Image style={{ width: 50, height: 50, borderRadius: 40 }} source={require('../images/rider.jpg')} />
          </View>
          {/* Rider's information */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{width:100,height:30, fontSize: 18, fontWeight: 'bold', color: 'black' }}>Anonymous</Text>
            <Text style={{ color: 'gray', fontWeight: 'bold' }}>Your Rider</Text>
          </View>
          {/* Actions for calling and navigating back to Market */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <TouchableOpacity style={{ backgroundColor: 'white', padding: 7, borderRadius: 20 }}>
              <Icon.Phone fill="#008000" stroke="#008000" strokeWidth="1" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Main')}
              style={{ backgroundColor: 'white', padding: 7, borderRadius: 20, marginLeft: 10 }}
            >
              <Icon.X stroke={'red'} strokeWidth="3" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
