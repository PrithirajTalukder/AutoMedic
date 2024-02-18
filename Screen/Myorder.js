import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Pressable, ActivityIndicator } from 'react-native';
import { auth } from '../config/firebase';
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
            setOrders(combinedOrders);

            const orderIdsArray = Object.keys(combinedOrders);

            // Sort order IDs based on timestamp in descending order
            const sortedOrderIds = orderIdsArray.sort((a, b) => {
              const timestampA = combinedOrders[a].timestamp;
              const timestampB = combinedOrders[b].timestamp;
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
        <ActivityIndicator size="large" color="lightblue" />
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        {orderIds.map((orderId) => (
          <Pressable key={orderId} onPress={() => handleOrderPress(orderId)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'gray', paddingVertical: 10 }}>
              <Text>Order ID: {orderId}</Text>
              <Text style={{ color: orders[orderId].paymentOption === 'cash' ? 'green' : 'blue', fontWeight: 'bold' }}>
                {orders[orderId].paymentOption === 'cash' ? 'Cash on Delivery' : 'Stripe'}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Myorder;

