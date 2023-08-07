import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill up all the fields.");
      bottomSheetModalRef.current?.present();
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user && user.emailVerified) {
        setErrorMessage('You have successfully logged in!');
        navigation.navigate('Main');
      } else if (user) {
        setErrorMessage('Please verify your email before logging in.');
        bottomSheetModalRef.current?.present();
      }
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setErrorMessage('Invalid Email!');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMessage('Email address is not registered. Please Signup!.');
      } else if (err.code === 'auth/wrong-password') {
        setErrorMessage("Wrong password. Please enter a valid Password.");
      } else {
        setErrorMessage('Error: ' + err.message);
      }
      bottomSheetModalRef.current?.present();
    }
  };
  
  

  const handleSheetDismiss = () => {
    navigation.navigate('SignIn');
    if (bottomSheetModalRef && bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
    }
  };



  return (

    <BottomSheetModalProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "lightblue",
        alignItems: "center",
        padding: 100,
      }}>
        <View style={{backgroundColor:"white",
            borderRadius:20,
            top:80,
            width:380,
            paddingLeft:20,
            paddingRight:20,
            marginLeft:10,
            marginRight:10,
            height:670,
            position: "absolute",
            backgroundColor:"black",
            elevation:6,
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
            <Pressable onPress={() => navigation.navigate("ForgotPassword")} >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ paddingLeft: 32, color: "lightblue", fontSize: 14, fontWeight: "500" }}> Forgot password?</Text>
              </View>
            </Pressable>


            <Pressable
              onPress={handleSubmit}
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
              <Text style={{ fontSize: 20, textAlign: "center", color: "black", fontWeight: "900" }}>
                Login
              </Text>

            </Pressable>





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
                Don't have an account?<Text style={{ color: "lightblue", fontSize: 17, fontWeight: "500" }}> Sign Up</Text>
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

export default SignIn;













/*          <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center", }}><Text style={{ fontSize: 17, color: "white", fontWeight: "800", }}>Or</Text></View>
            <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center", flexDirection: "row", paddingBottom: 10, }}>
              <TouchableOpacity>
                <AntDesign name="google" size={30} color="white" style={{ paddingRight: 40 }} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Entypo name="facebook-with-circle" size={30} color="white" />
              </TouchableOpacity>
            </View> */