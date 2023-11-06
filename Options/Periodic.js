import React from 'react'
import { SafeAreaView,Pressable, Text, View,ScrollView,Image,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Video from 'react-native-video';


const Periodic =()=>{
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
            Scheduled Packages
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
 
            <Text style={{color:"black",fontWeight:700, fontSize:17,marginLeft:5,top:-60}}>Basic Services</Text>
            <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top:-40}}>
            <View>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,}}>Every 5000 kms/ 3 Months</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>Takes 4 Hours</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>1 Month warranty</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>Includes 9 Services</Text>
            </View>
            <Image source={require("../images/Bs.jpg")}
            style={{ width: 100, height: 100, borderRadius:15}} />
            
            </View>
            </Pressable>


            <Pressable onPress={() => navigation.navigate("Account")} 
            style={{
              
              backgroundColor:"white",
              paddingTop:80,
              borderRadius:25,
              paddingHorizontal: 12,
              marginTop: 20,
              marginLeft:20,
              marginRight:20,
              borderColor:"lightblue",
              borderWidth:2
            }}>
 
            <Text style={{color:"black",fontWeight:700, fontSize:17,marginLeft:5,top:-60}}>Standard Services</Text>
            <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top:-40}}>
            <View>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,}}>Every 10000 kms/ 6 Months</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>Takes 6 Hours</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>1 Month warranty</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>Includes 15 Services</Text>
            </View>
            <Image source={require("../images/Ss.jpg")}
            style={{ width: 100, height: 100, borderRadius:15}} />
            
            </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Account")} 
            style={{
              
              backgroundColor:"white",
              paddingTop:80,
              borderRadius:25,
              paddingHorizontal: 12,
              marginTop: 20,
              marginLeft:20,
              marginRight:20,
              borderColor:"lightblue",
              borderWidth:2
            }}>
 
            <Text style={{color:"black",fontWeight:700, fontSize:17,marginLeft:5,top:-60}}>Comprehensive Services</Text>
            <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top:-40}}>
            <View>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,}}>Every 20000 kms/ 1 Year</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>Takes 8 Hours</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>1 Month warranty</Text>
            <Text style={{color:"gray",fontWeight:400, fontSize:15,marginLeft:10,top:4}}>Includes 20 Services</Text>
            </View>
            <Image source={require("../images/Cs.jpg")}
            style={{ width: 100, height: 100, borderRadius:15}} />
            
            </View>
            </Pressable>




          </View>
              </ScrollView>
        </SafeAreaView>
    )
}

export default Periodic
