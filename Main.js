import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, ScrollView,SafeAreaView } from 'react-native'
import firebase from '@react-native-firebase/app'

//Detta är de nya grejerna jag använt. Installera via kommandotolken
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'

//Importing pages
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
    const Drawer= createDrawerNavigator()
    const Tab= createMaterialBottomTabNavigator()
    return (
      <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.text}>
        <Text>Here goes the logo</Text>
      </Text>
      </View>
        <View style={styles.container}>

          <NavigationContainer>
            <ScrollView style={styles.scrollView}>

              <View style={styles.content}>
                <Text style={styles.text}>
                  <Text>Hi {"\n"} {currentUser && currentUser.email}!</Text>
                </Text>

                <Button title="Log out" onPress={this.handleLogout} />
              </View>
            </ScrollView>

          <Tab.Navigator
            activeColor="#000000"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#694fad' }}
            height='80%'
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
    flex:1,
    height: '30%'
  },
  text:{
    //justifyContent: 'center',
  //  alignItems: 'center',
    marginBottom:20,
    marginTop: 10
  }
})
