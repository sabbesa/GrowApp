import React, { Component } from 'react';
import PlantForm from '../ui/PlantForm';
import firebase from '@react-native-firebase/app';


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
      informations: [],
    },
    currentInformation: null,
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

  setCurrentInformation = (text) => {
    this.setState(prevState => ({
      currentInformation: prevState.currentInformation = text
    }));
  }

  submitInformations = () => {
    let information = this.state.currentInformation;

    if (information && information.length > 2) {
      this.setState(prevState => ({
        plant: { ...prevState.plant, informations: [...prevState.plant.informations, information] },
      }))
    }
  }

  render() {
    return (
      <PlantForm
        setInformations={this.setCurrentInformation}
        submitInformations={this.submitInformations}
        plant={this.state.plant}
        onPlantAdded={this.props.route.params.plantAddedCallback}
        onPlantUpdated={this.onPlantUpdated}
      />
    );
  }
}
