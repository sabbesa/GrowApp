import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Toast from 'react-native-simple-toast';


import Main from './src/components/Main';
import Chat from './src/components/Chat';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import {CustomHeader, CustomDrawerContent} from './src'

import PlantListScreen from './src/plantscreens/PlantListScreen';
import PlantFormScreen from './src/plantscreens/PlantFormScreen';
import PlantDetailScreen from './src/plantscreens/PlantDetailScreen';

import TaskListScreen from './src/taskscreens/TaskListScreen';
import TaskFormScreen from './src/taskscreens/TaskFormScreen';
import TaskDetailScreen from './src/taskscreens/TaskDetailScreen';

import Notifications from './src/taskscreens/Notifications';
import NotificationHandler from './src/taskscreens/NotificationHandler';
import NotificationDetail from './src/taskscreens/NotificationDetail';
import ReminderScreen from './src/taskscreens/ReminderScreen';

import LoginScreen2 from './src/plantscreens/LoginScreen';

import {IMAGE} from './src/constants/Image'

const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator()

function HomeStack({navigation, route}) {
    navigation.setOptions({tabBarVisible: true})

  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="PlantList" component={PlantListScreen} options={navOptionHandler}/>
      <StackHome.Screen name="PlantForm" component={PlantFormScreen} options={navOptionHandler}/>
      <StackHome.Screen name="PlantDetail" component={PlantDetailScreen} options={navOptionHandler}/>
    </StackHome.Navigator>
  )
}
function PlantAddStack({navigation, route}) {
    navigation.setOptions({tabBarVisible: true})

  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="PlantList" component={PlantListScreen} options={navOptionHandler}/>
      <StackHome.Screen name="PlantForm" component={PlantFormScreen} options={navOptionHandler}/>
      <StackHome.Screen name="PlantDetail" component={PlantDetailScreen} options={navOptionHandler}/>
    </StackHome.Navigator>
  )
}

const StackTask = createStackNavigator()

function TaskStack({navigation, route}) {
    navigation.setOptions({tabBarVisible: true})
  return (
    <StackTask.Navigator initialRouteName="Task">
      <StackTask.Screen name="TaskList" component={TaskListScreen} options={navOptionHandler}/>
      <StackTask.Screen name="TaskForm" component={TaskFormScreen} options={navOptionHandler}/>
      <StackTask.Screen name="TaskDetail" component={TaskDetailScreen} options={navOptionHandler}/>
    </StackTask.Navigator>
  )
}

const StackChat = createStackNavigator()

function ChatStack({navigation, route}) {
    navigation.setOptions({tabBarVisible: true})
  return (
    <StackTask.Navigator initialRouteName="Task">
      <StackTask.Screen name="Main" component={Main} options={navOptionHandler}/>
      <StackTask.Screen name="Chat" component={Chat} options={navOptionHandler}/>
    </StackTask.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? IMAGE.ICON_HOME_BLACK
                : IMAGE.ICON_HOME;
            } else if (route.name === 'Task') {
              iconName = focused ?
              IMAGE.ICON_LIST_BLACK
              : IMAGE.ICON_LIST;
            }
            else if (route.name === 'Chat') {
              iconName = focused ?
              IMAGE.ICON_CHAT_BLACK
              : IMAGE.ICON_CHAT;

            }
            return <Image source={iconName} style={{width: 20, height: 20}}
            resizeMode="contain"/>;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name="Task" component={TaskStack} />
        <Tab.Screen name="Chat" component={ChatStack}/>
        <Tab.Screen name="Home" component={HomeStack} />

      </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab"
      drawerContent={() => <CustomDrawerContent navigation={navigation}/>}>
        <Drawer.Screen name="MenuTab" component={TabNavigator} />
        <Drawer.Screen name="LoginScreen" component={LoginScreen2} />
        <Drawer.Screen name="ReminderScreen" component={ReminderScreen} />
    </Drawer.Navigator>
  )
}

const StackApp = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <StackApp.Navigator initialRouteName="Login">
          <StackApp.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler}/>
          <StackApp.Screen name="Main" component={Main} options={navOptionHandler}/>
          <StackApp.Screen name="Chat" component={Chat} options={navOptionHandler}/>
          <StackApp.Screen name="Login" component={LoginScreen2} options={navOptionHandler}/>
        </StackApp.Navigator>
    </NavigationContainer>
  );
}
