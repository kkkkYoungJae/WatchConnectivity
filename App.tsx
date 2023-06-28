import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {sendMessage, watchEvents} from 'react-native-watch-connectivity';

const App = () => {
  const [messageFromWatch, setMessageFromWatch] = useState('Waiting...');
  const [message, setMessage] = useState('');

  const messageListener = () =>
    watchEvents.on('message', (message: any) => {
      setMessageFromWatch(message.watchMessage);
    });

  useEffect(() => {
    messageListener();
  }, []);

  return (
    <SafeAreaView>
      <Text>Received from Watch App!</Text>
      <Text>{messageFromWatch}</Text>
      <Text>Send to Watch App!</Text>
      <TextInput placeholder="Message" onChangeText={setMessage}>
        {message}
      </TextInput>

      <TouchableOpacity
        onPress={() =>
          sendMessage(
            {messageFromApp: message},
            reply => {
              console.log(reply);
            },
            error => {
              if (error) {
                Alert.alert(
                  "The message can't be sent! The watchOS application is probably not running in the foreground! 🤔",
                );
              }
            },
          )
        }>
        <Text>SEND!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
