import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Pressable, Image, View, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import createClient, { urlFor } from '../sanity';

const Home = () => {
  const navigation = useNavigation();
  const [scheduledServices, setScheduledServices] = useState([]);
  const [valueAddedServices, setValueAddedServices] = useState([]);
  const [mechanicalRepairs, setMechanicalRepairs] = useState([]);

  useEffect(() => {
    const groqQuery = `
      *[_type == 'services'] {
        serviceId,
        name,
        description,
        image,
        "servicesproducts": *[_type == 'servicesproducts' && references(^._id)] {
          _id,
          name,
          image,
          price,
          details,
          rating,
          reviews
        }
      }
    `;

    createClient.fetch(groqQuery)
      .then(data => {
        const scheduledServicesIds = ["S1", "S2", "S3", "S4"];
        const valueAddedServicesIds = ["S5", "S6", "S7", "S8"];
        const mechanicalRepairsIds = ["S9", "S10", "S11", "S12"];

        const filterByCategory = (ids) => data.filter(service => ids.includes(service.serviceId));
        const sortServices = (services) => services.sort((a, b) => a.serviceId.localeCompare(b.serviceId));

        setScheduledServices(sortServices(filterByCategory(scheduledServicesIds)));
        setValueAddedServices(sortServices(filterByCategory(valueAddedServicesIds)));
        setMechanicalRepairs(sortServices(filterByCategory(mechanicalRepairsIds)));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderCategory = (service) => (
    <Pressable
      key={service.serviceId}
      style={{
        backgroundColor: "lightblue",
        padding: 10,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginTop: 20,
        marginLeft: 3,
        marginRight: 3,
      }}
      onPress={() => {
        let categoryScreen;
        switch (service.serviceId) {
          case "S1":
            categoryScreen = "Periodic"; // Replace with the actual screen name for scheduled services
            break;
          case "S2":
            categoryScreen = "AC"; // Replace with the actual screen name for scheduled services
            break;
          case "S3":
            categoryScreen = "Wheel"; // Replace with the actual screen name for scheduled services
            break;
          case "S4":
            categoryScreen = "Scheduled"; // Replace with the actual screen name for scheduled services
            break;
          case "S5":
            categoryScreen = "Denting"; // Replace with the actual screen name for scheduled services
            break;
          case "S6":
          case "S7":
          case "S8":
            categoryScreen = "ValueAdded"; // Replace with the actual screen name for value-added services
            break;
          case "S9":
          case "S10":
          case "S11":
          case "S12":
            categoryScreen = "Mechanical"; // Replace with the actual screen name for mechanical repairs
            break;
          default:
            categoryScreen = "Periodic"; // Default to "Periodic" screen
            break;
        }
        navigation.navigate(categoryScreen, { service });
      }}
    >
      <Image source={{ uri: urlFor(service.image).url() }} style={{ width: 70, height: 60 }} />
      <Text style={{ color: "black", fontWeight: 700, fontSize: 12, marginLeft: 5, marginTop: 5 }}>{service.name}</Text>
    </Pressable>
  );
  

  const renderCategoryRow = (categories) => (
    <ScrollView horizontal={true}>
      {categories.map((category, index) => (
        <React.Fragment key={index}>{category}</React.Fragment>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ paddingTop: 60, paddingLeft: 25 }}>
          <Text style={{ color: "black", fontSize: 20 }}>What are you looking for?</Text>
        </View>
        <View style={{
          padding: 10,
          marginLeft: 18,
          marginTop: 18,
          flexDirection: "row",
          width: 350,
          backgroundColor: "lightblue",
          borderRadius: 20,
          alignItems: "center"
        }}>
          <Pressable><FontAwesome name="search" size={24} color="black" /></Pressable>
          <TextInput style={{ fontSize: 19, paddingLeft: 10, width: '80%' }} placeholder='Search' />
        </View>

        <View style={{ marginLeft: 10, marginTop: 20 }}>
          <Text style={{ color: "black", fontSize: 18, fontWeight: '800' }}>Scheduled Services</Text>
        </View>

        <View style={{ flexDirection: "row", margin: 2 }}>
          {renderCategoryRow(scheduledServices.map(renderCategory))}
        </View>

        <View style={{ marginLeft: 10, marginTop: 20 }}>
          <Text style={{ color: "black", fontSize: 18, fontWeight: '800' }}>Value Added Services</Text>
        </View>

        <View style={{ flexDirection: "row", margin: 2 }}>
          {renderCategoryRow(valueAddedServices.map(renderCategory))}
        </View>

        <View style={{ marginLeft: 10, marginTop: 20 }}>
          <Text style={{ color: "black", fontSize: 18, fontWeight: '800' }}>Mechanical Repairs</Text>
        </View>

        <View style={{ flexDirection: "row", margin: 2 }}>
          {renderCategoryRow(mechanicalRepairs.map(renderCategory))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
