import React, {Component} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import {IMAGE} from './constants/Image'
import { signout } from './api/PlantsApi';


export class CustomDrawerContent extends Component {
  static navigationOptions = ({ navigation }) => {

    onSignedOut = () => {
      navigation.navigate('Auth');
    }

  };
    render() {
      onSignedOut = () => {
        this.props.navigation.navigate('LoginScreen');
      }
        return (
            <SafeAreaView style={{flex: 1}}>
            <View style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={IMAGE.ICON_PROFILE}
                style={{height: 120, width: 120, borderRadius:60}}
                />
            </View>
            <ScrollView style={{marginLeft: 5}}>
                <TouchableOpacity
                style={{marginTop: 20, marginLeft: 10}}
                onPress={() => this.props.navigation.navigate('MenuTab')}
                >
                <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{marginTop: 40, marginLeft: 10}}
                onPress={() => this.props.navigation.navigate('Main')}
                >
                <Text>Ask the expert</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{marginTop: 100, marginLeft: 10}}
                onPress={() => signout(onSignedOut)}
                >
                <Text>Sign out</Text>
                </TouchableOpacity>
            </ScrollView>


            </SafeAreaView>
        )
    }
}
