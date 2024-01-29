import * as React from 'react'
import { SafeAreaView ,Text, TextInput,Pressable,Image,TouchableOpacity,View,StyleSheet, ScrollView}
           from 'react-native' 
          
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



const Home=() => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex:1,
        backgroundColor:"white",
        }}>
          <ScrollView>
        <View style={{paddingTop:60,paddingLeft:25,}}>
            <Text style={{color:"black", fontSize:20,}}>What are you looking for?</Text>
        </View>
        <View style={{padding:10,
        marginLeft:18,
        marginTop:18,
            flexDirection:"row",
             width:350,
             backgroundColor:"lightblue",
             borderRadius: 20,
             alignItems:"center"}}
        >
        <TouchableOpacity><FontAwesome name="search" size={24} color="black" /></TouchableOpacity>  
        <TextInput style={{fontSize:19, paddingLeft:10, width:'80%'}} placeholder='Search'/>  
        </View>

        <View style={{marginLeft:10, marginTop:20}}>
          <Text style={{color:"black", fontSize:18, fontWeight:800,}}>
            Scheduled Services
          </Text>
          </View>

        <View style={{flexDirection:"row", margin:2}}>
          <ScrollView horizontal={true}>
            <Pressable onPress={() => navigation.navigate("Batteries")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              borderRightColor: "black",
              paddingHorizontal: 18,
              marginTop: 20,
              borderRadius:5,
              marginLeft:3,
              marginRight:3
            
            }}>
            <Image source={require("../images/maintenance.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Periodic {'\n'}Services</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 15,
              marginTop: 20,
              
            }}>
            <Image source={require("../images/air-conditioner.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>AC Service{'\n'}& Repair</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              
              paddingHorizontal: 14,
              marginTop: 20,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
            }}>
            <Image source={require("../images/wheel.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Tyres & {'\n'}Wheel Care</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 18,
              marginTop: 20,
              
            }}>
            <Image source={require("../images/accumulator.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5,marginTop:10}}>Batteries</Text>
            </Pressable>
            </ScrollView>  
        </View>

      <View style={{marginLeft:10, marginTop:20}}>
          <Text style={{color:"black", fontSize:18, fontWeight:800,}}>
            Value Added Services
          </Text>
      </View>

        <View>
            <View style={{flexDirection:"row"}}>
            <ScrollView horizontal={true}>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,

              paddingHorizontal: 18,
              marginTop: 20,

            
            }}>
            <Image source={require("../images/spray-gun.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Denting &{'\n'}Painting</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 17,
              marginTop: 20,

            }}>
            <Image source={require("../images/car-wash.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Car Spa &{'\n'}Cleaning</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 17,
              marginTop: 20,

            }}>
            <Image source={require("../images/thermometer.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Detailing {'\n'}Services</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 15,
              marginTop: 20,

            }}>
            <Image source={require("../images/car-inspection.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Car {'\n'}Inspections</Text>
            </Pressable>
            </ScrollView>
            </View>

           <View style={{marginLeft:10, marginTop:20}}>
          <Text style={{color:"black", fontSize:18, fontWeight:800,}}>
            Mechanical Repairs
          </Text>
          </View>

            <View>
            <View style={{flexDirection:"row"}}>
            <ScrollView horizontal={true}>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 16,
              marginTop: 20,

            
            }}>
            <Image source={require("../images/accelerator.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Clutch & {'\n'}Body Parts</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 12,
              marginTop: 20,

            }}>
            <Image source={require("../images/car-light.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Windshield {'\n'}& Lights</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 12,
              marginTop: 20,

            }}>
            <Image source={require("../images/suspension.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Suspension{'\n'}& Fitments</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "lightblue",
              padding: 10,
              marginLeft:3,
              marginRight:3,
              borderRadius:5,
              paddingHorizontal: 13,
              marginTop: 20,

            }}>
            <Image source={require("../images/car-insurance.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:12,marginLeft:5,marginTop:5}}>Insurance {'\n'}Claims</Text>
            </Pressable>
            </ScrollView>
            </View>

            
            
            </View>


            
            

        </View>
        </ScrollView>
        </SafeAreaView>
    );
}



export default Home


