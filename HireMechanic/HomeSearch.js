import React from 'react';
import { View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeSearch = () => {
    return (
        <View>
            {/* Input Box  */}
            <View style={{
                backgroundColor: '#e7e7e7',
                margin: 10,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'

            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#434343'
                }}>Search Meachanic</Text>
                <View style={{
                    flexDirection: 'row',
                    width: 100,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 50
                }}>
                <AntDesign name={'clockcircle'} size={16} color={'#535353'}/>
                <Text>Now</Text>
                <MaterialIcons name={'keyboard-arrow-down'} size={16} />

                </View>
            </View>
            {/* Previous destination  */}

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                borderBottomWidth: 1,
                borderColor: '#b3b3b3'
            }}>
                <View style={{
                    backgroundColor: 'red',
                    padding: 10,
                    borderRadius: 25
                }}>
                    <MaterialIcons name={'engineering'} size={16} color={'#ffffff'}/>
                </View>
                <Text style={{
                    marginLeft: 10,
                    fontWeight: '500',
                    fontSize: 16
                }}>
                    Spin Mechanic
                </Text>
            </View>
            {/* Home Destination  */}

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                borderBottomWidth: 1,
                borderColor: '#b3b3b3'
            }}>
                <View style={{
                    backgroundColor: '#218cff',
                    padding: 10,
                    borderRadius: 25
                }}>
                    <FontAwesome name={'gear'} size={16} color={'#ffffff'}/>
                </View>
                <Text style={{
                    marginLeft: 10,
                    fontWeight: '500',
                    fontSize: 16
                }}>
                    Nearest Workshop
                </Text>
            </View>
        </View>
    )
}

export default HomeSearch;