import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";


import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("You have successfuly logged in!");
        navigation.navigate('Home');
      } catch (err) {
        if (err.code === 'auth/invalid-email') {
          console.log("Invalid Email. Please enter a valid Email.");
        } else if (err.code === 'auth/user-not-found') {
          console.log("Email address is not registered. Please Signup!.");
        } else if (err.code === 'auth/wrong-password') {
          console.log("Password doesn't Match. Please enter a valid Password!.");
        }else {
          console.log('Error:', err.message);
        }
      }
    }
  };



  return (
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
          <Text style={{ fontSize: 25, color: "peru", fontWeight: "bold" }}>
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
              value={email}
              onChangeText={value => setEmail(value)}
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
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry={true}
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ paddingLeft: 32, color: "peru", fontSize: 14, fontWeight: "500" }}> Forgot password?</Text>
          </View>


          <Pressable
            onPress={handleSubmit}
            style={{
              width: 150,
              backgroundColor: "peru",
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

          <Pressable onPress={() => navigation.navigate("SignUp")} >
            <Text style={{
              textAlign: "center",
              justifyContent: "center",
              fontSize: 17,
              color: "gray",
              fontWeight: "500",
              padding: 17,
              marginTop: 15

            }}>
              Don't have an account?<Text style={{ color: "peru", fontSize: 17, fontWeight: "500" }}> Sign Up</Text>
            </Text>
          </Pressable>



        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default SignIn;

