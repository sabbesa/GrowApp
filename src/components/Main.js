import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class Main extends React.Component {
  static navigationOptions = {
    title: 'Chatter',
  };

  state = {
    name: 'Flower Lover',
  };

  onPress = () =>
    this.props.navigation.navigate('Chat', { name: this.state.name });

  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View>
        <Text
         style={styles.welcomeText}
          value={this.state.name}>
          Hello {this.state.name}! Do you want to chat with the expert?
        </Text>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Press for chat</Text>
        </TouchableOpacity>
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
