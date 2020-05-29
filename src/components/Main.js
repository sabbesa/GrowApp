import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image
} from 'react-native';

import Yellowfade from '../images/BackgroundYellow.png'
import firebase from '@react-native-firebase/app'


class Main extends React.Component {

  static navigationOptions = {
    title: 'Chatter',
  };

  state = {

   name: 'You',
   currentUser: null,
  };

  onPress = () =>
    this.props.navigation.navigate('Chat', { name: this.state.name });

  onChangeText = name => this.setState({ name });

  componentDidMount() {
    const { currentUser } = firebase.auth()


    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    return (
      <View>
      <ImageBackground source={Yellowfade} style={styles.backgroundContainer}>
        <Text
         style={styles.welcomeText}
         onChangeText={this.onChangeText}
          value={this.currentUser && this.currentUser.displayName}>
          Hello {currentUser && currentUser.displayName}! Do you want to chat with the expert?
        </Text>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Press for chat</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
  height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  backgroundContainer: {
        width:'100%',
        height:'100%',
      },
  buttonText: {
    marginTop: 50,
    marginLeft: offset,
    fontSize: offset,
  },
  welcomeText: {
    marginTop: 50,
    marginLeft: offset,
    fontSize: offset,
    fontWeight: 'bold',
  },
});

export default Main;
