import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator, StyleSheet, View, Text, Alert } from 'react-native';

const MyLocation = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        navigation.navigate('Home'); // Navigate to Home if permission is not granted
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, [navigation]);

  const confirmLocation = () => {
    Alert.alert(
      'Confirm Location',
      `Is this your current location?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            Alert.alert('Confirmation', 'You have to confirm your location first.', [{ text: 'OK' }]);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
           
  
            // After navigating to Mycars, navigate to Main with confirmedLocation
            navigation.navigate('MyCar', { confirmedLocation: location });
          },
        },
      ],
      { cancelable: false }
    );
  };
  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#bad6e3" />
      </View>
    );
  }

  const initialRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
    
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {/* User Location Marker */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Your Location"
          description="You are here!"
          pinColor="blue" // Customize the user location marker color
        />
      </MapView>
      <View style={styles.confirmButtonContainer}>
        <Text onPress={confirmLocation} style={styles.confirmButton}>
          Confirm Location
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  map: {
    flex: 1,
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#bad6e3',
    padding: 14,
    borderRadius: 10,
    elevation: 10,
    borderColor:'black',
    borderWidth:1,
  },
  confirmButton: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    
  },
});

export default MyLocation;

