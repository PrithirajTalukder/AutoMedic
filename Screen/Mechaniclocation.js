import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";

const Mechaniclocation = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Fetch workshop data (dummy data for example)
      const workshopData = [
        { id: 1, latitude: 24.8997, longitude: 91.8585, mechanic: 'Mechanic 1', workshop: 'Workshop A', address: '123 Main St' },
        { id: 2, latitude: 24.8990, longitude: 91.8700, mechanic: 'Mechanic 2', workshop: 'Workshop B', address: '456 Oak St' },
        { id: 3, latitude: 24.8965, longitude: 91.8749, mechanic: 'Mechanic 3', workshop: 'Workshop C', address: '789 Pine St' },
        { id: 4, latitude: 24.8949, longitude: 91.8687, mechanic: 'Auto Medic Mechanic', workshop: 'Auto Medic Workshop', address: '101 Elm St' },
        // Add more workshop data as needed
      ];

      setWorkshops(workshopData);
    })();
  }, []);

  const onMapLayout = () => {
    // Set any necessary actions on map layout
  };

  const handleMarkerPress = (mechanic) => {
    console.log('Marker pressed. Mechanic data:', mechanic);

    if (mechanic) {
      console.log('Selected mechanic name:', mechanic);
      navigation.navigate('Chat', { mechanicName: mechanic });
    } else {
      console.log('Mechanic data is undefined:', mechanic);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleChatPress = () => {
    // Implement your logic for handling chat option
    console.log(`Chat with ${selectedPlace}`);
  };

  const handleCallPress = () => {
    // Implement your logic for handling call option
    console.log(`Call ${selectedPlace}`);
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
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
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
        {workshops.map(mechanic => (
          <Marker
            key={mechanic.id}
            coordinate={{
              latitude: mechanic.latitude,
              longitude: mechanic.longitude,
            }}
            pinColor={mechanic.id === 4 ? 'lightblue' : 'green'} // Customize the workshop marker color
          >
            <Callout onPress={() => handleMarkerPress(mechanic.mechanic)}>
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontWeight:800, color:'blue'}}>{mechanic.mechanic}</Text>
                <Text style={{color:'blue'}}>Tap to chat or call</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Simple Bottom Modal */}
      <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text>Name: {selectedPlace}</Text>
          <Text>Workshop: {workshops.find(m => m.mechanic === selectedPlace)?.workshop}</Text>
          <Text>Address: {workshops.find(m => m.mechanic === selectedPlace)?.address}</Text>
          <TouchableOpacity onPress={handleChatPress}>
            <Text>📱 Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCallPress}>
            <Text>📞 Call</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default Mechaniclocation;


