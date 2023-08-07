
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CurrentRenderContext, useNavigation } from '@react-navigation/native';

const HomeSearch = () => {
  const navigation = useNavigation(); 

  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
      {/* Search Mechanic */}
      <TouchableOpacity onPress={() => navigation.navigate("LocationSearch")} >
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 30,
          width: 150,
          height: 200,
          borderWidth: 1,
          borderColor: '#b3b3b3',
          borderRadius: 10,
          marginBottom: 10,
          backgroundColor: 'black',
        }}>
          <View style={{
            backgroundColor: '#ffffff',
            padding: 10,
            borderRadius: 25,
          }}>
            <MaterialIcons name={'engineering'} size={16} color={'red'} />
          </View>
          <Text style={{
            marginLeft: 10,
            fontWeight: '500',
            fontSize: 16,
            color: '#ffffff',
          }}>
            Search Mechanic
          </Text>
        </View>
      </TouchableOpacity>

      {/* Nearest Workshop */}
      <TouchableOpacity onPress={() => navigation.navigate("LocationSearch")} >
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 30,
          width: 150,
          height: 200,
          borderWidth: 1,
          borderColor: '#b3b3b3',
          marginTop: 100,
          borderRadius: 10,
          backgroundColor: 'black',
        }}>
          <View style={{
            backgroundColor: '#ffffff',
            padding: 10,
            borderRadius: 25,
          }}>
            <FontAwesome name={'gear'} size={16} color={'#218cff'} />
          </View>
          <Text style={{
            marginLeft: 10,
            fontWeight: '500',
            fontSize: 16,
            color: '#ffffff',
            alignItems: 'center'
          }}>
            Nearest Workshop
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HomeSearch;