import React from 'react';
import { View, Text } from 'react-native';

const Orderdetails = ({ route }) => {
  const { orderDetails } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Order Details:</Text>
      <Text>Email: {orderDetails.email}</Text>
      <Text>Phone: {orderDetails.phone}</Text>
      <Text>Payment Option: {orderDetails.paymentOption}</Text>
      <Text>Address: {orderDetails.address}</Text>
      <Text>Total Amount: {orderDetails.totalAmount}</Text>
      <Text>Timestamp: {orderDetails.timestamp}</Text>
      <Text>Items:</Text>
      {orderDetails.items.map((item, index) => (
        <View key={index}>
          <Text>Name: {item.name}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
        </View>
      ))}
    </View>
  );
};

export default Orderdetails;