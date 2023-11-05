import React from 'react'
import { SafeAreaView, TextInput,Text, View,Image,TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const Market =()=>{
    const navigation = useNavigation();
    const products = [
      {
        id: 1,
        name: 'Product 1',
        image: require('../images/products/product1.jpg'),
        description: 'Batteries',
      },
      {
        id: 2,
        name: 'Product 2',
        image: require('../images/products/product1.jpg'),
        description: 'AC Parts',

      },
      {
        id: 3,
        name: 'Product 3',
        image: require('../images/products/product1.jpg'),
        description: 'Tyres',

      },
      {
        id: 4,
        name: 'Product 4',
        image: require('../images/products/product1.jpg'),
        description: 'Suspension',

      },
      {
        id: 5,
        name: 'Product 5',
        image: require('../images/products/product1.jpg'),
        description: 'Lights',

      },
      {
        id: 6,
        name: 'Product 6',
        image: require('../images/products/product1.jpg'),
        description: 'Body Parts',

      },
      {
        id: 7,
        name: 'Product 7',
        image: require('../images/products/product1.jpg'),
        description: 'Seat Covers',

      },
      {
        id: 8,
        name: 'Product 8',
        image: require('../images/products/product1.jpg'),
        description: 'Clutch',

      },
      {
        id: 9,
        name: 'Product 9',
        image: require('../images/products/product1.jpg'),
        description: 'Brakes',
        rating: 4.7,
      },
      {
        id: 10,
        name: 'Product 9',
        image: require('../images/products/product1.jpg'),
        description: 'Steering',

      },
      {
        id: 11,
        name: 'Product 9',
        image: require('../images/products/product1.jpg'),
        description: 'Android Screen',

      },
      {
        id: 12,
        name: 'Product 9',
        image: require('../images/products/product1.jpg'),
        description: 'Glasses',

      },
    ];
  
    const productContainerStyle = {
      alignItems: 'center',
      width: '32%',
      backgroundColor: "lightblue",
      borderRadius: 7,
      elevation: 6,
      
    };
  
    const productImageStyle = {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      marginBottom: 5,
      marginTop: 5,
    };
  
    const productDescriptionStyle = {
      textAlign: 'center',
      marginBottom: 5,
    };
  
  
    
  
    
  
    
  
    const renderProduct = (product) => {
      return (
        <View key={product.id} style={productContainerStyle}>
          <Image source={product.image} style={productImageStyle} />
          <Text style={productDescriptionStyle}>{product.description}</Text>
          
        </View>
      );
    };
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
          <ScrollView>
          <View style={{paddingTop:50, paddingBottom: 100}}>
          <View style={{padding:10,
        marginLeft:18,
        marginTop:18,
            flexDirection:"row",
             width:357,
             backgroundColor:"lightblue",
             borderRadius: 20,
             alignItems:"center"}}
        >
        <TouchableOpacity><FontAwesome name="search" size={24} color="black" /></TouchableOpacity>  
        <TextInput style={{fontSize:19, paddingLeft:10, width:'80%'}} placeholder='Search'/>  
        </View>
        <View style={{marginLeft:25, marginTop:30}}>
          <Text style={{color:"black", fontSize:18, fontWeight:800,}}>
            At Home Delivery
          </Text>
          </View>

        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        {products.slice(0, 3).map((product) => renderProduct(product))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 20,
          marginTop: 5,
        }}
      >
        {products.slice(3, 6).map((product) => renderProduct(product))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 20,
          marginTop: 5,
        }}
      >
        {products.slice(6, 9).map((product) => renderProduct(product))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 20,
          marginTop: 5,
        }}
      >
        {products.slice(9, 12).map((product) => renderProduct(product))}
      </View>






          
        </View>


           

        </ScrollView>    
        </SafeAreaView>
    )
}

export default Market