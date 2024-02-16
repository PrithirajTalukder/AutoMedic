
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CurrentRenderContext, useNavigation } from '@react-navigation/native';

const HomeSearch = () => {
  const navigation = useNavigation(); 

  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dfe8f7' }}>
      {/* Search Mechanic */}
      <View style={{ flexDirection:'row', justifyContent:'space-between', gap:25}}>
      <TouchableOpacity onPress={() => navigation.navigate("Mechaniclocation")} >
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 5,
          width: 150,
          height: 200,
          borderWidth: 1,
          borderColor: '#b3b3b3',
          borderRadius: 10,
          marginBottom: 0,
          backgroundColor: '#15174f',
        }}>
          <View style={{
            backgroundColor: 'black',
            padding: 10,
            top:40,
            borderRadius: 25,
            borderWidth:1,
            borderColor:'white'
          }}>
            <MaterialIcons name={'engineering'} size={16} color={'white'} />
          </View>
          <Text style={{
            marginLeft: 0,
            fontWeight: '500',
            fontSize: 19,
            color: 'white',
            top:50
          }}>
            Search Mechanic
          </Text>
        </View>
      </TouchableOpacity>

      {/* Nearest Workshop */}
      <TouchableOpacity onPress={() => navigation.navigate("Workshoplocation")} >
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 5,
          width: 150,
          height: 200,
          borderWidth: 1,
          borderColor: '#b3b3b3',
          borderRadius: 10,
          marginBottom: 0,
          backgroundColor: '#15174f',
        }}>
          <View style={{
            backgroundColor: 'black',
            padding: 10,
            top:40,
            borderRadius: 25,
            borderWidth:1,
            borderColor:'white'
          }}>
            <FontAwesome name={'gear'} size={16} color={'white'} />
          </View>
          <Text style={{
            marginLeft: 0,
            fontWeight: '500',
            fontSize: 19,
            color: 'white',
            top:50
          }}>
            Nearest Workshop
          </Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeSearch;