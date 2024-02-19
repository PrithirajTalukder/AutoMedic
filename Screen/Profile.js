import React, { useState, useEffect } from 'react';
import { Alert, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { auth } from '../config/firebase';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Function to fetch user information from Firestore
  const fetchUserInfo = async () => {
    try {
      const user = auth.currentUser;
      const db = getFirestore();
      const userDocRef = doc(db, 'Users Informations', user.uid);

      // Fetch the user document data
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
       
        // Update state with fetched data
        setName(userData.name || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
        setAddress(userData.address || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // useEffect hook to fetch user information when the component mounts
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      const db = getFirestore();
      const userDocRef = doc(db, 'Users Informations', user.uid);

      await updateDoc(userDocRef, {
        name,
        email,
        phone,
        address,
      });

      Alert.alert(
        "Profile Updated",
        "Your profile has been successfully updated.",
        [{ text: "OK", onPress: () => navigation.navigate("Main") }]
      );
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const showEmailUpdateAlert = () => {
    Alert.alert(
      "Email Update",
      "Email cannot be updated.",
      [{ text: "OK", onPress: () => navigation.navigate("Profile") }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "lightblue" }}>
      <View style={{
        flexDirection: "row",
        top: 60,
        paddingLeft: 23
      }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 22, fontSize: 18, fontWeight: "600" }}>My Profile</Text>
      </View>

      <View style={{
        backgroundColor: "black",
        borderRadius: 20,
        top: 110,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 20,
        marginRight: 10,
        height: 570,
        position: "absolute",
        elevation: 6,
      }}>
        <View style={{ paddingTop: 15, paddingLeft: 10 }}>
          <Text style={{ color: "white", fontWeight: 600 }}>PERSONAL DETAILS</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="darkgray"
            value={name}
            onChangeText={(value) => setName(value)}
            style={styles.input}
          />
        </View>

        <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={showEmailUpdateAlert}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="darkgray"
            value={email}
            editable={false}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
          />
        </TouchableOpacity>
      </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            placeholder="Mobile"
            placeholderTextColor="darkgray"
            value={phone}
            onChangeText={(value) => setPhone(value)}
            style={styles.input}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            placeholder="Address"
            placeholderTextColor="darkgray"
            value={address}
            onChangeText={(value) => setAddress(value)}
            style={styles.input}
          />
        </View>

        <View>
          <Pressable
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              SAVE
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 13,
    paddingVertical: 9,
    marginLeft: 3,
    width: 310,
    marginVertical: 10,
    color: "white",
  },
  saveButton: {
    width: 310,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 7,
    marginTop: 260,
    marginLeft: "auto",
    marginRight: "auto",
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
};

export default Profile;