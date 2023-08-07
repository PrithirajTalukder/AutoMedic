import React from 'react'
import { SafeAreaView, Text, View,Image,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Periodic =()=>{
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex:1}}>

           <View style={{
            flexDirection: "row",
            top:60,
            paddingLeft:23
            }}>
            
            <TouchableOpacity onPress={() => navigation.navigate("Main")}><AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity>
            <Text style={{paddingLeft:22,fontSize:18, fontWeight:600}}>Back</Text>
            </View>

            <View style={{backgroundColor:"white",
            borderRadius:20,
            top:100,
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
