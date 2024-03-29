import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Modal, Alert, StyleSheet, style, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Grid } from 'react-native-feather';
import { AntDesign, FontAwesome } from '@expo/vector-icons';



const MyCar = () => {
  const navigation = useNavigation();
  return (
    <>
    <View style={{ width: '100%',  flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop: 5, marginTop:35, marginLeft:15 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 700 }}>Back</Text>
        </View>
        
    
    
      <View style={styles.modalBox}>
      <View style={{ width: '100%',  flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop: 5}}>
      
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 700, color:'#15174f' }}>Select Manufacturer</Text>
        </View>
        <View style={{ marginTop:15,marginLeft:9, borderTopWidth: 1, borderColor:'gray',width:'95%' }}>
        </View>
        <View style={{marginTop:10}}>
        <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/suzuki.jpg')}
          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/toyota.png')}
          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/audi.jpg')}
          />
            </TouchableOpacity>

            </View> 
            <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/bmw.jpg')}
          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/hyundai.jpg')}
          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/mercedes.jpg')}
          />
            </TouchableOpacity>

            </View> 
            <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/mitshu.jpg')}
          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/rover.jpg')}
          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CarType")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/honda.png')}
          />
            </TouchableOpacity>

            </View> 
            
            </View>
      
            
    </View>
    
    </>
    
  )
}
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
    height: '80%', // adjust the width as needed
  },
  modalContainer:{
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    
  }
  
});

export default MyCar
