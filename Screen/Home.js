import * as React from 'react'
import { SafeAreaView ,Text, View} from 'react-native'



const Home=() => {
    return (
        <SafeAreaView>
        <View className="flex-1 justify-center bg-violet-400">
            <Text className="text-white">Welcome</Text>
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
