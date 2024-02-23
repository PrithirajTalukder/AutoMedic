import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

const CarType = () => {
  const navigation = useNavigation();
  const [selectedInfo, setSelectedInfo] = useState({ manufacturer: '', model: '' });
  const [confirmPressed, setConfirmPressed] = useState(false);

  const handleConfirmPress = (manufacturer, model) => {
    setSelectedInfo({ manufacturer, model });
    setConfirmPressed(true);
    // Show an alert with the selected information
    Alert.alert(
      "Selected Information",
      `Manufacturer: ${manufacturer}\nModel: ${model}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  return (
    <>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop: 5, marginTop: 35, marginLeft: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate("MyCar")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: '700' }}>Back</Text>
      </View>

      <View style={styles.modalBox}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop: 5 }}>
          <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: '700', color: '#15174f' }}>Select Model</Text>
        </View>
        <View style={{ marginTop: 15, marginLeft: 9, borderTopWidth: 1, borderColor: 'gray', width: '95%' }}></View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => handleConfirmPress("Suzuki", "Sera")}>
              <Image style={{ width: 80, height: 61, marginRight: 10 }} source={require('../images/Cars/sera.png')} />
              <Text style={{ fontWeight: '700' }}>Sera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => handleConfirmPress("Toyota", "Etios")}>
              <Image style={{ width: 80, height: 61, marginRight: 10 }} source={require('../images/Cars/etios.png')} />
              <Text style={{ fontWeight: '700' }}>Etios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => handleConfirmPress("Audi", "Corolla")}>
              <Image style={{ width: 80, height: 61, marginRight: 10 }} source={require('../images/Cars/corolla.png')} />
              <Text style={{ fontWeight: '700' }}>Corolla</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => handleConfirmPress("BMQ", "Crysta")}>
              <Image style={{ width: 90, height: 61, marginRight: 10 }} source={require('../images/Cars/crysta.png')} />
              <Text style={{ fontWeight: '700' }}>Crysta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => handleConfirmPress("Hyundai", "Hilux")}>
              <Image style={{ width: 80, height: 61, marginRight: 10 }} source={require('../images/Cars/hilux.png')} />
              <Text style={{ fontWeight: '700' }}>Hilux</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => handleConfirmPress("Mercedes", "Innova")}>
              <Image style={{ width: 80, height: 61, marginRight: 10 }} source={require('../images/Cars/innova.png')} />
              <Text style={{ fontWeight: '700' }}>Innova</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => handleConfirmPress("Mitsubishi", "SUV")}>
              <Image style={{ width: 80, height: 61, marginRight: 10 }} source={require('../images/Cars/suv.png')} />
              <Text style={{ fontWeight: '700' }}>SUV</Text>
            </TouchableOpacity>
          </View>
        </View>
        {confirmPressed && (
          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: 'blue' }]}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={{ color: 'white', fontWeight: '700' }}>Confirm</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: '#bad6e3',
    borderRadius: 15,
    marginLeft: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 30,
    marginTop: 10,
    width: '95%',
    height: '80%',
  },
  modalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
});

export default CarType;
