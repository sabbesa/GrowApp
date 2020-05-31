import React from 'react';
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
import PropTypes from 'prop-types';
import Fire from '../../Fire';
import Yellowfade from '../images/BackgroundYellow.png'
import emojiUtils from 'emoji-utils';


import SlackMessage from './SlackMessage';

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
        onSend={messages => this.onSend(messages)}
        renderComposer={this.renderComposer}
        listViewProps={{
    	     style: styles.listContainer,
    	      contentContainerStyle: styles.msgListContainer,
        }}
        user={this.user}
        renderMessage={this.renderMessage}
        renderAvatar={null}
        renderSend={this.renderSend}
        text={this.state.messageText}
        alwaysShowSend={true}
        minComposerHeight={55}
        maxComposerHeight={55}
        bottomOffset={Platform.select({
    	     ios: 200,
    	      android: 0
        })}
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

  onSend(messages = []) {
     this.setState(previousState => ({
       messages: GiftedChat.append(previousState.messages, messages),
     }))
   }


   renderMessage(props) {
     const {
       currentMessage: { text: currText },
     } = props

     let messageTextStyle

     // Make "pure emoji" messages much bigger than plain text.
     if (currText && emojiUtils.isPureEmojiString(currText)) {
       messageTextStyle = {
         fontSize: 28,
         // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
         lineHeight: Platform.OS === 'android' ? 34 : 30,
       }
     }

     return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
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
