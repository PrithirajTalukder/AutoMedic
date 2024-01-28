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

  const [filteredMessages, setFilteredMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState(null); // New state for image URI

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    const chatsCollection = collection(database, 'chats');
    const q = query(chatsCollection, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const updatedMessages = [];
      querySnapshot.docs.forEach(doc => {
        const { _id, createdAt, text, image, user } = doc.data();
        if (user === mechanicName) {
          updatedMessages.push({
            _id,
            createdAt: createdAt.toDate(),
            text,
            user,
            image,
          });
        }
      });
      setFilteredMessages(updatedMessages);
    });
    return unsubscribe;
  }, [mechanicName]);

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
      if (!result.cancelled && result.assets && result.assets.length > 0 && result.assets[0].uri) {
        setSelectedImageUri(result.assets[0].uri); // Update state with selected image URI
        const newMessage = {
          _id: new Date().toISOString(),
          createdAt: new Date(),
          text: '',
          image: result.assets[0].uri, // Use the URI directly
          user: mechanicName,
        };
        setFilteredMessages(previousMessages => [...previousMessages, newMessage]);
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
        image: selectedImageUri,
        user: mechanicName,
      };
      setFilteredMessages(previousMessages => [...previousMessages, newMessage]);
      if (inputText) {
        await addDoc(collection(database, 'chats'), {
          _id: newMessage._id,
          createdAt: newMessage.createdAt,
          text: newMessage.text,
          user: mechanicName,
        });
      }
      setInputText('');
      setSelectedImageUri(null); // Reset selected image URI
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
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      maxWidth: '80%',
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
        <TouchableOpacity onPress={() => navigation.navigate("Mechaniclocation")}>
          <AntDesign name="arrowleft" size={26} color="white" />
        </TouchableOpacity>
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
        data={filteredMessages.slice().reverse()}
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
