import React from 'react';
import '../../global.js'
import { GiftedChat } from 'react-native-gifted-chat';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image
} from 'react-native';
import Fire from '../../Fire';
import Yellowfade from '../images/BackgroundYellow.png'

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.route.params.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <View>
      <ImageBackground source={Yellowfade} style={{width:'100%', height:'100%'}}>
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
      <TextInput
       style={styles.chatInput}
       onChangeText={this.onChangeText}>
        Type a messsage...
      </TextInput>
      </ImageBackground>
      </View>
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}
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
  chatInput: {
    margin: offset,
    backgroundColor: 'white',
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: offset,
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

const offset = 24;
export default Chat;
