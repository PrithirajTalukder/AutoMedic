import React, { useState, useLayoutEffect } from 'react';
import { TouchableOpacity, Text, View, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import colors from '../assets/themes/colors';


const Chat = ({ route }) => {

  const { mechanicName } = route.params;
  const navigation = useNavigation();


  useLayoutEffect(() => {
    console.log('Received mechanic name:', mechanicName);
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


  let selectedImageUri = null;
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };


  useLayoutEffect(() => {
    const chatsCollection = collection(database, 'chats');
    const q = query(chatsCollection, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const updatedMessages = [];
      querySnapshot.docs.forEach(doc => {
        const { _id, createdAt, text, image } = doc.data();
        updatedMessages.push({
          _id,
          createdAt: createdAt.toDate(),
          text,
          user: doc.data().user,
          image, // Include image field
        });
      });
      setMessages(updatedMessages);
    });
    return unsubscribe;
  }, []);


  const onAddImage = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };
    try {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      console.log('ImagePicker result:', result);
      if (!result.cancelled && result.uri) {
        selectedImageUri = result.uri;
        const newMessage = {
          _id: new Date().toISOString(),
          createdAt: new Date(),
          text: '',
          image: selectedImageUri,
        };
        setMessages(previousMessages => [...previousMessages, newMessage]);
      }
    } catch (error) {
      console.error('ImagePicker error:', error);
    }
  };


  const onSend = async () => {
    if (inputText || selectedImageUri) {
      const newMessage = {
        _id: new Date().toISOString(),
        createdAt: new Date(),
        text: inputText,
        image: selectedImageUri
      };
      setMessages(previousMessages => [...previousMessages, newMessage]);
      if (inputText) {
        await addDoc(collection(database, 'chats'), {
          _id: newMessage._id,
          createdAt: newMessage.createdAt,
          text: newMessage.text,
        });
      }
      setInputText('');
      selectedImageUri = null;
    }
  };


  const onCall = () => {
    console.log('Call initiated');
  };
  const onVideoCall = () => {
    console.log('Video call initiated');
  };


  const messageBoxStyle = StyleSheet.create({
    messageBox: {
      backgroundColor: 'lightblue', // Adjust color as needed
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      maxWidth: '80%', // Prevent overly wide boxes
    },
    text: {
      color: 'black',
      fontSize: 16,
    },
  });


  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Header with Call and Video Call Icons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{mechanicName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onCall} style={{ marginRight: 40 }}>
            <Feather name="phone" size={24} color="lightblue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onVideoCall}>
            <Feather name="video" size={24} color="lightblue" />
          </TouchableOpacity>
        </View>
      </View>

   
      <FlatList
      data={messages.slice().reverse()}
      keyExtractor={item => item._id}
      inverted={true}
      renderItem={({ item }) => (
        <View style={[messageBoxStyle.messageBox, item.user === 'user' ? { backgroundColor: 'lightblue', alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }]}>
          {item.text && <Text style={messageBoxStyle.text}>{item.text}</Text>}
          {item.image && <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />}
        </View>
      )}
    />







      {/* Message Input and Icons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
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
            color: 'black',
          }}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholderTextColor="grey"
        />
        <TouchableOpacity onPress={onSend}>
          <Text style={{ color: 'lightblue', fontSize: 16 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Chat;
