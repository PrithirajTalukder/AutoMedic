import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Orderdetails = ({ route }) => {
  const navigation = useNavigation();
  const { orderDetails } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 30, backgroundColor: '#fff', elevation: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>

    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{fontSize:18, fontWeight:600, paddingVertical:10}}>Order Details:</Text>
      <Text style={{fontSize:15, fontWeight:400, paddingVertical:7}}>Email: {orderDetails.email}</Text>
      <Text style={{fontSize:15, fontWeight:400, paddingVertical:7}}>Phone: {orderDetails.phone}</Text>
      <Text style={{fontSize:15, fontWeight:400, paddingVertical:7}}>Payment Option: {orderDetails.paymentOption}</Text>
      <Text style={{fontSize:15, fontWeight:400, paddingVertical:7}}>Address: {orderDetails.address}</Text>
      <Text style={{fontSize:15, fontWeight:400, paddingVertical:7}}>Total Amount: {orderDetails.totalAmount}</Text>
      <Text style={{fontSize:15, fontWeight:400, paddingVertical:7}}>Timestamp: {orderDetails.timestamp}</Text>
      <Text style={{fontSize:16, fontWeight:600, marginTop:29, paddingBottom: 4}}>Items:</Text>
      {orderDetails.items.map((item, index) => (
        <View key={index}>
          <Text style={{fontSize:15, fontWeight:400, paddingVertical:5, paddingHorizontal:5}}>Name: {item.name}</Text>
          <Text style={{fontSize:15, fontWeight:400, paddingVertical:5, paddingHorizontal:5}}>Price: {item.price}</Text>
          <Text style={{fontSize:15, fontWeight:400, paddingVertical:5, paddingHorizontal:5}}>Quantity: {item.quantity}</Text>
        </View>
      ))}
    </View>
    </SafeAreaView>
  );
};

export default Orderdetails;