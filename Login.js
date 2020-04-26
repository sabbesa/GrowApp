import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Image } from 'react-native'
import firebase from '@react-native-firebase/app'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BackgroundGreenWhite from './Images/BackgroundGreenWhite.png'
import Logo from './Images/TitelLogoFärg.png'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
  }


  render() {
    return (
      <ImageBackground source={BackgroundGreenWhite} style={styles.backgroundContainer}>
<KeyboardAwareScrollView>
      <View>
      <Image source={Logo} style={styles.logo}/>
      </View>
      <View style={styles.container}>
      {this.state.errorMessage &&
        <Text style={{ color: 'red' }}>
        {this.state.errorMessage}
        </Text>}

        <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={email => this.setState({ email })}
        value={this.state.email}
        />

        <TextInput
        secureTextEntry
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
        />
        <View style={{margin:20}}>
        <Button onPress={this.handleLogin}
        title="Login"
        color="#75b8e1"
        />
        </View>

        <View style={{marginTop:120}}>
        <Button
        title="Don't have an account? Sign Up"
        color="#75b8e1"
        onPress={() => this.props.navigation.navigate('SignUp')}
        />
        </View>
        </View>
              </KeyboardAwareScrollView>
        </ImageBackground>
      )
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
