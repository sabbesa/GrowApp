import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, ScrollView,SafeAreaView } from 'react-native'
import firebase from '@react-native-firebase/app'

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'

const Drawer= createDrawerNavigator();
const Tab= createMaterialBottomTabNavigator();

import AddPlant from './AddPlant'
import SearchPage from './SearchPage'

export default class Main extends React.Component {
  state = { currentUser: null }

  handleLogout = () => {
    firebase
    .auth()
    .signOut()
    .then(() => this.props.navigation.navigate('Loading'))
    .catch(error => this.setState({ errorMessage: error.message }));
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()


    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <NavigationContainer>
      <ScrollView style={styles.scrollView}>

      <View style={styles.content}>
      <Text style={styles.text}>
      Hi {"\n"} {currentUser && currentUser.email}!
      </Text>

      <Button title="Log out" onPress={this.handleLogout} />
      </View>
      </ScrollView>

      <Tab.Navigator
      activeColor="#000000"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
      style={styles.tabNavigator}
      >
      <Tab.Screen name="AddPlant" component={AddPlant} />
      <Tab.Screen name="SearchPage" component={SearchPage} />
      </Tab.Navigator>


      </NavigationContainer>



      </View>
      </SafeAreaView>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  scrollView:{
    backgroundColor: 'lightgreen',
    width:'99%',
    height: '20%',
    overflow: 'scroll'
  },
  tabNavigator:{
    //position:'absolute'

  },
  text:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginTop: 100

  },
  content:{
    height: '20%'

  }
})
