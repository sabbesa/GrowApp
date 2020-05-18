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
      keywords: []
    },
    currentKeyword: null,
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

  setCurrentKeyword = (text) => {
    this.setState(prevState => ({
      currentKeyword: prevState.currentKeyword = text
    }));
  }

  submitKeywords = () => {
    let keyword = this.state.currentKeyword;

    if (keyword && keyword.length > 2) {
      this.setState(prevState => ({
        plant: { ...prevState.plant, keywords: [...prevState.plant.keywords, keyword] },
      }))
    }
  }

  render() {
    return (
      <PlantForm
        setKeywords={this.setCurrentKeyword}
        submitKeywords={this.submitKeywords}
        plant={this.state.plant}
        onPlantAdded={this.props.route.params.plantAddedCallback}
        onPlantUpdated={this.onPlantUpdated}
      />
    );
  }
}
