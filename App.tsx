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


// import {StatusBar} from 'expo-status-bar'
// import { StyleSheet, Text, View } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native'
// import RootNavigator from './src/Navigation/RootNavigator'

// // App là component chính của ứng dụng.
// export default function App(){
//   return(
//     //NavigationContainer bọc toàn bộ ứng dụng, giúp React Navigation quản lý hệ thống điều hướng.
//     // RootNavigator là navigator chính của ứng dụng, chứa các màn hình như OnboardingScreen.
//     <NavigationContainer> 
//       <RootNavigator/>
//     </NavigationContainer>
//   )
// }


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import RootNavigator from './src/Navigation/RootNavigator';
import { Provider} from "react-redux"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {store, persistor} from "./src/Store"
import { PersistGate } from 'redux-persist/integration/react';


// import { UserProvider } from './Src/redux/UserContext'; // Đường dẫn tới file UserContext

// import UserLogin from './UserLogin/'; // Đường dẫn tới file UserLogin

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    
    <Provider store = {store}>
        
        {/* <UserProvider> */}
        <PersistGate persistor={persistor}>
            <NavigationContainer>
              <RootNavigator/>
            </NavigationContainer>
        </PersistGate>
        
        {/* </UserProvider> */}
        
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

