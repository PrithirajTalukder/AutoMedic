import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      padding: 100,
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
          <Image source={require('../images/splashimg.png')} style={{ width: 350, height: 350 }} />
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{
              backgroundColor: 'transparent',
              width: 300,
              marginTop: 100,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                backgroundColor: 'black',
                borderWidth: 3,
                borderRadius: 11,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                fontWeight: '900',
                flexDirection: 'row', 
              }}
            >
              
              Let's Get Started <Icon name="arrow-right" size={20} color="white" style={{ marginRight: 15 }} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
