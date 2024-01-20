import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import createClient, { urlFor } from '../sanity';

const Market = () => {
  const navigation = useNavigation();
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
        // Fetch categories with products
        const query = `*[_type == 'category'] {
          _id,
          name,
          description,
          image,
          "products": *[_type == 'product' && references(^._id)] {
            _id,
            name,
            image,
            price,
            details,
            rating,
            reviews
          }
        }`;

        const data = await createClient.fetch(query);
        setCategoriesWithProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  const renderProduct = (product) => {
   
    const onProductPress = () => {
      navigation.navigate('Batteries'); // Replace 'Batteries' with the correct screen name
    };

    // Extract the image URL using the urlFor function
   

    return (
      <TouchableOpacity key={product._id} onPress={onProductPress}>
        <View style={productContainerStyle}>
          <Image style={productImageStyle} 
          source={{ uri: urlFor(product.image).url() }}/>
          <Text style={productDescriptionStyle}>{product.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const productContainerStyle = {
    alignItems: 'center',
    width: 115,
    height: 115,
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
    marginTop: 15,
    fontWeight: 600,
  };


  if (loading) {
    return <ActivityIndicator />;
  }


  if (error) {
    return <Text>{`Error fetching data: ${error.message}`}</Text>;
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ paddingTop: 50, paddingBottom: 100 }}>
          <View style={{
            padding: 10,
            marginLeft: 18,
            marginTop: 18,
            flexDirection: "row",
            width: 357,
            backgroundColor: "lightblue",
            borderRadius: 20,
            alignItems: "center"
          }}>
            <TouchableOpacity><FontAwesome name="search" size={24} color="black" /></TouchableOpacity>
            <TextInput style={{ fontSize: 19, paddingLeft: 10, width: '80%' }} placeholder='Search' />
          </View>
          <View style={{ marginLeft: 25, marginTop: 30 }}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: 800 }}>
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
            {categoriesWithProducts.slice(0, 3).map((category) => renderProduct(category))}
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
            {categoriesWithProducts.slice(3, 6).map((category) => renderProduct(category))}
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
            {categoriesWithProducts.slice(6, 9).map((category) => renderProduct(category))}
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
            {categoriesWithProducts.slice(9, 12).map((category) => renderProduct(category))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Market;
