import React, { useState, useRef } from 'react';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection } from 'firebase/firestore';



export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const phoneNumberRegex = /^\+880\d{10}$/;
  const [errorMessage, setErrorMessage] = useState(null);
  const [firstMessage, setFirstMessage] = useState(null);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const db = getFirestore();

  const handleSubmit = async () => {
    if (!email || !password || !name || !phone) {
      setErrorMessage('Please fill up all the fields.');
      bottomSheetModalRef.current?.present();
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      bottomSheetModalRef.current?.present();
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      bottomSheetModalRef.current?.present();
      return;
    }

    if (!phoneNumberRegex.test(phone)) {
      setErrorMessage('Invalid phone number. Please enter a valid phone number.');
      bottomSheetModalRef.current?.present();
      return;
    }
    if (!address) {
      setErrorMessage('Provide your address please.');
      bottomSheetModalRef.current?.present();
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Create a Firestore document for the user
        const usersCollectionRef = collection(db, 'Users Informations');
        const userDocRef = doc(usersCollectionRef, user.uid);
        await setDoc(userDocRef, {
          name,
          email,
          phone,
          address,
        });
        


        

        // Send email verification
        await sendEmailVerification(user);

        setFirstMessage('A verification link has been sent to your email. Please verify your email before signing in!');
        bottomSheetModalRef.current?.present();
      }
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/invalid-email') {
        setErrorMessage('Invalid Email!');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Email address is already registered. Please use a different email.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
      bottomSheetModalRef.current?.present();
    }
  };

  const handleSheetDismiss = () => {
    navigation.navigate('SignUp');
    if (bottomSheetModalRef && bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
    }
  };

  const handleBackToSignIn = () => {
    navigation.navigate('SignIn');
    if (bottomSheetModalRef && bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
    }
  };
  

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "lightblue", alignItems: "center", padding: 10 }}>
      <View style={{backgroundColor:"white",
            borderRadius:20,
            top:60,
            width:380,
            paddingLeft:20,
            paddingRight:20,
            marginLeft:10,
            marginRight:10,
            height:712,
            position: "absolute",
            backgroundColor:"black",
            elevation:6,
              }}>
        <KeyboardAvoidingView>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60 }}>
            <Text style={{ fontSize: 20, color: "lightblue", fontWeight: "bold" }}>
              Sign Up
            </Text>
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600", color: "white" }}>
              Create a new account
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Ionicons name="person-outline" size={24} color="white" />
    <TextInput
      value={name}
      onChangeText={value => setName(value)}
      placeholder="Name"
      placeholderTextColor="gray"
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
              <MaterialCommunityIcons name="email-outline" size={24} color="white" />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={value => setEmail(value)}
                placeholderTextColor="gray"
                style={{
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 15,
                  color: "white",
                }}
              />
            </View>
            <View style={{flexDirection: "column"}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="phone" size={24} color="white" />
              <TextInput
                value={phone}
                onChangeText={value => setPhone(value)}
                placeholder="Phone Number"
                placeholderTextColor="gray"
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
            <Text style={{color:"gray", marginLeft:35, marginTop:-5,fontSize:13}}>* include +880 </Text>
            </View>
            <View style={{flexDirection: "column"}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="white" />
              <TextInput
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="gray"
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
            <Text style={{color:"gray", marginLeft:35, marginTop:-14,fontSize:13}}>* at least 6 characters</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="white" />
              <TextInput
                value={confirmPassword}
                onChangeText={value => setConfirmPassword(value)}
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor="gray"
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
  <MaterialCommunityIcons name="home-outline" size={24} color="white" />
  <TextInput
    value={address}
    onChangeText={value => setAddress(value)}
    placeholder="Address"
    placeholderTextColor="gray"
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
              <Text style={{ fontSize: 18, textAlign: "center", color: "black" }}>
                Register
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("SignIn")} style={{ marginTop: 20 }}>
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

      </View>





        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["40%"]}
          backdropComponent={() => <View style={styles.backdrop} />}
          dismissOnPanDown={true}
          dismissOnTouchOutside={true}
          onDismiss={handleSheetDismiss}
        >
         <View style={styles.bottomSheetContent}>
  {(() => {
    if (errorMessage) {
      return (
        <>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Pressable onPress={handleSheetDismiss} style={styles.dismissButton}>
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </Pressable>
        </>
      );
    } else if (firstMessage) {
      return (
        <>
          <Text style={styles.firstMessage}>{firstMessage}</Text>
        <Pressable onPress={handleBackToSignIn} style={styles.dismissButton1}>
          <Text style={styles.dismissButtonText}>SignIn</Text>
        </Pressable>
        </>
      );
    }
  })()}
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

  firstMessage: {
    fontSize: 24,
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

  dismissButton1: {
    backgroundColor: 'white',
    padding: 18,
    marginBottom: 5,
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