import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Modal, Alert, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const MyCar = () => {
  return (
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
    
  )
}

export default MyCar
