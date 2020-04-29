import React from 'react'
// import { View, Text, AsyncStorage, StyleSheet } from 'react-native'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Main from './Main';
import AddPlant from './AddPlant';
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import SearchPage from './SearchPage';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="AddPlant" component={AddPlant} />
    </Tab.Navigator>
  );
}

// const SignoutScreen = () => {}
//
// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// });
//
// export const TabScreen = createBottomTabNavigator({
//     Home: {
//         screen: Main,
//         navigationOptions: {
//             tabBarLabel: 'Home'
//         }
//     },
//     Settings: {
//         screen: AddPlant,
//         navigationOptions: {
//             tabBarLabel: 'Add Plant'
//         }
//     },
//     Signout: {
//         screen: SearchPage,
//         navigationOptions: {
//             tabBarLabel: 'Search Plant',
//             tabBarOnPress: async ({navigation}) => {
//                 await AsyncStorage.clear();
//                 navigation.navigate('Auth');
//             }
//         }
//     }
// }, {
//     tabBarOptions: {
//         activeTintColor: 'red',
//         inactiveTintColor: 'grey'
//
//     }
// });
