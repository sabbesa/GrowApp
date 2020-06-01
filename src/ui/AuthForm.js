import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
  ImageBackground,
  Image
} from 'react-native';
import { Button, Text, Icon } from 'react-native-elements'
import { withFormik } from 'formik';
import * as yup from 'yup';

import BackgroundGreenWhite from '../images/BackgroundGreenWhite.png'
import Logo from '../images/TitelLogoFärg.png'

const AuthForm = (props) => {

  displayNameInput = (
    <View>
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('displayName', text)}
        placeholder='Display Name'
      />
      <Text style={styles.validationText}>{props.errors.displayName}</Text>
    </View>
  );

  return (
          <ImageBackground source={BackgroundGreenWhite} style={styles.backgroundContainer}>
    <View style={styles.container}>
    <View>
    <Image source={Logo} style={styles.logo}/>
    </View>
      {props.authMode === 'signup' ? displayNameInput : null}
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('email', text)}
        placeholder='email'
      />
      <Text style={styles.validationText}> {props.errors.email}</Text>
      <TextInput
        style={styles.formInput}
        secureTextEntry={true}
        onChangeText={text => props.setFieldValue('password', text)}
        placeholder='password'
      />
      <Text style={styles.validationText}> {props.errors.password}</Text>
      <Button
        onPress={() => props.handleSubmit()}
        buttonStyle={styles.loginButton}
        title={props.authMode === 'login' ? 'Login' : 'Create Account'} />
      <Button
        backgroundColor='transparent'
        color='black'
        buttonStyle={styles.switchButton}
        onPress={() => props.switchAuthMode()}
        title={props.authMode === 'login' ? 'Switch to Signup' : 'Switch to Login'} />

    </View>
            </ImageBackground>
  );
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

  },
  header: {
    marginBottom: 60
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validationText: {
    marginTop: 8,
    marginBottom: 16,
    color: 'red',
    alignSelf: 'center'
  },
  formInput: {
    width: 300,
    height: 50,
    borderColor: '#B5B4BC',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8
  },
  loginButton: {
    width: 200,
    marginBottom: 16,
    backgroundColor: '#6f37be',
  },
  switchButton: {
    width: 200,
    backgroundColor: '#3f51b5',
    marginBottom: 16
  },
  textInput: {
    width: 200
  }
});

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '', displayName: '' }),
  validationSchema: (props) => yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(10).required(),
    displayName: props.authMode === 'signup' ?
      yup.string().min(5).required() : null
  }),
  handleSubmit: (values, { props }) => {
    props.authMode === 'login' ? props.login(values) : props.signup(values)
  },
})(AuthForm);
