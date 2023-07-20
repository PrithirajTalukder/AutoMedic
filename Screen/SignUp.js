import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Email registration successful!");
        navigation.goBack('SignIn');
      } catch (err) {
        if (err.code === 'auth/invalid-email') {
          setErrorMessage("Invalid Email!");
        } else if (err.code === 'auth/email-already-in-use') {
          setErrorMessage("Email address is already registered. Please use a different email.");
        } else {
          setErrorMessage('Error:', err.message);
        }
        bottomSheetModalRef.current?.present();
      }
    }
  }

  const handleSheetDismiss = () => {
    navigation.navigate('SignUp');
    if (bottomSheetModalRef && bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
    }
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black", alignItems: "center", padding: 10 }}>
        <KeyboardAvoidingView>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
            <Text style={{ fontSize: 20, color: "lightblue", fontWeight: "bold" }}>
              Sign Up
            </Text>
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600", color: "white" }}>
              Create a new account
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="email-outline" size={24} color="white" />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={value => setEmail(value)}
                placeholderTextColor="white"
                style={{
                  fontSize: 18,
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
              <Feather name="phone" size={24} color="white" />
              <TextInput
                value={phone}
                onChangeText={value => setPhone(value)}
                placeholder="Phone Number"
                placeholderTextColor="white"
                style={{
                  fontSize: 18,
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
                  fontSize: 18,
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
              <Ionicons name="key-outline" size={24} color="white" />
              <TextInput
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor="white"
                style={{
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 20,
                  color: "white",
                }}
              />
            </View>
            <Pressable
              style={{
                width: 200,
                backgroundColor: "lightblue",
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onPress={handleSubmit}
            >
              <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                Register
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.goBack("SignIn")} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                Already have an account? <Text style={{ color: 'lightblue' }}>Sign In</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["40%"]}
          backdropComponent={() => <View style={styles.backdrop} />}
          dismissOnPanDown={true}
          dismissOnTouchOutside={true}
          onDismiss={handleSheetDismiss}
          

        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Pressable onPress={handleSheetDismiss} style={styles.dismissButton}>
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </Pressable>
          </View>
        </BottomSheetModal>

      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};
  

const styles = StyleSheet.create({
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
});





