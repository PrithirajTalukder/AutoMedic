import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const Market = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Product 2',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 4.2,
    },
    {
      id: 3,
      name: 'Product 3',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 3.9,
    },
    {
      id: 4,
      name: 'Product 4',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 4.1,
    },
    {
      id: 5,
      name: 'Product 5',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Product 6',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 4.0,
    },
    {
      id: 7,
      name: 'Product 7',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 4.8,
    },
    {
      id: 8,
      name: 'Product 8',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 4.3,
    },
    {
      id: 9,
      name: 'Product 9',
      image: require('../images/products/product1.jpg'),
      description: 'Brake',
      rating: 4.7,
    },
  ];

  const productContainerStyle = {
    alignItems: 'center',
    width: '32%',
  };

  const productImageStyle = {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 5,
  };

  const productDescriptionStyle = {
    textAlign: 'center',
    marginBottom: 5,
  };

  const ratingContainerStyle = {
    marginBottom: 5,
  };

  const ratingTextStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const addToCartButtonStyle = {
    backgroundColor: 'lightblue',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  };

  const addToCartButtonTextStyle = {
    color: 'white',
    fontWeight: 'bold',
  };

  const renderProduct = (product) => {
    return (
      <View key={product.id} style={productContainerStyle}>
        <Image source={product.image} style={productImageStyle} />
        <Text style={productDescriptionStyle}>{product.description}</Text>
        <View style={ratingContainerStyle}>
          <Text style={ratingTextStyle}>Rating: {product.rating}</Text>
        </View>
        <TouchableOpacity style={addToCartButtonStyle}>
          <Text style={addToCartButtonTextStyle}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 20,
          marginTop: 60,
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
          marginTop: 20,
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
          marginTop: 20,
        }}
      >
        {products.slice(6, 9).map((product) => renderProduct(product))}
      </View>
    </ScrollView>
  );
};

export default Market;
