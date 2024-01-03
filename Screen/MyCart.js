import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { Button } from 'react-native-paper';
import { removeProductFromCart, updateProductQuantity } from '../redux/MyCartSlice';

const MyCart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const [itemTotal, setItemTotal] = useState(0);

  // Calculate item total whenever myCart changes
  useEffect(() => {
    const total = myCart.reduce((acc, item) => acc + item.qty * item.price, 0);
    setItemTotal(total);
  }, [myCart]);

  const handleApplyCoupon = () => {
    // Add logic to handle applying the coupon
    console.log(`Applying coupon code: ${couponCode}`);
    // You can implement coupon logic here, e.g., validate the coupon, apply discounts, etc.
  };

  const handleQuantityChange = (item, newQty) => {
    const updatedItem = { ...item, qty: Math.max(0, newQty) };

    if (newQty === 0) {
      dispatch(removeProductFromCart(updatedItem)); // Remove item from cart if quantity is zero
    } else {
      dispatch(updateProductQuantity(updatedItem)); // Update cart item with new quantity
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
        <TouchableOpacity onPress={() => navigation.navigate("Batteries")}>
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

      <View style={{ marginBottom: 120, paddingHorizontal: 20 }}>
        <TextInput
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChangeText={(text) => setCouponCode(text)}
          style={{
            borderBottomWidth: 1,
            borderColor: 'gray',
            marginBottom: 10,
            paddingVertical: 5,
          }}
        />
        <Button
          mode="contained"
          style={{
            backgroundColor: 'purple',
            paddingVertical: 10,
          }}
          onPress={handleApplyCoupon}
        >
          Apply Coupon
        </Button>
      </View>

      {/* Item Total and You Pay */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Item Total: ৳{itemTotal}</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 10 }}>You Pay: ৳{itemTotal}</Text>
        </View>
      </View>

      {/* Proceed To Checkout Button */}
      <Button
        mode="contained"
        style={{
          backgroundColor: 'purple',
          margin: 15,
          paddingVertical: 10,
        }}
        onPress={() => console.log('Proceed to Checkout button pressed')}
      >
        Proceed To Checkout
      </Button>
    </View>
  );
};

export default MyCart;
