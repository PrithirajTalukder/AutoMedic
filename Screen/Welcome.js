import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React from 'react';


import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "peru",
      alignItems: "center",
      padding: 100,
    }}>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,
      }}>
        <Text
          style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
          Let's Get Started!
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../images/splashimg.png")}
            style={{ width: 350, height: 350 }} />
        </View>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{
              backgroundColor: "transparent",
              width: 250,
            }}>
            <Text style={{
              fontSize: 15,
              backgroundColor: 'black',
              borderWidth: 5,
              borderRadius: 9,
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white',
              fontWeight: '900',
            }}>
              Are you looking for a mechanic?
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20, }}><Text style={{ fontSize: 18, color: "white", fontWeight: "800", }}>Or</Text></View>

          <View style={{ marginTop: 20, }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={{
                backgroundColor: "transparent",
                width: 200,
              }}>
              <Text
                style={{ fontSize: 15,
                  backgroundColor: 'black',
                  borderWidth: 5,
                  borderRadius: 9,
                  padding: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '900',}}
              >
                Are you a mechanic?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

