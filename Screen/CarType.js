import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Modal, Alert, StyleSheet, style, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Grid } from 'react-native-feather';
import { AntDesign, FontAwesome } from '@expo/vector-icons';



const CarType = () => {
  const navigation = useNavigation();
  return (
    <>
    <View style={{width: '100%',  flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop: 5, marginTop:35, marginLeft:15 }}>
      <TouchableOpacity onPress={() => navigation.navigate("MyCar")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 700 }}>Back</Text>
        </View>
        
    
    
      <View style={styles.modalBox}>
      <View style={{ width: '100%',  flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop: 5}}>
      
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 700, color:'#15174f' }}>Select Model</Text>
        </View>
        <View style={{ marginTop:15,marginLeft:9, borderTopWidth: 1, borderColor:'gray',width:'95%' }}>
        </View>
        <View style={{marginTop:10}}>
        <View style={styles.modalContainer}>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/sera.png')}
          />
          <Text style={{fontWeight:'700'}}>Sera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/etios.png')}
          />
          <Text style={{fontWeight:'700'}}>Etios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/corolla.png')}
          />
          <Text style={{fontWeight:'700'}}>Corolla</Text>
            </TouchableOpacity>

            </View> 
            <View style={styles.modalContainer}>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 90, height: 61, marginRight: 10 }}
          source={require('../images/Cars/crysta.png')}
          />
          <Text style={{fontWeight:'700'}}>Crysta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/hilux.png')}
          />
          <Text style={{fontWeight:'700'}}>Hilux</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/innova.png')}
          />
          <Text style={{fontWeight:'700'}}>Innova</Text>
            </TouchableOpacity>

            </View> 
            <View style={styles.modalContainer}>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/suv.png')}
          />
          <Text style={{fontWeight:'700'}}>SUV</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/sera.png')}
          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Image
          style={{ width: 80, height: 61, marginRight: 10 }}
          source={require('../images/Cars/sera.png')}
          />
            </TouchableOpacity> */}

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

export default CarType