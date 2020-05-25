import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { getPlants, signout, userId } from '../api/PlantsApi';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class PlantList extends Component {
  static navigationOptions = ({ navigation }) => {

    onSignedOut = () => {
      navigation.navigate('Auth');
    }

    return {
      title: 'Plant List',
      headerRight: (
        <Button
          title='log out'
          onPress={() => signout(onSignedOut)} />
      )
    }
  };

  state = {
    plantList: [],
    selectedIndex: 0
  }

  onPlantAdded = (plant) => {
    this.setState(prevState => ({
      plantList: [...prevState.plantList, plant]
    }));
    this.props.navigation.popToTop();
  }

  onPlantDeleted = () => {

    var newPlantList = [...this.state.plantList];
    newPlantList.splice(this.state.selectedIndex, 1);

    this.setState(prevState => ({
      plantList: prevState.plantList = newPlantList
    }));

    this.props.navigation.popToTop();
  }

  onPlantsReceived = (plantList) => {
    this.setState(prevState => ({
      plantList: prevState.plantList = plantList
    }));
  }

  componentDidMount() {
    getPlants(this.onPlantsReceived);
  }

  showActionButton = () =>
    <ActionButton
      buttonColor="#b0dec4"
      onPress={() => this.props.navigation.navigate('PlantForm', { plantAddedCallback: this.onPlantAdded })}
    />

  render() {
    return this.state.plantList.length > 0 ?

      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.plantList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                containerStyle={styles.listItem}
                title={item.name}
                subtitle={`Species: ${item.species}`}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}
                leftAvatar={{
                  size: 'large',
                  rounded: false,
                  source: item.image && { uri: item.image }
                }}
                onPress={() => {
                  this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                  this.props.navigation.navigate('PlantDetail', { plant: item, plantDeletedCallback: this.onPlantDeleted })
                }
                }

              />
            );
          }
          }
        />
        {this.showActionButton()}
      </SafeAreaView> :


      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Plants found</Text>
        <Text style={styles.emptySubtitle}>Add a new plant using the + button below</Text>
        {this.showActionButton()}
      </View>

  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#f0fbf7'
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30
  },
  subtitleStyle: {
    fontSize: 18
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  }
});

export default PlantList;
