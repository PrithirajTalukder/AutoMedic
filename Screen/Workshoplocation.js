import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const Workshoplocation = () => {
  const [location, setLocation] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      // Fetch workshop data (dummy data for example)
      const workshopData = [
        { id: 1, latitude: 24.8997, longitude: 91.8585, name: 'Workshop 1' },
        { id: 2, latitude: 24.8990, longitude: 91.8700, name: 'Workshop 2' },
        { id: 3, latitude: 24.8965, longitude: 91.8749, name: 'Workshop 3' },
        { id: 4, latitude: 24.8949, longitude: 91.8687, name: 'Auto Medic' },
        // Add more workshop data as needed
      ];

      setWorkshops(workshopData);
    })();
  }, []);

  const onMapLayout = () => {
    setMapReady(true);
  };

  if (!location || workshops.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const initialRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onLayout={onMapLayout}
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
          pinColor="red" // Customize the user location marker color
        />

        {/* Workshop Markers */}
        {workshops.map(workshop => (
          <Marker
            key={workshop.id}
            coordinate={{
              latitude: workshop.latitude,
              longitude: workshop.longitude,
            }}
            title={workshop.name}
            pinColor={workshop.id === 4 ? 'lightblue' : 'green'} // Customize the workshop marker color
          >
            <Callout>
              <View>
                <Text>{workshop.name}</Text>
                <Text>Car Workshop</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default Workshoplocation;
