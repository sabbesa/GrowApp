import React, { Component } from 'react';
import PlantForm from '../ui/PlantForm';
import firebase from '@react-native-firebase/app';
import Bluefade from '../images/Bluefade.png'


export default class PlantFormScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('plant') ? 'Edit Plant' : 'New Plant'
    }
  };

  state = {
    plant: {
      name: '',
      species: '',
      informations: '',
    },
  }

  componentDidMount() {
    const currentPlant = this.props.route.params.plant;

    if (currentPlant) {
      this.setState(prevState => ({ plant: prevState.plant = currentPlant }))
    }
  }

  onPlantUpdated = (plant) => {
    console.log(plant);
    this.props.navigation.popToTop();
  }



  render() {
    return (
      <PlantForm
        plant={this.state.plant}
        onPlantAdded={this.props.route.params.plantAddedCallback}
        onPlantUpdated={this.onPlantUpdated}
      />
    );
  }
}
