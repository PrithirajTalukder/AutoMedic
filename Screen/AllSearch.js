import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Modal, Alert, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { addProductToMyCart } from '../redux/MyCartSlice';
import { addMyProduct } from '../redux/MyProductSlice';
import createClient, { urlFor } from '../sanity';

const AllSearch = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cart);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Define UUID to Screen mapping
  const uuidToScreenMapping = {
    '20db7992-529a-49ea-bdc2-077213d5613d': 'Batteries',
    'fc165e9d-877f-412b-a065-65f46f3f0089' : 'Batteries',
    // Add more UUID-screen pairs as needed
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const groqQuery = `
          *[
            _type in ['product','servicesproduct'] &&
            name match $query
          ] {
            _id,
            name,
            image,
            price,
            frequency,
            duration,
            warranty,
            services,
            rating,
            reviews,
            stock 
          }
        `;

        const data = await createClient.fetch(groqQuery, { query: `*${search.toLowerCase()}*` });

        const itemsData = data.map((product) => ({
          id: product._id,
          name: product.name,
          image: { uri: urlFor(product.image).url() },
          price: product.price,
          qty: 0,
          frequency: product.frequency,
          duration: product.duration,
          warranty: product.warranty,
          services: product.services,
          stock: product.stock,
        }));

        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [search]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const onSearch = (text) => {
    setSearch(text);

    if (text === '') {
      setFilteredItems(items);
    } else {
      const filteredItemsData = items.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filteredItemsData);
    }
  };

  const clearFilters = () => {
    setSelectedFilter(null);
    setSearch('');
    setFilteredItems(items);
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
        setFilteredItems(items);
        break;
    }

    closeModal();
  };

  const handleViewDetailsPress = (productId) => {
    // Dynamically determine the screen based on product ID and navigate
    const screenName = determineScreenBasedOnProductId(productId);
    console.log('Product ID:', productId);
    console.log('Screen Name:', screenName);
    if (screenName) {
      navigation.navigate(screenName, { productId });
    } else {
      console.error('No matching screen found for Product ID:', productId);
    }
  };

  const determineScreenBasedOnProductId = (productId) => {
    // Check if the provided ID is a valid UUID
    const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(productId);
    
    if (isUUID) {
      return uuidToScreenMapping[productId] || null;
    }
    // Add more conditions as needed
  
    // If no matching screen found, return null
    return null;
  };

  const totalProducts = myCart.length;
  const totalPrice = myCart.reduce((total, item) => total + item.qty * item.price, 0);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 30, backgroundColor: '#fff', elevation: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>

      {/* Search Bar */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 7,
        backgroundColor: 'white',
      }}>
        <View style={{
          padding: 10,
          marginLeft: 18,
          marginTop: 1,
          flexDirection: "row",
          width: 330,
          backgroundColor: "#bad6e3",
          borderRadius: 20,
          alignItems: "center",
          borderWidth: 1,
          borderColor: 'gray'
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

        <TouchableOpacity onPress={handleFilterPress} style={{ marginLeft: 10, marginTop: 10 }}>
          <FontAwesome name="sort-down" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ borderBottomWidth: 1, borderColor: 'white', backgroundColor: 'white' }}>
        <Text style={{ marginLeft: 25, marginBottom: 2, color: "black", fontSize: 24, fontWeight: 800, }}>
          Products
        </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredItems}
        renderItem={({ item, index }) => (
          <View style={{ width: '95%', alignSelf: 'center', height: 209, backgroundColor: '#bad6e3', marginTop: 10, borderRadius: 10, borderWidth: 1, borderColor: 'white', elevation: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: "black", fontWeight: 700, fontSize: 17, marginTop: -20 }}>{item.name}</Text>
              <Text style={{ color: "#088704", fontWeight: 600, fontSize: 15, marginTop: 5 }}>{'৳' + item.price}</Text>
              <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 10 }}>{item.frequency}</Text>
              <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.duration}</Text>
              <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.warranty}</Text>
              <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 5 }}>{item.services}</Text>
              {item.stock > 0 && (
                <Text style={{ color: "#404042", fontWeight: 600, fontSize: 12, marginTop: 5 }}>
                  {`In Stock: ${item.stock} product${item.stock > 1 ? 's' : ''} available`}
                </Text>
              )}
            </View>
            <View>
              <Image source={item.image} style={{ width: 80, height: 80, marginLeft: 10, marginRight: 30, borderRadius: 5, borderWidth: 1, borderColor: 'white' }} />
              <TouchableOpacity
                onPress={() => handleViewDetailsPress(item.id)}
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
                <Text style={{ color: 'white', fontWeight: 600 }}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Message for no search results */}
      {filteredItems.length === 0 && (
        <View style={{ alignItems: 'center', marginTop: -200, justifyContent: 'center' }}>
          <Text style={{ color: 'red', fontSize: 16 }}>This Product is not available right now.</Text>
        </View>
      )}

      {/* Cart Summary */}
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
    marginRight: 10,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: '95%',
    marginTop: 150,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    alignSelf: 'center',
  },
  modalOptions: {
    marginTop: 20,
    alignItems: 'center',
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: '#bad6e3',
    borderRadius: 15,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: '70%',
  },
  alertText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
});

export default AllSearch;
