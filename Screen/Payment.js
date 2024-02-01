import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert,Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { Button } from 'react-native-paper';
import { removeProductFromCart, updateProductQuantity } from '../redux/MyCartSlice';
import { useStripe } from '@stripe/stripe-react-native';

const Payment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');

  const Stripe = useStripe();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  // Calculate item total whenever myCart changes
  const totalProducts = myCart.length;
  const totalPrice = myCart.reduce((total, item) => total + item.qty * item.price, 0);


  const handleApplyCoupon = () => {
    // Add logic to handle applying the coupon
    console.log(`Applying coupon code: ${couponCode}`);
    // You can implement coupon logic here, e.g., validate the coupon, apply discounts, etc.
  };

  const handleQuantityChange = (item, newQty) => {
    const updatedItem = { ...item, qty: Math.max(0, newQty) };

    if (newQty === 0) {
      dispatch(removeProductFromCart(updatedItem));
    } else {
      dispatch(updateProductQuantity(updatedItem));
    }
  };

  const onCheckout = async () => {
    try {
      // Check if the cart is empty
      if (myCart.length === 0) {
        Alert.alert('Your cart is empty. Add items before proceeding to payment.');
        return;
      }
  
      if (!selectedPaymentOption) {
        Alert.alert('Select a payment option before placing the order.');
        return;
      }
  
      // Handle different actions based on the selected payment option
      if (selectedPaymentOption === 'card') {
        // Calculate the total amount
        const totalAmount = myCart.reduce((acc, item) => acc + item.qty * item.price, 0);
  
        // Check if the total amount is valid
        if (totalAmount <= 0) {
          Alert.alert('Invalid total amount. Add items with valid prices to proceed.');
          return;
        }
  
        // sending request
        const response = await fetch("http://192.168.0.6:8082/pay", {
          method: "POST",
          body: JSON.stringify({
            name: 'Your customer name',
            amount: totalAmount,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        if (!response.ok) return Alert.alert(data.message);
  
        const clientSecret = data.clientSecret;
        const initSheet = await Stripe.initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: "Prithiraj"
        });
  
        if (initSheet.error) return Alert.alert(initSheet.error.message);
  
        const presentSheet = await Stripe.presentPaymentSheet({
          clientSecret,
        });
  
        if (presentSheet.error) return Alert.alert(presentSheet.error.message);
  
        // Handle the user acknowledgment of the payment completion
        Alert.alert(
          "Payment completed",
          "Thank you for being with Auto Medic!",
          [{ text: "OK", onPress: () => navigation.navigate('Preparingorder') }]
        );
      } else if (selectedPaymentOption === 'cash') {
        // Navigate to the "PreparingOrder" screen for cash on delivery
        navigation.navigate('Preparingorder');
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
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
        <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>

      {/* Apply Coupon Box */}
      {myCart.length > 0 ? (
        <FlatList
          data={myCart}
          renderItem={({ item }) => (
            <View
              style={{
                width: '94%',
                alignSelf: 'center',
                height: 120,
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
              }}
            >
              <View>
                <Text style={{ color: "black", fontWeight: 700, fontSize: 17, marginTop: -20 }}>{item.name}</Text>
                <Text style={{ color: "green", fontWeight: 600, fontSize: 15, marginTop: 5 }}>{`Quantity: ${item.qty}`}</Text>
                <Text style={{ color: "gray", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{`Total: ৳${item.qty * item.price}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item, item.qty - 1)}
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
                  }}
                >
                  <Text style={{ color: 'red', fontWeight: 600, fontSize: 18 }}>-</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 600, padding: 10 }}>{item.qty}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item, item.qty + 1)}
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
                  }}
                >
                  <Text style={{ color: 'green', fontSize: 18, fontWeight: 600 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Your cart is empty</Text>
        </View>
      )}

      <View style={{ marginBottom: 10, paddingHorizontal: 20, paddingTop:60 }}>
        <TextInput
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChangeText={(text) => setCouponCode(text)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'gray',
            marginBottom: 10,
            paddingVertical: 10,
            paddingHorizontal:20
          }}
        />
        <Button
          mode="contained"
          style={{
            backgroundColor: '#181f63',
            paddingVertical: 5,
            borderRadius:10,
            marginBottom: 10,
          }}
          onPress={handleApplyCoupon}
        >
          Apply Coupon
        </Button>


{/* Payment Options Container */}
<View style={{marginTop:20, width:'100%' ,padding: 20, backgroundColor: '#fff', borderRadius: 15, elevation: 3,marginBottom:40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Payment Options</Text>
        <View style={{ marginTop: 30 }}>
          {/* Credit / Debit Card Option */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={() => setSelectedPaymentOption('card')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../images/card.png')} style={{ width: 40, height: 40 }} />
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 16 }}>Pay with Stripe</Text>
                <Text style={{ fontSize: 12, color: '#999' }}>VISA, Mastercard, etc.</Text>
              </View>
            </View>
            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#181f63' }}>
              {selectedPaymentOption === 'card' && (
                <View style={{ flex: 1, backgroundColor: '#181f63', borderRadius: 8 }} />
              )}
            </View>
          </TouchableOpacity>

          {/* Cash on Delivery Option */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => setSelectedPaymentOption('cash')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../images/cod.png')} style={{ width: 40, height: 40 }} />
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cash on Delivery</Text>
              </View>
            </View>
            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#181f63' }}>
              {selectedPaymentOption === 'cash' && (
                <View style={{ flex: 1, backgroundColor: '#181f63', borderRadius: 8 }} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
        



      {/* Item Total and You Pay */}
      <View style={{ paddingTop: 20, marginTop: 60, borderTopWidth:1 }}>
        <View style={{ marginBottom: 40 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 10 }}>Item Total: {`${totalProducts} Item${totalProducts !== 1 ? 's' : ''}`}</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 10 }}>You Pay: ৳{totalPrice}</Text>
        </View>
      </View>
      </View>

      {/* Proceed To Checkout Button */}
      <Button
        mode="contained"
        style={{
          backgroundColor: '#181f63',
          marginTop:-30,
          marginHorizontal:10,
          borderRadius:10,
          paddingVertical: 10,
        }}
        onPress={onCheckout}
      >
       {selectedPaymentOption === 'card' ? 'Proceed To Payment' : 'Place Order'}
      </Button>
    </View>
  );
};

export default Payment;


