import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from '@react-native-firebase/app'


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

      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
      <Button title="Log out" onPress={this.handleLogout} />
      <View style={styles.bottomButtons}>
      <Button title="calendar"/>
      <Button title= "add plant"/>
      <Button title="search"/>
      </View>

      </View>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomButtons:{
    flex: 3,
    justifyContent: 'flex-end',
    marginBottom: 36

  }
})
