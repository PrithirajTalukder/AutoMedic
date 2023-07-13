import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as React from "react";



export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();

        return (

            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "black",
                alignItems: "center",
                padding: 10,
            }}>
                <KeyboardAvoidingView>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 100,
                    }}>
                        <Text style={{ fontSize: 20, color: "peru", fontWeight: "bold" }}>
                            Sign Up
                        </Text>

                        <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600", color: "white" }}>
                            Create a new account
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
                                onChangeText={(text) => setEmail(text)}
                                placeholderTextColor="white"
                                style={{
                                    fontSize: 18,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "gray",
                                    marginLeft: 13,
                                    width: 300,
                                    marginVertical: 10,
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Feather name="phone" size={24} color="white" />
                            <TextInput
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                placeholder="Phone Number"
                                placeholderTextColor="white"
                                style={{
                                    fontSize: 18,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "gray",
                                    marginLeft: 13,
                                    width: 300,
                                    marginVertical: 10,
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="key-outline" size={24} color="white" />
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
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
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="key-outline" size={24} color="white" />
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
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
                                }}
                            />
                        </View>

                        <Pressable
                            style={{
                                width: 200,
                                backgroundColor: "peru",
                                padding: 15,
                                borderRadius: 7,
                                marginTop: 50,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                                Register
                            </Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.goBack("Signin")} style={{ marginTop: 20 }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 17,
                                    color: "gray",
                                    fontWeight: "500",
                                }}
                            >
                                Already have an account? <Text style={{ color: 'peru' }}>Sign In</Text>
                            </Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView >


        );
    };
