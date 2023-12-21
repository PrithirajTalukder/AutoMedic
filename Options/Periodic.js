import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Pressable, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Video from 'react-native-video';
import { FontAwesome } from '@expo/vector-icons';

const Periodic = () => {
  const navigation = useNavigation();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [data, setData] = useState([
    {
      title: 'Basic Services',
      frequency: 'Every 5000 kms/ 3 Months',
      duration: 'Takes 4 Hours',
      warranty: '1 Month warranty',
      services: 'Includes 9 Services',
      price: '3000tk',
      image: require("../images/Bs.jpg"),
    },
    {
      title: 'Standard Services',
      frequency: 'Every 10000 kms/ 6 Months',
      duration: 'Takes 6 Hours',
      warranty: '1 Month warranty',
      services: 'Includes 15 Services',
      price: '5000tk',
      image: require("../images/Ss.jpg"),
    },
    {
      title: 'Comprehensive Services',
      frequency: 'Every 20000 kms/ 1 Year',
      duration: 'Takes 8 Hours',
      warranty: '1 Month warranty',
      services: 'Includes 20 Services',
      price: '7000tk',
      image: require("../images/Cs.jpg"),
    },
  ]);
  const [originalData, setOriginalData] = useState(data);
  const [filteredData, setFilteredData] = useState(originalData);

  const onSearch = (text) => {
    setSearch(text);

    if (text === '') {
      setFilteredData(originalData);
    } else {
      const filteredServiceData = originalData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredServiceData);
    }
  };

  const [selectedFilter, setSelectedFilter] = useState(null);


  const clearSearch = () => {
    setSearch('');
    setFilteredData(originalData);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const closeModal = () => {
    setFilterModalVisible(false);
  };

  const applyFilter = (filter) => {
    setSelectedFilter(filter);

    // Apply the selected filter to the data
    switch (filter) {
      case 'name':
        setFilteredData([...filteredData].sort((a, b) => a.title.localeCompare(b.title)));
        break;
        case 'lowToHighPrice':
          setFilteredData([...filteredData].sort((a, b) => {
            const priceA = parseInt(a.price); // Convert the price string to an integer
            const priceB = parseInt(b.price);
            return priceA - priceB;
          }));
          break;
        case 'highToLowPrice':
          setFilteredData([...filteredData].sort((a, b) => {
            const priceA = parseInt(a.price);
            const priceB = parseInt(b.price);
            return priceB - priceA;
          }));
          break;
      //case 'rating':
        //setFilteredData([...filteredData].sort((a, b) => /* Sort logic for rating */));
        //break;
      default:
        setFilteredData(originalData);
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingTop: 10, paddingBottom: 100 }}>
          <View style={{
            flexDirection: "row",
            top: 40,
            paddingLeft: 20
          }}>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
          </View>
          <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
            <View style={{
              padding: 10,
              marginLeft: 18,
              marginTop: 60,
              flexDirection: "row",
              width: 330,
              backgroundColor: "lightblue",
              borderRadius: 20,
              alignItems: "center"
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
                <TouchableOpacity onPress={clearSearch} style={{ marginLeft: 10 }}>
                  <FontAwesome name="times" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity onPress={handleFilterPress} style={{ marginLeft: 0 }}>
              <FontAwesome name="filter" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isFilterModalVisible}
            onRequestClose={closeModal}
          >
                <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Filter Modal</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text>Close Modal</Text>
              </TouchableOpacity>
              <View style={styles.modalOptions}>
                <TouchableOpacity onPress={() => applyFilter('name')}>
                  <Text>Sort By Name</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => applyFilter('lowToHighPrice')}>
                  <Text>Low to High Price</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => applyFilter('highToLowPrice')}>
                  <Text>High to Low Price</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => applyFilter('rating')}>
                  <Text>Sort By Rating</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => applyFilter(null)}>
                  <Text>Clear Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        
          </Modal>

          <View style={{ marginLeft: 25, marginTop: 10, top: 20, marginBottom: 40 }}>
            <Text style={{ color: "black", fontSize: 24, fontWeight: 800, }}>
              Scheduled Packages
            </Text>
          </View>

          {filteredData.map((service, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate("Account")}
              style={{
                backgroundColor: "white",
                paddingTop: 80,
                borderRadius: 25,
                paddingHorizontal: 12,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
                borderColor: "lightblue",
                borderWidth: 2
              }}
            >
              <Text style={{ color: "black", fontWeight: 700, fontSize: 17, marginLeft: 5, top: -60 }}>{service.title}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -40 }}>
                <View>
                  <Text style={{ color: "gray", fontWeight: 400, fontSize: 15, marginLeft: 10 }}>{service.frequency}</Text>
                  <Text style={{ color: "gray", fontWeight: 400, fontSize: 15, marginLeft: 10, top: 4 }}>{service.duration}</Text>
                  <Text style={{ color: "gray", fontWeight: 400, fontSize: 15, marginLeft: 10, top: 4 }}>{service.warranty}</Text>
                  <Text style={{ color: "gray", fontWeight: 400, fontSize: 15, marginLeft: 10, top: 4 }}>{service.services}</Text>
                  <Text style={{ color: "gray", fontWeight: 400, fontSize: 15, marginLeft: 10, top: 4 }}>{service.price}</Text>
                </View>
                <Image source={service.image} style={{ width: 100, height: 100, borderRadius: 15 }} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    width: '80%', // adjust the width as needed
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOptions: {
    marginTop: 10,
  },
});


export default Periodic;


         