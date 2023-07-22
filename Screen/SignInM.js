import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';




  
export default function SignInM() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return (

    <BottomSheetModalProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        padding: 100,
      }}>


        <KeyboardAvoidingView>
          <View style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}>
            <Text style={{ fontSize: 25, color: "lightblue", fontWeight: "bold" }}>
              Sign In
            </Text>

            <Text style={{ fontSize: 17, marginTop: 8, fontWeight: "600", color: "white" }}>
              Sign In to your account
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="white"
              />
              <TextInput
                placeholder="Email"
                
                placeholderTextColor="white"
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 10,
                  color: "white",
                }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="white" />
              <TextInput
                
                placeholder="Password"
                placeholderTextColor="white"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 20,
                  color: "white",
                }}
              />
            </View>
            <Pressable onPress={() => navigation.navigate("ForgotPassword")} >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ paddingLeft: 32, color: "lightblue", fontSize: 14, fontWeight: "500" }}> Forgot password?</Text>
              </View>
            </Pressable>


            <Pressable
              
              style={{
                width: 150,
                backgroundColor: "lightblue",
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text style={{ fontSize: 20, textAlign: "center", color: "white", fontWeight: "900" }}>
                Login
              </Text>

            </Pressable>


            <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center", }}><Text style={{ fontSize: 17, color: "white", fontWeight: "800", }}>Or</Text></View>
            <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center", flexDirection: "row", paddingBottom: 10, }}>
              <TouchableOpacity>
                <AntDesign name="google" size={30} color="white" style={{ paddingRight: 40 }} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Entypo name="facebook-with-circle" size={30} color="white" />
              </TouchableOpacity>
            </View>


            <Pressable onPress={() => navigation.navigate("SignUpM")} >
              <Text style={{
                textAlign: "center",
                justifyContent: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
                padding: 17,
                marginTop: 15

              }}>
                Don't have an account?<Text style={{ color: "lightblue", fontSize: 17, fontWeight: "500" }}> Sign Up</Text>
              </Text>
            </Pressable>



          </View>
        </KeyboardAvoidingView>





        

      </SafeAreaView>
    </BottomSheetModalProvider>
  );

};








/*const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    padding: 20,
  },
  errorMessage: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 'auto',
    textAlign: 'center',
    color: 'lightblue',
  },

  dismissButton: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },


  dismissButtonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
});*/

