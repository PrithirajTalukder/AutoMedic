import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { addProductToMyCart } from '../redux/MyCartSlice';
import { removeProductFromCart, updateProductQuantity } from '../redux/MyCartSlice';
import createClient, {urlFor} from '../sanity';

const Batteries = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cart);

  const [Items, setItems] = useState([]);

  useEffect(() => {
    const fetchBatteriesProducts = async () => {
      try {
        const query = `
          *[_type == 'product' && references(*[_type == 'category' && name == 'Batteries']._id)] {
            _id,
            name,
            image,
            price,
            frequency,
            duration,
            warranty,
            services,
            rating,
            reviews
          }
        `;

        const data = await createClient.fetch(query);

        const itemsData = data.map((product) => ({
          id: product._id,
          name: product.name,
          image: { uri: urlFor(product.image).url() }, // assuming you have a urlFor function
          price: product.price,
          qty: 0,
          frequency: product.frequency,
          duration: product.duration,
          warranty: product.warranty,
          services: product.services,
        }));

        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching Batteries products:', error);
      }
    };

    fetchBatteriesProducts();
  }, []);



  // Synchronize the product quantity with the cart
  useEffect(() => {
    const updatedItems = [...Items];
    const updatedCart = [...myCart];

    updatedItems.forEach((item) => {
      const cartIndex = updatedCart.findIndex((cartItem) => item.id === cartItem.id);
      if (cartIndex !== -1) {
        item.qty = updatedCart[cartIndex].qty;
      }
    });

    setItems(updatedItems);
  }, [myCart]);

  const handleQuantityChange = (index, newQty) => {
    const updatedItems = [...Items];
    updatedItems[index].qty = Math.max(0, newQty);
    setItems(updatedItems);
  
    if (updatedItems[index].qty === 0) {
      // If quantity becomes zero, remove the product from the cart
      dispatch(removeProductFromCart(updatedItems[index]));
    } else {
      // If quantity is greater than zero, update the quantity in the cart
      dispatch(updateProductQuantity(updatedItems[index]));
    }
  };
  const handleAddToCartPress = (index) => {
    const updatedItems = [...Items];
    const existingProductIndex = myCart.findIndex(cartItem => cartItem.id === updatedItems[index].id);

    if (existingProductIndex === -1 || myCart[existingProductIndex].qty === 0) {
      updatedItems[index] = { ...updatedItems[index], qty: 1 };
      setItems(updatedItems);

      dispatch(addProductToMyCart(updatedItems[index]));
    }
  };
  const totalProducts = myCart.length;
  const totalPrice = myCart.reduce((total, item) => total + item.qty * item.price, 0);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 30,
        backgroundColor: '#fff',
        elevation: 1
      }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={Items}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: '94%',
                alignSelf: 'center',
                height: 190,
                backgroundColor: '#fff',
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'lightblue',
                elevation: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 30,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{ color: "black", fontWeight: 700, fontSize: 17, marginTop: -20 }}>{item.name}</Text>
                <Text style={{ color: "green", fontWeight: 600, fontSize: 15, marginTop: 5 }}>{'৳' + item.price}</Text>
                <Text style={{ color: "gray", fontWeight: 600, fontSize: 12, marginTop: 10 }}>{item.frequency}</Text>
                <Text style={{ color: "gray", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.duration}</Text>
                <Text style={{ color: "gray", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.warranty}</Text>
                <Text style={{ color: "gray", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.services}</Text>
              </View>
              <View>
                <Image source={item.image} style={{ width: 80, height: 80, marginRight: 30 }} />
                {!myCart.find(cartItem => cartItem.id === item.id) || myCart.find(cartItem => cartItem.id === item.id).qty === 0 ? (
                  <TouchableOpacity
                    onPress={() => handleAddToCartPress(index)}
                    style={{
                      backgroundColor: 'lightgreen',
                      borderRadius: 7,
                      height: 27,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 5,
                      paddingRight: 5,
                      marginRight: 20,
                      marginLeft: -15,
                      marginTop: 10
                    }}
                  >
                    <Text style={{ color: 'black', fontWeight: 600 }}>Add To Cart</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(index, item.qty - 1)}
                      style={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'red',
                        borderRadius: 7,
                        height: 27,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginLeft: -5,
                      }}>
                      <Text style={{ color: 'red', fontWeight: 600, fontSize: 18 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 600, padding: 10 }}>{item.qty}</Text>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(index, item.qty + 1)}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: 'green',
                        height: 27,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 9,
                        paddingRight: 9,
                        marginRight: 20
                      }}>
                      <Text style={{ color: 'green', fontSize: 18, fontWeight: 600 }}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />

      {/* Cart Summary */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'lightblue',
          borderRadius: 7,
          borderWidth:2,
          height: 60,
          margin: 20,
        }}
        onPress={() => {
          navigation.navigate("MyCart");
        }}>
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '600',marginBottom:4 }}>{`${totalProducts} Product${totalProducts !== 1 ? 's' : ''} Added`}</Text>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>{`Total: ৳${totalPrice}`}</Text>
        </View>

        <View style={{ marginRight: 20 }}>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>View Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Batteries;
