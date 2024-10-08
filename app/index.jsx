import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    // <View style={styles.container}>
    <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-3xl font-pblack" > Aora!</Text>
        <StatusBar style="auto"/>
        <Link href="/home" style={{color: 'blue'}}>Go to Home</Link>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     flex:1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
