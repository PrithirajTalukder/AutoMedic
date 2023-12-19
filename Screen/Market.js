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
        image: require('../images/products/car-battery.png'),
        description: 'Batteries',
      },
      {
        id: 2,
        name: 'Product 2',
        image: require('../images/products/air-condition.png'),
        description: 'AC Parts',

      },
      {
        id: 3,
        name: 'Product 3',
        image: require('../images/products/tyre.png'),
        description: 'Tyres',

      },
      {
        id: 4,
        name: 'Product 4',
        image: require('../images/products/suspense.png'),
        description: 'Suspension',

      },
      {
        id: 5,
        name: 'Product 5',
        image: require('../images/products/high-beam.png'),
        description: 'Lights',

      },
      {
        id: 6,
        name: 'Product 6',
        image: require('../images/products/chassis.png'),
        description: 'Body Parts',

      },
      {
        id: 7,
        name: 'Product 7',
        image: require('../images/products/seat.png'),
        description: 'Seat Covers',

      },
      {
        id: 8,
        name: 'Product 8',
        image: require('../images/products/clutch-disc.png'),
        description: 'Clutch',

      },
      {
        id: 9,
        name: 'Product 9',
        image: require('../images/products/brake-disc.png'),
        description: 'Brakes',
        rating: 4.7,
      },
      {
        id: 10,
        name: 'Product 9',
        image: require('../images/products/steering-wheel.png'),
        description: 'Steering',

      },
      {
        id: 11,
        name: 'Product 9',
        image: require('../images/products/television.png'),
        description: 'Android Screen',

      },
      {
        id: 12,
        name: 'Product 9',
        image: require('../images/products/windscreen.png'),
        description: 'Glasses',

      },
    ];
  
    const productContainerStyle = {
      alignItems: 'center',
      width: 115,
      height:115,
      backgroundColor: "lightblue",
      borderRadius: 7,
      elevation: 6,
      
    };
  
    const productImageStyle = {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      marginBottom: 3,
      marginTop: 15,
    };
  
    const productDescriptionStyle = {
      textAlign: 'center',
      marginBottom: 5,
      marginTop:15,
      fontWeight:600,
    };
  
    const ProductItem = ({ product }) => {
    
    const onProductPress = () => {
        
      switch (product.id) {
        case 1:
          navigation.navigate('Batteries'); 
          break;
        case 2:
          navigation.navigate('Batteries'); 
          break;
        case 3:
            navigation.navigate('Batteries'); 
            break;
        case 4:
            navigation.navigate('Batteries'); 
            break;  
        case 5:
            navigation.navigate('Batteries'); 
            break;
        case 6:
            navigation.navigate('Batteries'); 
            break;
        case 7:
            navigation.navigate('Batteries'); 
            break;
        case 8:
            navigation.navigate('Batteries'); 
            break; 
        case 9:
            navigation.navigate('Batteries'); 
            break;
        case 10:
            navigation.navigate('Batteries'); 
            break;
        case 11:
            navigation.navigate('Batteries'); 
            break;
        case 12:
            navigation.navigate('Batteries'); 
            break;       
        default:
          
      }
    };
      return (
        <TouchableOpacity onPress={onProductPress}>
        <View  style={productContainerStyle}>
          <Image source={product.image} style={productImageStyle} />
          <Text style={productDescriptionStyle}>{product.description}</Text>
          
        </View>
        </TouchableOpacity>
      );
    
    };
  
    const renderProduct = (product) => {
      return <ProductItem key={product.id} product={product} />;
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