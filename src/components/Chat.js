// @flow
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
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import Yellowfade from '../images/BackgroundYellow.png';

import Fire from '../../Fire';

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name')
  });

  state = {
    messages: [],
  };

//Jag ändrade till name: this.props.route.paramas.name
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

export default Chat;
