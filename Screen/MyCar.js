import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Modal, Alert, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const MyCar = () => {
  return (
    
    
      <View style={styles.modalBox}>
           <View style={{ width: '100%',  flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingTop: 5, }}>
        
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 700 }}>Select Manufacturer</Text>
      </View> 
            
          </View>
    
    
    
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
    marginTop: 78,
    width: '95%',
    height: '80%', // adjust the width as needed
  },
  
});

export default MyCar
