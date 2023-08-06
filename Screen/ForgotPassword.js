import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [firstMessage, setFirstMessage] = useState(null);
    const navigation = useNavigation();
    const bottomSheetModalRef = useRef(null);

    const handleSendOTP = async () => {
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                setErrorMessage('Link send to your email!');

                bottomSheetModalRef.current?.present();
            } catch (err) {
                if (err.code === 'auth/invalid-email') {
                    setErrorMessage('Invalid Email!');
                } else if (err.code === 'auth/user-not-found') {
                    setFirstMessage('Email address is not registered. Please Signup!');
                } else {
                    setErrorMessage('Error: ' + err.message);
                }
                bottomSheetModalRef.current?.present();
            }
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
                backgroundColor: "black",
                alignItems: "center",
                padding: 100,
            }}>


                <KeyboardAvoidingView>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 150,
                    }}>
                        <Text style={{ fontSize: 25, color: "lightblue", fontWeight: "bold" }}>
                            Reset Your Password
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
                                placeholder="Enter your Email"
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





                        <Pressable
                            onPress={handleSendOTP}
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
                                Send Reset Link
                            </Text>

                        </Pressable>





                        <Pressable onPress={() => navigation.navigate("SignIn")} >
                            <Text style={{
                                textAlign: "center",
                                justifyContent: "center",
                                fontSize: 17,
                                color: "gray",
                                fontWeight: "500",
                                padding: 17,
                                marginTop: 15

                            }}>
                                Already have an account?<Text style={{ color: "lightblue", fontSize: 17, fontWeight: "500" }}> Sign In</Text>
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
  {(() => {
    if (errorMessage) {
      return (
        <>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Pressable onPress={() => navigation.goBack("SignIn")} style={styles.dismissButton}>
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </Pressable>
        </>
      );
    } else if (firstMessage) {
      return (
        <>
          <Text style={styles.firstMessage}>{firstMessage}</Text>
        <Pressable  onPress={() => navigation.navigate("SignUp")}  style={styles.dismissButton}>
          <Text style={styles.dismissButtonText}>SignUp</Text>
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