import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text, View, TextInput, FlatList } from 'react-native';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

import colors from '../assets/themes/colors';

import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary} from 'react-native-image-picker';

const Chat = ({ route }) => {
  const { mechanicName } = route.params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (mechanicName) {
      navigation.setOptions({
        headerTitle: mechanicName,
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, mechanicName]);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          image: doc.data().image, // Retrieve image from Firebase
        }))
      );
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback(() => {
    const user = {
      _id: auth?.currentUser?.uid,
      avatar: 'https://i.pravatar.cc/300'
    };

    const newMessage = {
      _id: new Date().toISOString(),
      createdAt: new Date(),
      text: inputText,
      user
    };

    setMessages(previousMessages => [...previousMessages, newMessage]);

    // Save to Firebase
    addDoc(collection(database, 'chats'), {
      _id: newMessage._id,
      createdAt: newMessage.createdAt,
      text: newMessage.text,
      user: newMessage.user,
    });

    // Clear input
    setInputText('');
  }, [auth, inputText]);

  const onAddImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Correct usage of launchImageLibrary
    ImagePicker.launchImageLibrary(options, response => {
      if (!response.didCancel && !response.error) {
        const selectedImage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        // Handle the selected image, e.g., upload to Firebase Storage
        console.log('Selected image:', selectedImage);

        // Save to Firebase
        const user = {
          _id: auth?.currentUser?.uid,
          avatar: 'https://i.pravatar.cc/300',
        };

        const newMessage = {
          _id: new Date().toISOString(),
          createdAt: new Date(),
          text: '',
          user,
          image: selectedImage,
        };

        setMessages(previousMessages => [...previousMessages, newMessage]);

        addDoc(collection(database, 'chats'), {
          _id: newMessage._id,
          createdAt: newMessage.createdAt,
          text: newMessage.text,
          user: newMessage.user,
          image: newMessage.image,
        });
      }
    });
  };

  const onTakePhoto = () => {
    // Implement logic to open device camera and capture a photo
    console.log('Take photo clicked');
  };

  const onCall = () => {
    // Implement logic for initiating a call
    console.log('Call initiated');
  };

  const onVideoCall = () => {
    // Implement logic for initiating a video call
    console.log('Video call initiated');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Header with Call and Video Call Icons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{mechanicName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onCall} style={{ marginRight: 10 }}>
            <Feather name="phone" size={24} color="lightblue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onVideoCall}>
            <Feather name="video" size={24} color="lightblue" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            {item.text && <Text style={{ color: 'white' }}>{item.text}</Text>}
            {item.image && <Image source={{ uri: item.image.uri }} style={{ width: 200, height: 200 }} />}
          </View>
        )}
        inverted
      />

      {/* Message Input and Icons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={onTakePhoto} style={{ marginRight: 10 }}>
          <Feather name="camera" size={24} color="lightblue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddImage} style={{ marginRight: 10 }}>
          <MaterialIcons name="add-a-photo" size={24} color="lightblue" />
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 3,
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingHorizontal: 20,
            marginRight: 10,
            color: 'black', // Text color
          }}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholderTextColor="grey" // Placeholder text color
        />
        <TouchableOpacity onPress={onSend}>
          <Text style={{ color: 'lightblue', fontSize: 16 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
