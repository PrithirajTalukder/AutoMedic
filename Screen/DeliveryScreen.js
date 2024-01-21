
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../assets/themes';
import * as Icon from 'react-native-feather';

export default function DeliveryScreen() {
  const navigation = useNavigation();

  // Set the location to Sylhet, Bangladesh
  const sylhetCoordinates = {
    latitude: 24.8949,
    longitude: 91.8687,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: sylhetCoordinates.latitude,
          longitude: sylhetCoordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{ flex: 1 }}
        mapType="standard"
      >
        <Marker
          coordinate={sylhetCoordinates}
          title="Auto Medic"
          description="Description for Auto Medic"
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>

      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <TouchableOpacity className="absolute right-4 top-2"></TouchableOpacity>
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">Estimated Arrival</Text>
            <Text className="text-3xl font-extrabold text-gray-700">20-30 Minutes</Text>
            <Text className="mt-2 text-gray-700 font-semibold">Your Order is on its way</Text>
          </View>
          <Image className="h-24 w-24" source={require('../images/bikeguy.gif')} />
        </View>

        <View
          style={{ backgroundColor: themeColors.bgColor(0.8) }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
        >
          <View style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="p-1 rounded-full">
            <Image style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="w-16 h-16 rounded-full" source={require('../images/messi.jpg')} />
          </View>

          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">Syed Noman</Text>
            <Text className="text-white font-semibold">Your Rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} strokeWidth="1" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Home')} className="bg-white p-2 rounded-full">
              <Icon.X stroke={'red'} strokeWidth="5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
