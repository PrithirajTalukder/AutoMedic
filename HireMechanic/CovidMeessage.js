import React from 'react';
import { View, Text } from 'react-native';

const index = () => {
  return (
    <View style={{
      backgroundColor: '#1065e9',
      padding: 15,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    }}>
        <Text style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,

        }}>
            Are you looking for a mecahnic?
        </Text>
        <Text style={{
          color: '#bed9ff',
          fontSize: 15,
          marginBottom: 10
        }}>
            Travel only if necessary Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolorem natus, assumenda  voluptas impedit ex, veritatis, nisi corrupti optio officiis atque adipisci totam!
        </Text>
        <Text style={{
          color: '#fff',
          fontSize: 15,
          fontWeight: 'bold'
        }}>
            Learn more
        </Text>

    </View>
  )
}

export default index