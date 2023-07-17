import * as React from 'react'
import { SafeAreaView ,
          Text, 
          TextInput,
          Pressable,
          Image, 
          TouchableOpacity, 
          View,
          StyleSheet, 
          ScrollView}
           from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



const Home=() => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex:1,
        backgroundColor:"black",
        }}>
        <View style={{paddingTop:100,paddingLeft:25,}}>
            <Text style={{color:"lightblue", fontSize:20,}}>What are you looking for?</Text>
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
        <TextInput style={{fontSize:15, paddingLeft:10,}} placeholder='Search'/>  
        </View>

        <View style={{marginLeft:28, marginTop:40}}>
          <Text style={{color:"lightblue", fontSize:18, fontWeight:600,}}>
            Scheduled Services
          </Text>
          </View>

        <View style={{flexDirection:"row"}}>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderRightColor: "lightblue",
              paddingHorizontal: 18,
              marginTop: 20,
              borderWidth: 1,
            
            }}>
            <Image source={require("../images/maintenance.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Periodic {'\n'}Services</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              borderRightColor: "lightblue",
              paddingHorizontal: 15,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/air-conditioner.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5,}}>AC Service{'\n'}& Repair</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              borderRightColor: "lightblue",
              paddingHorizontal: 14,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/wheel.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Tyres & {'\n'}Wheel Care</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              
              paddingHorizontal: 18,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/accumulator.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Batteries</Text>
            </Pressable>
            
        </View>

      <View style={{marginLeft:28, marginTop:30}}>
          <Text style={{color:"lightblue", fontSize:18, fontWeight:600,}}>
            Value Added Services
          </Text>
      </View>

        <View>
            <View style={{flexDirection:"row"}}>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              
              borderRightColor: "lightblue",
              paddingHorizontal: 18,
              marginTop: 20,
              borderWidth: 1,
            
            }}>
            <Image source={require("../images/spray-gun.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Denting &{'\n'}Painting</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              borderRightColor: "lightblue",
              paddingHorizontal: 17,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/wiper.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Car Spa &{'\n'}Cleaning</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              borderRightColor: "lightblue",
              paddingHorizontal: 17,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/thermometer.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Detailing {'\n'}Services</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              
              paddingHorizontal: 15,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/car-inspection.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Car {'\n'}Inspections</Text>
            </Pressable>
            
            </View>

           <View style={{marginLeft:28, marginTop:30}}>
          <Text style={{color:"lightblue", fontSize:18, fontWeight:600,}}>
            Mechanical Repairs
          </Text>
          </View>

            <View>
            <View style={{flexDirection:"row"}}>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              
              borderRightColor: "lightblue",
              paddingHorizontal: 16,
              marginTop: 20,
              borderWidth: 1,
            
            }}>
            <Image source={require("../images/accelerator.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Clutch & {'\n'}Body Parts</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              borderRightColor: "lightblue",
              paddingHorizontal: 12,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/car-light.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Windshield {'\n'}& Lights</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              borderRightColor: "lightblue",
              paddingHorizontal: 12,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/suspension.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Suspension{'\n'}& Fitments</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
              
              backgroundColor: "black",
              padding: 2,
              borderLeftColor: "lightblue",
              
              paddingHorizontal: 13,
              marginTop: 20,
              borderWidth: 1,
            }}>
            <Image source={require("../images/car-insurance.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"lightblue",fontWeight:700, fontSize:12,marginLeft:5}}>Insurance {'\n'}Claims</Text>
            </Pressable>
            
            </View>

            
            
            </View>
            

        </View>

        </SafeAreaView>
    );
}



export default Home

/*export default function Home(){
    return (
        
        <SafeAreaView>
        <View className="flex-1 justify-center bg-violet-400">
            <Text className="text-white">Welcome</Text>
        </View>
        </SafeAreaView>
        
        );
};*/
