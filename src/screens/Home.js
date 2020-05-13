import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class Home extends Component {
	render() {
		return (
			<View>
      <View style={{marginTop:120}}>

				<Text>Home Screen</Text>
				<Button
					title="Add an Item"
					onPress={() => this.props.navigation.navigate('AddPlant')}
				/>
				<Button
					title="List of Items"
					color="green"
					onPress={() => this.props.navigation.navigate('List')}
				/>
        </View>

			</View>
		);
	}
}
