import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Image} from 'react-native'
import firebase from '@react-native-firebase/app'

import BackgroundGreenWhite from './Images/BackgroundGreenWhite.png'
import Logo from './Images/TitelLogoFärg.png'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <ImageBackground source={BackgroundGreenWhite} style={styles.backgroundContainer}>
      <View>
      <Image source={Logo} style={styles.logo}/>
      </View>

      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <View style={{margin:20}}>
        <Button
        title="Sign Up"
        color="#75b8e1"
        onPress={this.handleSignUp}
        />
        </View>
        <View style={{marginTop:120}}>
        <Button
          title="Already have an account? Login"
          color="#75b8e1"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        </View>
      </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
      height: 150,
      width: 300,
      position: 'relative',
      marginTop: 150

    },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
