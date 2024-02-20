import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import createClient, { urlFor } from '../sanity';

const Market = () => {
  const navigation = useNavigation();
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
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

  const onSearch = (text) => {
    setSearch(text);

    if (text === '') {
      setFilteredCategories(categoriesWithProducts);
    } else {
      const filteredCategoriesData = categoriesWithProducts.filter((category) =>
        category.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filteredCategoriesData);
    }
  };

  const renderProduct = (product) => {
    const onProductPress = (productName) => {
      switch (productName) {
        case "Lights":
          navigation.navigate("Lights");
          break;
        case "Tyres":
          navigation.navigate("Tyres");
          break;
        case "Body Parts":
          navigation.navigate("BodyParts");
          break;
        case "Batteries":
          navigation.navigate("Batteries");
          break;
        default:
          console.log("Default case: Navigating to some default screen");
          navigation.navigate("DefaultScreen");
          break;
      }
    };

    return (
      <TouchableOpacity key={product._id} onPress={() => onProductPress(product.name)}>
        <View style={productContainerStyle}>
          <Image style={productImageStyle} source={{ uri: urlFor(product.image).url() }} />
          <Text style={productDescriptionStyle}>{product.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const productContainerStyle = {
    alignItems: 'center',
    width: 115,
    height: 115,
    backgroundColor: "#bad6e3",
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
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 50, backgroundColor: 'white', elevation: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>

      <View style={{ paddingTop: 20, paddingBottom: 10, backgroundColor: "white" }}>
        <View style={{
          padding: 10,
          marginLeft: 18,

          flexDirection: "row",
          width: 357,
          backgroundColor: "#bad6e3",
          borderRadius: 20,
          alignItems: "center",
          borderWidth: 1,
          borderColor: 'gray',
        }}>
          <TouchableOpacity><FontAwesome name="search" size={24} color="black" /></TouchableOpacity>
          <TextInput
            style={{ fontSize: 19, paddingLeft: 10, width: '80%' }}
            placeholder='Search'
            onChangeText={txt => onSearch(txt)}
            value={search}
          />
        </View>
        
      </View>

      <ScrollView>
      <View style={{ marginLeft: 15, marginTop: 20 }}>
          <Text style={{ color: "black", fontSize: 18, fontWeight: 800 }}>
            At Home Delivery
          </Text>
        </View>
        <View style={{ paddingTop: 0, paddingBottom: 0 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            {search === '' ? (
              categoriesWithProducts.slice(0, 3).map((category) => renderProduct(category))
            ) : (
              filteredCategories.slice(0, 3).map((category) => renderProduct(category))
            )}
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
            {search === '' ? (
              categoriesWithProducts.slice(3, 6).map((category) => renderProduct(category))
            ) : (
              filteredCategories.slice(3, 6).map((category) => renderProduct(category))
            )}
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
            {search === '' ? (
              categoriesWithProducts.slice(6, 9).map((category) => renderProduct(category))
            ) : (
              filteredCategories.slice(6, 9).map((category) => renderProduct(category))
            )}
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
            {search === '' ? (
              categoriesWithProducts.slice(9, 12).map((category) => renderProduct(category))
            ) : (
              filteredCategories.slice(9, 12).map((category) => renderProduct(category))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Market;
