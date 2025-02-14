// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import {StatusBar} from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import RootNavigator from './src/Navigation/RootNavigator'

// App là component chính của ứng dụng.
export default function App(){
  return(
    //NavigationContainer bọc toàn bộ ứng dụng, giúp React Navigation quản lý hệ thống điều hướng.
    // RootNavigator là navigator chính của ứng dụng, chứa các màn hình như OnboardingScreen.
    <NavigationContainer> 
      <RootNavigator/>
    </NavigationContainer>
  )
}
