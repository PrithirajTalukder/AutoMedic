import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { Button } from 'react-native-paper';
import { removeProductFromCart, updateProductQuantity } from '../redux/MyCartSlice';

const MyCart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cart);


  // Calculate item total whenever myCart changes
  const totalProducts = myCart.length;
  const totalPrice = myCart.reduce((total, item) => total + item.qty * item.price, 0);

  // Handle quantity change for a product
  const handleQuantityChange = (item, newQty) => {
    // Check if the requested quantity exceeds the available stock
    if (newQty > item.stock) {
      showAlert('Product out of stock');
      return;
    }

    const updatedItem = { ...item, qty: Math.max(0, newQty) };

    if (updatedItem.qty === 0) {
      // Remove product from cart if quantity is 0
      dispatch(removeProductFromCart(updatedItem));
    } else {
      // Update existing product in cart or add to cart if not present
      dispatch(updateProductQuantity(updatedItem));
    }
  };

  // Handle delete button press for a product
  const handleDelete = (item) => {
    // Show confirmation alert
    showAlert(
      'Remove the product?',
      () => {
        // User pressed OK, remove product from cart
        dispatch(removeProductFromCart(item));
        
        // Navigate to Batteries screen
        navigation.navigate('MyCart');
      },
      () => {
        // User pressed Cancel, do nothing
      }
    );
  };
  
  // Display an alert with the given message and optional callbacks for OK and Cancel
  const showAlert = (message, onOk, onCancel) => {
    Alert.alert(message, undefined, [
      { text: 'Cancel', onPress: onCancel, style: 'cancel' },
      { text: 'OK', onPress: onOk },
    ]);
  };

  // Handle checkout button press
  const onCheckout = () => {
    try {
      // Check if the cart is empty
      if (myCart.length === 0) {
        showAlert('Your cart is empty. Add items before proceeding to payment.');
        return;
      }

      // Calculate the total amount
      const totalAmount = myCart.reduce((acc, item) => acc + item.qty * item.price, 0);

      // Check if the total amount is valid
      if (totalAmount <= 0) {
        showAlert('Invalid total amount. Add items with valid prices to proceed.');
        return;
      }

      // Display payment completion message
      Alert.alert(
        `This is your total: ৳${totalAmount}. Taking you to Payment Screen`,
        undefined,
        [
          {
            text: 'Cancel',
            onPress: () => {
              // Navigate to the "MyCart" screen after the user clicks "Cancel"
              navigation.navigate("MyCart");
            },
          },
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the "Payment" screen after the user clicks "OK"
              navigation.navigate("Payment");
            },
          },
        ]
      );
    } catch (err) {
      console.error(err);
      showAlert('Something went wrong, try again later!');
    }
  };

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>

      {/* Cart Items */}
      {myCart.length > 0 ? (
        <FlatList
          data={myCart}
          renderItem={({ item }) => (
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                height: 120,
                backgroundColor: '#bad6e3',
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'white',
                elevation: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                justifyContent: 'space-between',
              }}
            >
              {/* Product Details */}
              <View>
                <Text style={{ color: "black", fontWeight: 700, fontSize: 17, marginTop: -20 }}>{item.name}</Text>
                <Text style={{ color: "#404042", fontWeight: 600, fontSize: 15, marginTop: 5 }}>{`Quantity: ${item.qty}`}</Text>
                <Text style={{ color: "green", fontWeight: 600, fontSize: 14, marginTop: 5 }}>{`Total: ৳${item.qty * item.price}`}</Text>
              </View>

              {/* Quantity and Delete Buttons */}
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                {/* Minus Button */}
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', padding:10}}>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(item, item.qty - 1)}
                    style={{
                      backgroundColor: '#bad6e3',
                      borderWidth: 1,
                      borderColor: '#99241f',
                      borderRadius: 7,
                      height: 27,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginLeft: -5,
                    }}
                  >
                    <Text style={{ color: '#99241f', fontWeight: 600, fontSize: 18 }}>-</Text>
                  </TouchableOpacity>

                  {/* Quantity Text */}
                  <Text style={{ fontWeight: 600, padding: 10 }}>{item.qty}</Text>

                  {/* Plus Button */}
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(item, item.qty + 1)}
                    style={{
                      backgroundColor: '#bad6e3',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#156112',
                      height: 27,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 9,
                      paddingRight: 9,
                      marginRight: 20,
                    }}
                  >
                    <Text style={{ color: '#156112', fontSize: 18, fontWeight: 600 }}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={{
                    backgroundColor: 'black', // Red color for delete button
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'white',
                    height: 27,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        // Empty Cart Message
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Your cart is empty</Text>
        </View>
      )}

      {/* Item Total and You Pay */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20, borderTopWidth: 1, borderColor: 'gray' }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 10 }}>Item Total: {`${totalProducts} Item${totalProducts !== 1 ? 's' : ''}`}</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 10 }}>You Pay: ৳{totalPrice}</Text>
        </View>
      </View>

      {/* Proceed To Checkout Button */}
      <Button
        mode="contained"
        style={{
          backgroundColor: '#181f63',
          margin: 5,
          paddingVertical: 10,
          borderRadius: 10,
        }}
        onPress={onCheckout}
      >
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Proceed To Payment</Text>
      </Button>
    </View>
  );
};

export default MyCart;
