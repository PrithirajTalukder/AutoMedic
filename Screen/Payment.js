import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert, Image, ScrollView, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { Button } from 'react-native-paper';
import { useStripe } from '@stripe/stripe-react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { auth } from '../config/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Payment = () => {
  const navigation = useNavigation();
  const myCart = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [isAddressSaved, setIsAddressSaved] = useState(false); 
  const [savedLocation, setSavedLocation] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = auth.currentUser;
  const db = getFirestore();
  const [userData, setUserData] = useState(null);

  const Stripe = useStripe();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  const totalProducts = myCart.length;
  const totalPrice = myCart.reduce((total, item) => total + item.qty * item.price, 0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // Use reverse geocoding to get location name from coordinates
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Assuming that the first result has the location name
      let name = reverseGeocode[0]?.name || 'Unknown Location';
      setLocationName(name);

      setAddress(name);
    })();
  }, []);
    

  const handleSaveAddress = () => {
    setIsEditing(false);
    setIsAddressSaved(true);
    setSavedLocation(address);
    Alert.alert('Address Saved', `Address "${address}" saved successfully!`);
  };

  const handleEditAddress = () => {
    setIsEditing(true);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'Users Informations', currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser, db]);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  const { name, email, phone } = userData;


  const handleApplyCoupon = () => {
    console.log(`Applying coupon code: ${couponCode}`);
  };

 

  const onCheckout = async () => {
    try {
      if (myCart.length === 0) {
        Alert.alert('Your cart is empty. Add items before proceeding to payment.');
        return;
      }
  
      if (!selectedPaymentOption) {
        Alert.alert('Select a payment option before placing the order.');
        return;
      }
  
      // Check if address is saved when paying with 'card' or 'cash'
      if ((!isAddressSaved || isEditing) && (selectedPaymentOption === 'card' || selectedPaymentOption === 'cash')) {
        Alert.alert('Save your address before proceeding to order.');
        return;
      }
      

    

      const lineItems = myCart.map(item => ({
        name: item.name,
        quantity: item.qty,
        price_data: {
          currency: 'usd', // Replace with your currency code
          unit_amount: Math.round(item.price * 100), // Amount in cents
          product_data: { // Optional product metadata for reference
            name: item.name,
            description: item.description,
          },
        },
      }));


      if (selectedPaymentOption === 'card') {
        const totalAmount = myCart.reduce((acc, item) => acc + item.qty * item.price, 0);

        if (totalAmount <= 0) {
          Alert.alert('Invalid total amount. Add items with valid prices to proceed.');
          return;
        }

        const response = await fetch("http://192.168.0.5:8082/pay", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            amount: totalPrice,
            address: address, // Include address
            phone: phone, // Include phone
            email: email, // Include email
            lineItems: lineItems,
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
          merchantDisplayName: "YourMerchantName",
        });

        if (initSheet.error) return Alert.alert(initSheet.error.message);

        const presentSheet = await Stripe.presentPaymentSheet({
          clientSecret,
        });

        if (presentSheet.error) return Alert.alert(presentSheet.error.message);

        Alert.alert(
          "Payment completed",
          "Thank you for being with Auto Medic!",
          [{ text: "OK", onPress: () => navigation.navigate('Preparingorder') }]
        );
      } else if (selectedPaymentOption === 'cash') {
        navigation.navigate('Preparingorder');
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };


  return (
    <ScrollView style={{ flex: 1 }}>
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


      {/* Cart Items */}
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Checkout Summary</Text>
      <View>
        {myCart.length > 0 ? (
          <ScrollView>
            {myCart.map((item) => (
              <View
                key={item.id}
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
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: "black", fontWeight: 700, fontSize: 17 }}>{`${item.qty} x ${item.name}`}</Text>
                </View>
                <View>
                  <Text style={{ color: "black", fontWeight: 'bold', fontSize: 17 }}>{`৳${item.qty * item.price}`}</Text>

                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Your cart is empty</Text>
          </View>
        )}
      </View>
      </View>

      {/* Checkout Summary */}
      <View style={{ paddingTop: 20, marginTop: 60, borderTopWidth: 1 }}>
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 10 }}>Item Total: {`${totalProducts} Item${totalProducts !== 1 ? 's' : ''}`}</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 10 }}>You Pay: ৳{totalPrice}</Text>
        </View>
      </View>


      {/* Apply Coupon Box */}
      <View style={{ marginBottom: 10, paddingHorizontal: 20, paddingTop: 60 }}>
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
            paddingHorizontal: 20
          }}
        />
        <Button
          mode="contained"
          style={{
            backgroundColor: '#181f63',
            paddingVertical: 5,
            borderRadius: 10,
            marginBottom: 10,
          }}
          onPress={handleApplyCoupon}
        >
          Apply Coupon
        </Button>
      </View>

      {/* Payment Options Container */}
      <View style={{ marginTop: 20, width: '100%', padding: 20, backgroundColor: '#fff', borderRadius: 15, elevation: 3, marginBottom: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Payment Options</Text>
        <View style={{ marginTop: 30 }}>
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



      {/* Half Map Section */}
      <View style={{ height: 200 }}>
        {location && (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              description="You are here!"
              pinColor="red"
            />
          </MapView>
        )}
      </View>



      <View style={{ paddingTop: 30, paddingLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
        {/* Image component for the icon */}
        <Image
          source={require('../images/mappin.png')}
          style={{ width: 40, height: 46, marginRight: 10 }}
        />

        {/* Text displaying the location name */}
        <Text style={{ color: 'black', fontSize: 20 }}>{locationName}</Text>
      </View>



      <View
        style={{
          width: '94%',
          alignSelf: 'center',
          marginTop: 30,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'lightblue',
          elevation: 1,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Personal Details</Text>

        <View style={{ paddingTop: 10, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <AntDesign name="user" size={19} color="black" />
              <Text style={{ color: 'black', marginLeft: 6, fontSize: 16 }}>{name}</Text>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <AntDesign name="mail" size={19} color="black" />
              <Text style={{ color: 'black', marginLeft: 6, fontSize: 16 }}>{email}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <MaterialIcons name="phone" size={19} color="black" />
              <Text style={{ color: 'black', marginLeft: 6, fontSize: 16 }}>{phone}</Text>
            </View>
          </View>
        </View>
      </View>


      {/* Conditionally render input boxes based on address saved status and editing mode */}
      {!isAddressSaved || isEditing ? (
        <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
          {/* Automatically filled address input with location name */}
          <TextInput
            placeholder="Enter Your Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            multiline
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'gray',
              marginBottom: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              minHeight: 40,
            }}
          />

          <TextInput
            placeholder="Apartment (optional)"
            onChangeText={(text) => (text)}
            multiline
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'gray',
              marginBottom: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              minHeight: 40,
            }}
          />

          <Button
            mode="contained"
            style={{
              backgroundColor: '#181f63',
              paddingVertical: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}
            onPress={handleSaveAddress}
          >
            Save Address
          </Button>
        </View>
      ) : (
        <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Saved Address</Text>
          <Text style={{ fontSize: 16 }}>{savedLocation}</Text>
          {/* Edit button to enable editing */}
          <TouchableOpacity onPress={handleEditAddress}>
            <Text style={{ color: '#181f63', fontSize: 16, marginTop: 10, marginBottom:80 }}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}



      

      
      

      

      {/* Proceed To Checkout Button */}
      <Button
        mode="contained"
        style={{
          backgroundColor: '#181f63',
          marginTop: -30,
          marginHorizontal: 10,
          borderRadius: 10,
          paddingVertical: 10,
        }}
        onPress={onCheckout}
      >
        {selectedPaymentOption === 'card' ? 'Proceed To Payment' : 'Place Order'}
      </Button>
    </ScrollView>
  );
};

export default Payment;


