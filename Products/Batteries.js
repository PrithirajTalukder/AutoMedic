import React from 'react'
import { SafeAreaView,Pressable, Text, View,ScrollView,Image,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Video from 'react-native-video';
import { FlatList } from 'react-native-gesture-handler';

const Batteries = () => {
  const navigation = useNavigation();
  const items = [
    {
      id:0,
      name:'Amron',
      image:require('../images/batteries/amron.jpg'),
      price: 2000,
      qty: 0,
      frequency: 'Every 10000 kms/ 6 Months',
      duration: 'Takes 6 Hours',
      warranty: '1 Month warranty',
      services: 'Includes 15 Services',
    },
    {
      id:1,
      name:'Exide',
      image:require('../images/batteries/exide.jpg'),
      price: 1500,
      qty: 0,
      frequency: 'Every 10000 kms/ 6 Months',
      duration: 'Takes 6 Hours',
      warranty: '1 Month warranty',
      services: 'Includes 15 Services',
    }
    
  ]
  return (
    <View style={{flex:1}}>
      
      <View style={{width:'100%',
    height:100,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:20,
    paddingTop:30,
    backgroundColor:'#fff',
    elevation:1}}>
      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>
    <FlatList data={items}
    renderItem={({item, index}) => {
      return (
        <Pressable
        onPress={() => navigation.navigate("Account")}
        style={{
          width:'94%',
          alignSelf:'center',
          height:190,
          backgroundColor: '#fff',
          marginTop:10,
          borderRadius: 10,
          borderWidth:1,
          borderColor:'lightblue',
          elevation: 1,
          flexDirection: 'row',
          alignItems:'center',
          paddingLeft:30,
          justifyContent:'space-between',
        }}>
        <View>
          <Text style={{color:"black",fontWeight:700, fontSize:17,marginTop:-20}}>{item.name}</Text>
          <Text style={{color:"green",fontWeight:600, fontSize:15, marginTop:5}}>{'৳' + item.price}</Text>
          <Text style={{color:"gray",fontWeight:600, fontSize:12,marginTop:10}}>{item.frequency}</Text>
          <Text style={{color:"gray",fontWeight:600, fontSize:12,marginTop:5}}>{item.duration}</Text>
          <Text style={{color:"gray",fontWeight:600, fontSize:12,marginTop:5}}>{item.warranty}</Text>
          <Text style={{color:"gray",fontWeight:600, fontSize:12,marginTop:5}}>{item.services}</Text>
        </View>
        <View>
          <Image source={item.image}
      style={{width:80, height:80, marginRight:30}}/>
      {item.qty==0? (<TouchableOpacity style={{
          backgroundColor:'lightgreen',
          borderRadius:7,
          height:27,
          justifyContent:'center',
          alignItems:'center',
          paddingLeft:5,
          paddingRight:5,
          marginRight:20,
          marginLeft:-15,
          marginTop:10
        }}>
          <Text style={{color:'black', fontWeight:600}}>Add To Cart</Text>
        </TouchableOpacity>) : null}

      
      
      <View style={{flexDirection:'row', alignItems:'center',marginTop:3}}>
      {item.qty==0? null:(<TouchableOpacity style={{
          backgroundColor:'white',
          borderWidth:1,
          borderColor:'red',
          borderRadius:7,
          height:27,
          justifyContent:'center',
          alignItems:'center',
          paddingLeft:10,
          paddingRight:10,
          marginLeft:-5
        }}>
          <Text style={{color:'red',fontWeight:600,fontSize:18}}>-</Text>
        </TouchableOpacity>)} 
        {item.qty==0?null:(<Text style={{ fontWeight:600,padding:10}}>{'0'}</Text>)}
        {item.qty==0? null:(<TouchableOpacity style={{
          backgroundColor:'white',
          borderRadius:7,
          borderWidth:1,
          borderColor:'green',
          height:27,
          justifyContent:'center',
          alignItems:'center',
          paddingLeft:9,
          paddingRight:9,

          marginRight:20
        }}>
          <Text style={{color:'green',fontSize:18,fontWeight:600,}}>+</Text>
        </TouchableOpacity>)}
        
      </View>
        </View>
        </Pressable>
      );
    }}/>
    </View>
    
  )
}


export default Batteries

