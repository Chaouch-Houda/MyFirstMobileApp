import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    // <View style={styles.container}>
    <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-3xl font-pblack" > Aora!</Text>
        <StatusBar style="auto"/>
        <Link href="/profile" style={{color: 'blue'}}>Go to profile</Link>
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
