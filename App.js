import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack'


import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';


// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'


// create our app's navigation stack
export default createAppContainer(createSwitchNavigator (
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
));


const user = firebase.auth().currentUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})




// const AuthStack=createStackNavigator ();
// const Tabs = createBottomTabNavigator ();
//
// export default () => (
//   <NavigationContainer>
//     <Tabs.Navigator>
//       <Tabs.Screen name="Home" component={Main}/>
//       <Tabs.Screen name="AddPlant" component={AddPlant}/>
//     </Tabs.Navigator>
//     <AuthStack.Navigator>
//       <AuthStack.Screen name='Loading' component= {Loading}/>
//       <AuthStack.Screen name='SignUp' component= {SignUp}/>
//       <AuthStack.Screen name='Login' component= {Login}/>
//       <AuthStack.Screen name='Main' component= {Main}/>
//     </AuthStack.Navigator>
//
//   </NavigationContainer>
)
//Nedan är det som stod här till att börja med.

// /**
//  * Sample React Native App with Firebase
//  * https://github.com/invertase/react-native-firebase
//  *
//  * @format
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
//
// import firebase from '@react-native-firebase/app';
//
// // TODO(you): import any additional firebase services that you require for your app, e.g for auth:
// //    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
// //       run linking commands - this happens automatically at build time now
// //    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
// //    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
// //    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
// });
//
// const firebaseCredentials = Platform.select({
//   ios: 'https://invertase.link/firebase-ios',
//   android: 'https://invertase.link/firebase-android',
// });
//
// type Props = {};
//
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to Grow App!</Text>
//         <Text style={styles.instructions}>This will be a super fun project</Text>
//         <Text style={styles.instructions}>And we are an awesome group! </Text>
//         {!firebase.apps.length && (
//           <Text style={styles.instructions}>
//             {`\nYou currently have no Firebase apps registered, this most likely means you've not downloaded your project credentials. Visit the link below to learn more. \n\n ${firebaseCredentials}`}
//           </Text>
//         )}
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
