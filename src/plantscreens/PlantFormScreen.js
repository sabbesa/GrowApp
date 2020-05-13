import React, { Component } from 'react';
import PlantForm from '../ui/PlantForm';

export default class PlantFormScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('plant') ? 'Edit Plant' : 'New Plant'
    }
  };

  state = {
    plant: {
      name: '',
      category: '',
      subIngredients: []
    },
    currentSubIngredient: null,
  }

  componentDidMount() {
    const currentPlant = this.props.navigation.getParam('plant');

    if (currentPlant) {
      this.setState(prevState => ({ plant: prevState.plant = currentPlant }))
    }
  }

  onPlantUpdated = (plant) => {
    console.log(plant);
    this.props.navigation.popToTop();
  }

  setCurrentSubIngredient = (text) => {
    this.setState(prevState => ({
      currentSubIngredient: prevState.currentSubIngredient = text
    }));
  }

  submitSubIngredients = () => {
    let ingredient = this.state.currentSubIngredient;

    if (ingredient && ingredient.length > 2) {
      this.setState(prevState => ({
        plant: { ...prevState.plant, subIngredients: [...prevState.plant.subIngredients, ingredient] },
      }))
    }
  }

  render() {
    return (
      <PlantForm
        setSubIngredients={this.setCurrentSubIngredient}
        submitSubIngredients={this.submitSubIngredients}
        plant={this.state.plant}
        onPlantAdded={this.props.navigation.getParam('plantAddedCallback')}
        onPlantUpdated={this.onPlantUpdated}
      />
    );
  }
}
