import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Refer = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate("Main");
      };
  return (
    <>
    <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 30, backgroundColor: '#fff', elevation: 1 }}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>
    <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
        
      <Image source={require("../images/coming.jpg")}
            style={{ width: 500, height: 400, borderRadius:10  }} />
    </View>
    </>
  )
}

export default Refer
