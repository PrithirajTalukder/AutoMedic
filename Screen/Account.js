import { View, SafeAreaView, Image, Pressable } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableOpacity,
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../config/firebase'; 

const Account = () => {
  const navigation = useNavigation();
  const currentUser = auth.currentUser; // Access the current user from the auth object

  // Check if the user is logged in before rendering the component
  if (!currentUser) {
    return <View style={{width:'100%', height:'100%', backgroundColor:'white', display:'flex',justifyContent:'center', alignItems:'center'}}><Text>Loading...</Text></View>;
  }

  const { displayName, email } = currentUser;

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <View style={{
        paddingTop: 100,
        paddingLeft: 20,
        flexDirection: "row",
      }}>
       <Avatar.Image source={require("../images/user.png")}
          size={80}
        />
        <View style={{ flexDirection: "column" }}>
          <Title style={{ color: "black", left: 12, top: 10, fontWeight: "700" }}>{displayName}</Title>
          <View style={{ top: 20, left: 10, flexDirection: "row" }}>
            <FontAwesome name="envelope" size={19} color="black" />
            <Text style={{ color: "black", left: 6, top: -2, fontSize: 16 }}>{email}</Text>
          </View>
        </View>
      </View>
        
        

        <View style={{flexDirection:"row",
        paddingTop:20,
        borderTopWidth:2,
        marginTop:38,
        borderBottomWidth:2,
        paddingBottom:20,
        borderTopColor:"lightblue",
        borderBottomColor:"lightblue",
        }}>
        <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
 
              padding: 10,
              paddingLeft: 40,
              paddingHorizontal: 18,
        
            }}>
            <Image source={require("../images/clock.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:14,marginTop:8, marginLeft:-10}}>Order History</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
 
              padding: 10,
              paddingLeft: 34,
              paddingHorizontal: 18,
        
            }}>
            <Image source={require("../images/car.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:14,marginTop:8}}>My Cars</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Periodic")} 
            style={{
 
              padding: 10,
              paddingLeft: 36,
              paddingHorizontal: 18,
        
            }}>
            <Image source={require("../images/help.png")}
            style={{ width: 60, height: 60 }} />
            <Text style={{color:"black",fontWeight:700, fontSize:14,marginTop:8, marginLeft:-15}}>Help & Support</Text>
            </Pressable>
        </View>
        

        <View style={{borderBottomWidth:2,borderBottomColor:"lightblue", paddingBottom:40}}>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <View style={{flexDirection:"row", paddingTop:50, paddingLeft:20}}>
          <AntDesign name="profile" size={36} color="black" />
          <Text style={{marginLeft:30, marginTop:8, fontSize:16, fontWeight:800}}>Profile</Text>
          <View style={{marginLeft:200, marginTop:8}}><MaterialIcons name="navigate-next" size={24} color="black" /></View>
          

        </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Periodic")}>
          <View style={{flexDirection:"row", paddingTop:50, paddingLeft:20}}>
          <MaterialIcons name="dashboard-customize" size={36} color="black" />
          <Text style={{marginLeft:30, marginTop:8, fontSize:16, fontWeight:800}}>Set Preferences</Text>
          <View style={{marginLeft:130, marginTop:8}}><MaterialIcons name="navigate-next" size={24} color="black" /></View>
          

        </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Periodic")}>
          <View style={{flexDirection:"row", paddingTop:50, paddingLeft:20}}>
          <AntDesign name="gift" size={36} color="black" />
          <Text style={{marginLeft:30, marginTop:8, fontSize:16, fontWeight:800}}>Refer and Earn</Text>
          <View style={{marginLeft:140, marginTop:8}}><MaterialIcons name="navigate-next" size={24} color="black" /></View>
          

        </View>
        </Pressable>
        </View>

        <View>
        <Pressable onPress={() => navigation.navigate("SignIn")} 
                style={{
                width: 250,
                backgroundColor: "lightblue",
                padding: 12,
                borderRadius: 7,
                marginTop:5,
                marginLeft: "auto",
                marginRight: "auto",
                elevation:4,
              }}
            >
              <Text style={{ fontSize: 20, textAlign: "center", color: "black", fontWeight: "600" }}>
                Logout
              </Text>

            </Pressable>
        </View>
        </SafeAreaView>
    )
}

export default Account;