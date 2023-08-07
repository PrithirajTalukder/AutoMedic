import React from 'react'
import { SafeAreaView, Text, View,Image,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Periodic =()=>{
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex:1}}>

           

            <View style={{backgroundColor:"white",
            borderRadius:20,
            top:80,
            width:350,
            paddingLeft:20,
            paddingRight:20,
            marginLeft:20,
            marginRight:10,
            height:670,
            position: "absolute",
            backgroundColor:"lightblue",
            elevation:6,
              }}>
            <Image source={require("../images/workInP.png")}
            style={{ width: 110, height: 110,marginTop:250, marginLeft:100 }} />

              </View>
        </SafeAreaView>
    )
}

export default Periodic