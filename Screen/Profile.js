import * as React from 'react'
import { Pressable, SafeAreaView, TouchableOpacity } from 'react-native'
import { Text, View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Profile =()=>{
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "lightblue"
            }}>
            <View style={{
            flexDirection: "row",
            top:60,
            paddingLeft:23
            }}>
            
            <TouchableOpacity onPress={() => navigation.navigate("Main")}><AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity>
            <Text style={{paddingLeft:22,fontSize:18, fontWeight:600}}>My Profile</Text>
            </View>

            <View style={{backgroundColor:"white",
            borderRadius:20,
            top:110,
            paddingLeft:20,
            paddingRight:20,
            marginLeft:20,
            marginRight:10,
            height:670,
            position: "absolute",
            elevation:6,
              }}>
                <View style={{paddingTop:15, paddingLeft:10}}>
                    <Text style={{color:"gray",fontWeight:600}}>PERSONAL DETAILS</Text>
                </View>

                <View style={{marginTop:30}}> 
                <TextInput
                placeholder="Name"
                placeholderTextColor="darkgray"
                style={{
                  fontSize: 18,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius:5,
                  padding:5,
                  paddingLeft:13,
                  paddingVertical: 9,
                  marginLeft: 3,
                  
                  width: 310,
                  marginVertical: 10,
                  color: "black",
                }}
              />
                </View>

                <View > 
                <TextInput
                placeholder="Email"
                placeholderTextColor="darkgray"
                style={{
                  fontSize: 18,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius:5,
                  padding:5,
                  paddingLeft:13,
                  paddingVertical: 9,
                  marginLeft: 3,
                  
                  width: 310,
                  marginVertical: 10,
                  color: "black",
                }}
              />
                </View>

                <View> 
                <TextInput
                placeholder="Mobile"
                placeholderTextColor="darkgray"
                style={{
                  fontSize: 18,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius:5,
                  padding:5,
                  paddingLeft:13,
                  paddingVertical: 9,
                  marginLeft: 3,
                  
                  width: 310,
                  marginVertical: 10,
                  color: "black",
                }}
              />
                </View>

                <View > 
                <TextInput
                placeholder="Car Number"
                placeholderTextColor="darkgray"
                style={{
                  fontSize: 18,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius:5,
                  padding:5,
                  paddingLeft:13,
                  paddingVertical: 9,
                  marginLeft: 3,
                  
                  width: 310,
                  marginVertical: 10,
                  color: "black",
                }}
              />
                </View> 

                
                <View>
                <Pressable
                style={{
                width: 310,
                backgroundColor: "lightblue",
                padding: 12,
                borderRadius: 7,
                marginTop: 260,
                marginLeft: "auto",
                marginRight: "auto",
                elevation:2,
              }}
            >
              <Text style={{ fontSize: 20, textAlign: "center", color: "black", fontWeight: "600" }}>
                SAVE
              </Text>

            </Pressable>
                </View>
                
            </View>
            
        </SafeAreaView>
    )
}

export default Profile