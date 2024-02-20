import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Modal, Alert, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { addProductToMyCart } from '../redux/MyCartSlice';
import { addMyProduct } from '../redux/MyProductSlice';
import createClient, { urlFor } from '../sanity';

const AC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cart);

  const [Items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Display initial alert when the component mounts
    Alert.alert(
      'Appointment Recommendation',
      'It is recommended to schedule an appointment with Auto Medic to get the desired services.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]
    );
  }, []);

  
  useEffect(() => {
    const fetchPeriodicProducts = async () => {
      try {
        const query = `
          *[_type == 'servicesproduct' && type->name == 'AC Service & Repair'] {
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
    
        const itemsData = data.map((servicesproduct) => ({
          id: servicesproduct._id,
          name: servicesproduct.name,
          image: { uri: urlFor(servicesproduct.image).url() },
          price: servicesproduct.price,
          qty: 0,
          frequency: servicesproduct.frequency,
          duration: servicesproduct.duration,
          warranty: servicesproduct.warranty,
          services: servicesproduct.services,
        }));
    
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching service products:', error);
      }
    };

    fetchPeriodicProducts();
  }, []);

  useEffect(() => {
    setFilteredItems(Items);
  }, [Items]);

  useEffect(() => {
    setFilteredItems(Items);
  }, [Items]);

  const onSearch = (text) => {
    setSearch(text);

    if (text === '') {
      setFilteredItems(Items);
    } else {
      const filteredItemsData = Items.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filteredItemsData);
    }
  };

  const clearFilters = () => {
    setSelectedFilter(null);
    setSearch('');
    setFilteredItems(Items);
    closeModal();
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const closeModal = () => {
    setFilterModalVisible(false);
  };

  const applyFilter = (filter) => {
    setSelectedFilter(filter);

    switch (filter) {
      case 'name':
        setFilteredItems([...filteredItems].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'lowToHighPrice':
        setFilteredItems([...filteredItems].sort((a, b) => parseInt(a.price) - parseInt(b.price)));
        break;
      case 'highToLowPrice':
        setFilteredItems([...filteredItems].sort((a, b) => parseInt(b.price) - parseInt(a.price)));
        break;
      //case 'rating':
      //setFilteredItems([...filteredItems].sort((a, b) => /* Sort logic for rating */));
      //break;
      default:
        setFilteredItems(Items);
        break;
    }

    closeModal();
  };

  const handleAddToCartPress = (index) => {
    const updatedItems = [...filteredItems];
    const existingProductIndex = myCart.findIndex(cartItem => cartItem.id === updatedItems[index].id);

    if (existingProductIndex === -1 || myCart[existingProductIndex].qty === 0) {
      updatedItems[index] = { ...updatedItems[index], qty: 1 };
      setFilteredItems(updatedItems);

      // Dispatch addMyProduct to the product slice
      dispatch(addMyProduct(updatedItems[index]));

      // Dispatch addProductToMyCart to the cart slice
      dispatch(addProductToMyCart(updatedItems[index]));

      // Show the alert
      setShowAlert(true);

      // Hide the alert after 2 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };



  const totalProducts = myCart.length;
  const totalPrice = myCart.reduce((total, item) => total + item.qty * item.price, 0);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 30, backgroundColor: 'white', elevation: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>

      {/* Search Bar */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 13,
        backgroundColor:'white',
      }}>
        <View style={{
          padding: 10,
          marginLeft: 18,
          marginTop: 10,
          flexDirection: "row",
          width: 330,
          backgroundColor: "#bad6e3",
          borderRadius: 20,
          alignItems: "center",
          borderWidth:1,
          borderColor:'gray'
        }}>
          {search.length === 0 && (
            <TouchableOpacity>
              <FontAwesome name="search" size={24} color="black" />
            </TouchableOpacity>
          )}
          <TextInput
            style={{ fontSize: 19, paddingLeft: 10, width: '70%' }}
            placeholder='Search'
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            value={search}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={clearFilters} style={{ marginLeft: 70 }}>
              <FontAwesome name="times" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={handleFilterPress} style={{ marginLeft: 10, marginTop: 5 }}>
          <FontAwesome name="sort-down" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ borderBottomWidth:1, borderColor:'white',backgroundColor:'white' }}>
        <Text style={{marginLeft: 25,marginBottom: 2, color: "black", fontSize: 24, fontWeight: 800, }}>
          Services
        </Text>
      </View>




      

      {/* Product List */}
      <FlatList
        data={filteredItems}
        
        renderItem={({ item, index }) => (
          <View style={{ width: '95%', alignSelf: 'center', height: 190, backgroundColor: '#bad6e3', marginTop: 10, borderRadius: 10, borderWidth: 1, borderColor: 'white', elevation: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: "black", fontWeight: 700, fontSize: 17, marginTop: -20 }}>{item.name}</Text>
              <Text style={{ color: "#088704", fontWeight: 600, fontSize: 15, marginTop: 5 }}>{'৳' + item.price}</Text>
              <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 10 }}>{item.frequency}</Text>
              <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.duration}</Text>
              <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.warranty}</Text>
              <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.services}</Text>
            </View>
            <View>
              <Image source={item.image} style={{ width: 80, height: 80, marginLeft: 10,marginRight:30, borderRadius: 5, borderWidth:1, borderColor:'white' }} />
              {!myCart.find(cartItem => cartItem.id === item.id) || myCart.find(cartItem => cartItem.id === item.id).qty === 0 ? (
                <TouchableOpacity
                  onPress={() => handleAddToCartPress(index)}
                  style={{
                    backgroundColor: '#15174f',
                    borderRadius: 7,
                    height: 27,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginRight: 20,
                    marginLeft: 0,
                    marginTop: 10
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 600 }}>Add To Cart</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                  <TouchableOpacity
                    
                    style={{
                      backgroundColor: '#bad6e3',
                      borderWidth: 1,
                      borderColor: '#15174f',
                      borderRadius: 7,
                      height: 27,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginRight: 5,
                      marginLeft:-10,
                      marginTop:10,
                    }}>
                    <Text style={{ color: '#15174f', fontWeight: 600 }}>Already Added!</Text>
                  </TouchableOpacity>
                  
                   
                </View>
              )}
            </View>
          </View>
        )}
      />

      {/* Message for no search results */}
      {filteredItems.length === 0 && (
        <View style={{ alignItems: 'center', marginTop: -200,justifyContent:'center' }}>
          <Text style={{ color: 'red', fontSize: 16 }}>This Product is not available right now.</Text>
        </View>
      )}

      {/* Cart Summary */}
      <View style={{borderTopWidth:1, borderColor:'white' }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#bad6e3',
          borderRadius: 7,
          borderWidth: 2,
          height: 60,
          margin: 10,
          
        }}
        onPress={() => {
          navigation.navigate("MyCart");
        }}>
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '600', marginBottom: 4 }}>{`${totalProducts} Product${totalProducts !== 1 ? 's' : ''} Added`}</Text>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>{`Total: ৳${totalPrice}`}</Text>
        </View>

        <View style={{ marginRight: 20 }}>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>View Cart</Text>
        </View>
      </TouchableOpacity>

      </View>
      
      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={closeModal} style={{ marginLeft: 270 }}>
              <FontAwesome name="times-circle" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filter Modal</Text>

            <View style={styles.modalOptions}>
              <TouchableOpacity onPress={() => applyFilter('name')} style={{ marginTop: 25, backgroundColor: 'white', width: '90%', height: '10%', justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: "black", fontSize: 17, fontWeight: 600, }}>Sort By Name</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => applyFilter('lowToHighPrice')} style={{ marginTop: 25, backgroundColor: 'white', width: '90%', height: '10%', justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: "black", fontSize: 17, fontWeight: 600, }}>Low to High Price</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => applyFilter('highToLowPrice')} style={{ marginTop: 25, backgroundColor: 'white', width: '90%', height: '10%', justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: "black", fontSize: 17, fontWeight: 600, }}>High to Low Price</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => applyFilter('rating')} style={{ marginTop: 25, backgroundColor: 'white', width: '90%', height: '10%', justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: "black", fontSize: 17, fontWeight: 600, }}>Sort By Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => applyFilter(null)} style={{ marginTop: 60, width: '40%', backgroundColor: '#15174f', height: '9%', justifyContent: 'center', alignItems: 'center', borderRadius: 4, }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 600, }}>Clear Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Alert for Product Added */}
      {showAlert && (
  <View style={styles.alertContainer}>
    <View style={styles.alertBox}>
      <Text style={styles.alertText}>Product added to the cart</Text>
    </View>
  </View>
)}
</View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalBox: {
    backgroundColor: '#bad6e3',
    borderRadius: 15,
    marginLeft: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 30,
    marginTop: 78,
    width: '80%',
    height: '54%', // adjust the width as needed
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 95,
  },
  modalOptions: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    width: '90%',
    height: '80%',
    borderRadius: 15,
    alignItems: 'center',
    marginLeft: 12,
  },
  alertContainer: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  alertBox: {
    backgroundColor:'black', 
    padding: 14,
    borderRadius: 10,
    elevation: 5, // Shadow
  },
  alertText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AC;