import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const Help = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Main");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 30, backgroundColor: '#fff', elevation: 1 }}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>

      {/* Content */}
      <View style={[styles.blueContainer, styles.contentContainer]}>
        <Text style={styles.header}>AutoMedic Help and Support</Text>

        <Text style={styles.sectionHeader}>Finding Mechanics:</Text>
        <Text style={styles.text}>
          AutoMedic makes it easy to find skilled mechanics in your area. Follow these steps to locate the right professional for your automotive needs:
          {'\n\n'}
          - Open the AutoMedic app.
          {'\n'}
          - Choose the "Find a Mechanic" option.
          {'\n'}
          - Enter your location and the specific services you require.
          {'\n'}
          - Browse through the list of qualified mechanics.
          {'\n'}
          - Read reviews and ratings from other users to make an informed decision.
        </Text>
      </View>

      {/* Second Blue Container */}
      <View style={[styles.blueContainer, styles.faqContainer]}>
        <Text style={styles.sectionHeader}>Frequently Asked Questions (FAQs):</Text>
        <Text style={styles.text}>
          **Q1: How do I find a mechanic using AutoMedic?**
          {'\n'}
          - Open the AutoMedic app and select "Find a Mechanic."
          {'\n'}
          - Enter your location and the specific services you need.
          {'\n'}
          - Browse through the list of mechanics, read reviews, and make a choice.
          {'\n\n'}
          **Q2: Can I schedule appointments with mechanics through the app?**
          {'\n'}
          - Yes, you can schedule appointments with mechanics directly through the app. Once you choose a mechanic, you'll have the option to select a suitable date and time.
          {'\n\n'}
          {/* Add similar content for other FAQs */}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blueContainer: {
    backgroundColor: 'lightblue',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  contentContainer: {
    marginTop: 30, // Adjust this spacing based on your design preferences
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  faqContainer: {
    // Add any additional styles for the FAQ container
  },
});

export default Help;
