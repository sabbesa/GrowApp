import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

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

import LoginScreen2 from './src/plantscreens/LoginScreen';
//backupsidor
import Settings from './src/plantscreens/Settings';
//backupsidor

import {IMAGE} from './src/constants/Image'

const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator()

function HomeStack({navigation, route}) {
  if (route.state && route.state.routeNames[route.state.index] === "HomeDetail" ) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  }
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="PlantList" component={PlantListScreen} options={navOptionHandler}/>
      <StackHome.Screen name="PlantForm" component={PlantFormScreen} options={navOptionHandler}/>
      <StackHome.Screen name="PlantDetail" component={PlantDetailScreen} options={navOptionHandler}/>
    </StackHome.Navigator>
  )
}
function PlantAddStack({navigation, route}) {
  if (route.state && route.state.routeNames[route.state.index] === "HomeDetail" ) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  }
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="PlantList" component={PlantListScreen} options={navOptionHandler}/>
      <StackHome.Screen name="PlantForm" component={PlantFormScreen} options={navOptionHandler}/>
      <StackHome.Screen name="PlantDetail" component={PlantDetailScreen} options={navOptionHandler}/>
    </StackHome.Navigator>
  )
}

<<<<<<< HEAD
const StackTask = createStackNavigator()
=======
//Varför heter den StackSetting när den är för TodoComponent?
const StackSetting = createStackNavigator()
>>>>>>> f216c21b3f1e20f1a226de4b0de26fe7b6108151

function TaskStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  }
  return (
    <StackTask.Navigator initialRouteName="Task">
      <StackTask.Screen name="TaskList" component={TaskListScreen} options={navOptionHandler}/>
      <StackTask.Screen name="TaskForm" component={TaskFormScreen} options={navOptionHandler}/>
      <StackTask.Screen name="TaskDetail" component={TaskDetailScreen} options={navOptionHandler}/>
    </StackTask.Navigator>
  )
}


function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
//Behöver fixa så att man kommer till rätt sida
            if (route.name === 'Home') {
              iconName = focused
<<<<<<< HEAD
                ? IMAGE.ICON_HOME
                : IMAGE.ICON_HOME_BLACK;
            } else if (route.name === 'Task') {
=======
                ? IMAGE.ICON_HOME_BLACK
                : IMAGE.ICON_HOME;
            }
            else if (route.name === 'Tasks') {
>>>>>>> f216c21b3f1e20f1a226de4b0de26fe7b6108151
              iconName = focused ?
              IMAGE.ICON_SETTINGS_BLACK
              : IMAGE.ICON_SETTINGS;
            }
            else if (route.name === 'Add plant') {
              iconName = focused ?
              IMAGE.ICON_SETTINGS_BLACK
              : IMAGE.ICON_SETTINGS;
            }
            else if (route.name === 'Search') {
              iconName = focused ?
              IMAGE.ICON_SETTINGS_BLACK
              : IMAGE.ICON_SETTINGS;
            }

            // You can return any component that you like here!
            return <Image source={iconName} style={{width: 20, height: 20}}
            resizeMode="contain"/>;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'black',
        }}
      >
<<<<<<< HEAD
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Task" component={TaskStack} />
      </Tab.Navigator>
=======
        <Tab.Screen name="Add plant" component={PlantAddStack} />
        <Tab.Screen name="Search" component={TodoComponent} />
        <Tab.Screen name="Tasks" component={TodoComponent} />
        <Tab.Screen name="Home" component={HomeStack} />
        </Tab.Navigator>
>>>>>>> f216c21b3f1e20f1a226de4b0de26fe7b6108151
  )
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab"
      drawerContent={() => <CustomDrawerContent navigation={navigation}/>}>
        <Drawer.Screen name="MenuTab" component={TabNavigator} />
        <Drawer.Screen name="LoginScreen" component={LoginScreen2} />
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
