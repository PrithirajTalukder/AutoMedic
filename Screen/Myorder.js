import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Pressable, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { auth } from '../config/firebase';
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const Myorder = () => {
  const navigation = useNavigation();
  const [orderIds, setOrderIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState({});
  const currentUser = auth.currentUser;
  const database = getDatabase();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (currentUser) {
          const cashOnDeliveryOrdersRef = ref(database, 'Cash on Delivery Orders');
          const stripeOrdersRef = ref(database, 'Stripe Orders');

          const cashOnDeliveryOrdersSnapshot = await get(cashOnDeliveryOrdersRef);
          const cashOnDeliveryOrdersData = cashOnDeliveryOrdersSnapshot.val();

          const stripeOrdersSnapshot = await get(stripeOrdersRef);
          const stripeOrdersData = stripeOrdersSnapshot.val();

          if (cashOnDeliveryOrdersData || stripeOrdersData) {
            const combinedOrders = { ...cashOnDeliveryOrdersData, ...stripeOrdersData };

            // Filter orders for the current user
            const currentUserOrders = Object.keys(combinedOrders)
              .filter(orderId => combinedOrders[orderId].userId === currentUser.uid)
              .reduce((filteredOrders, orderId) => {
                filteredOrders[orderId] = combinedOrders[orderId];
                return filteredOrders;
              }, {});

            setOrders(currentUserOrders);

            const orderIdsArray = Object.keys(currentUserOrders);

            // Sort order IDs based on timestamp in descending order
            const sortedOrderIds = orderIdsArray.sort((a, b) => {
              const timestampA = currentUserOrders[a].timestamp;
              const timestampB = currentUserOrders[b].timestamp;
              return new Date(timestampB) - new Date(timestampA);
            });

            setOrderIds(sortedOrderIds);
            console.log('Order IDs:', sortedOrderIds);
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, database]);

  const handleOrderPress = (orderId) => {
    setSelectedOrderId(orderId);
    navigation.navigate('Orderdetails', { orderDetails: orders[orderId] });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#bad6e3" />
      </View>
    );
  }

  if (orderIds.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Text>No orders placed</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',  }}>
      
        <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', elevation: 1,paddingTop:25}}>
          <TouchableOpacity onPress={() => navigation.navigate("Main")} style={{ padding: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Back</Text>
        </View>
        <ScrollView>
        <View>
          {orderIds.map((orderId) => (
            <Pressable key={orderId} onPress={() => handleOrderPress(orderId)}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10, backgroundColor: '#bad6e3', borderRadius: 10, borderColor: 'gray', paddingVertical: 40, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 600, fontSize: 15, lineHeight: 30 }}>Order ID:{'\n'}{orderId}</Text>
                <Text style={{ color: orders[orderId]?.paymentOption === 'cash' ? 'green' : 'blue', fontWeight: 'bold', marginTop: 20, fontSize: 16 }}>
                  {orders[orderId]?.paymentOption === 'cash' ? 'Cash on Delivery' : 'Stripe'}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Myorder;
