/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.socket = io('http://192.168.0.109:3000');
    this.socket.on("chat-message", msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  submitChatMessage() {
    this.socket.emit('chat-message', this.state.chatMessage);
    this.setState({
      chatMessage: '',
    });
  }
  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => {
     return(<Text key={chatMessage}>{chatMessage}</Text>) 
    });
    return (
      <SafeAreaView style={styles.backgroundStyle}>
        <TextInput
          style={{height: 40, borderWidth: 1, borderBottomColor: 'black'}}
          autoCorrect={false}
          onSubmitEditing={() => {
            this.submitChatMessage();
          }}
          value={this.state.chatMessage}
          onChangeText={txt => {
            this.setState({chatMessage: txt});
          }}
        />
        {chatMessages}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
