/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import NotificationDetail from './NotificationDetail';
import Yellowfade from '../images/BackgroundYellow.png'

export default class ReminderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotificationDetail(
      this.onRegister.bind(this),
      this.onNotification.bind(this),
    );
  }

  render() {
    return (
  <ImageBackground source={Yellowfade} style={{width:'100%', height:'100%'}}>
      <View style={styles.container}>
        <Text style={styles.title}>
        Watering reminder screen
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotification('sample.mp3');
          }}>
          <Text style= {styles.text}>Local Notification with sound (now)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotifications();
          }}>
          <Text style= {styles.text}>Remind me to water my plants in one hour</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleDailyNotifications();
          }}>
          <Text style= {styles.text}>Remind me to water my plants every day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleWeeklyNotifications();
          }}>
          <Text style= {styles.text}>Remind me to water my plants every week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotifications('sample.mp3');
          }}>
          <Text style= {styles.text}>Schedule Notification with sound in 15s</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.cancelAll();
          }}>
          <Text style= {styles.text}>Cancel all notifications</Text>
        </TouchableOpacity>
              <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.requestPermissions();
          }}>
          <Text style= {styles.text}>Request Permission</Text>
        </TouchableOpacity>

        <View style={styles.spacer}></View>

        {this.state.fcmRegistered && <Text>FCM Configured !</Text>}

        <View style={styles.spacer}></View>
      </View>
      </ImageBackground>

    );
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotification(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
    },
  backgroundContainer: {
    width:'100%',
    height:'100%',
  },
  spacer: {
    height: 10,
  },
  text: {
      color: 'gray',
      fontWeight: 'bold',
  },
  title: {
    marginBottom: 30,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
});
