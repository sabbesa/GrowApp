import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Image} from 'react-native'
import firebase from '@react-native-firebase/app'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function AddPlant() {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>Search!</Text>
    </View>
  );
}
