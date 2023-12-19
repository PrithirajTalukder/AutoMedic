import React from 'react'
import { SafeAreaView,Pressable, Text, View,ScrollView,Image,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Video from 'react-native-video';


const Battery1 =()=>{
    const navigation = useNavigation();

  
    return (
        <SafeAreaView style={{flex:1}}>
          <ScrollView>
          <View style={{paddingTop:10, paddingBottom: 100}}>
           <View style={{
            flexDirection: "row",
            top:40,
            paddingLeft:20
            }}>
            
            <TouchableOpacity onPress={() => navigation.navigate("Main")}><AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity>
            <Text style={{paddingLeft:15,fontSize:18, fontWeight:600}}>Back</Text>
            </View>

            <View style={{marginLeft:25, marginTop:30,top:40}}>
          <Text style={{color:"black", fontSize:24, fontWeight:800,}}>
            Amaron 
          </Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Account")} 
            style={{
              
              backgroundColor:"white",
              paddingTop:80,
              borderRadius:25,
              paddingHorizontal: 12,
              marginTop: 60,
              marginLeft:20,
              marginRight:20,
              borderColor:"lightblue",
              borderWidth:2
            }}>
 
            <Text style={{color:"black",fontWeight:700, fontSize:17,marginLeft:5,top:-60}}>Amaron (66 months warranty)</Text>
            <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top:-40}}>
            <View>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,}}>100 Amp Hour</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>66 Months Warranty</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>Free of cost installation</Text>

            </View>
            <View>
            <Image source={require("../images/batteries/amron.jpg")}
            style={{ width: 100, height: 100, borderRadius:15}} />
            <Pressable onPress={() => navigation.navigate("Home")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 7,
              marginLeft:15,
              marginRight:15,
              borderRadius:5,
              paddingHorizontal: 5,
              marginTop: 20,
              zIndex:10,

            }}><Text style={{color:"black",
            fontWeight:700, 
            fontSize:12,
            marginLeft:15}}>ADD </Text>
            
            </Pressable>
            </View>
            </View>
            </Pressable>

            

            

            




          </View>
              </ScrollView>
        </SafeAreaView>
    )
}

export default Battery1