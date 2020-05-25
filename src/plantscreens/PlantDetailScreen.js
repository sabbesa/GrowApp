import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  ImageBackground
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { deletePlant } from '../api/PlantsApi'
import Bluefade from '../images/Bluefade.png'

class PlantDetailScreen extends Component {

  static navigationOptions = () => {
    return {
      title: 'Plant Details'
    }
  };

  render() {
    const plant = this.props.route.params.plant;

    const onPlantDeleted = this.props.route.params.plantDeletedCallback;

    console.log(plant);
    return (

      <View style={styles.container}>
      <ImageBackground source={Bluefade} style={styles.backgroundContainer}>
        <View style={styles.row}>
          <Icon
            reverse
            name='ios-create'
            type='ionicon'
            onPress={() =>
              this.props.navigation.navigate('PlantForm', {
                plant: plant
              })
            }
          />
          <Icon
            reverse
            name='ios-trash'
            type='ionicon'
            color='#CA300E'
            onPress={() =>
              Alert.alert(
                'Delete?',
                'Cannot be undone',
                [
                  { text: 'Cancel' },
                  { text: 'OK', onPress: () => { deletePlant(plant, onPlantDeleted) } }
                ],
                { cancelable: false },
              )
            }
          />
        </View>
        <Image style={styles.image} source={plant.image && { uri: plant.image }} />
        <Text style={styles.headerText}>{plant.name}</Text>
        <Text style={styles.categoryText}>Category: {plant.category}</Text>

        <Text style={styles.ingredientText}>Keywords: </Text>
        {
          plant.keywords === undefined || plant.keywords.length == 0 ?
            <Text style = {{alignSelf:'center'}}>None</Text> : <FlatList
          horizontal={true}
            data={plant.keywords}
            contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() =>
                <Divider style={{ backgroundColor: 'black' }} />}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <Text style={styles.ingredientItemText}>{item}</Text>
              }
            />
        }
        </ImageBackground>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    fontSize: 32,
    fontFamily:'monospace',
    marginBottom: 32,
    color: 'black'
  },
  backgroundContainer: {
        width:'100%',
        height:'100%',
      },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  categoryText: {
    fontSize: 20,
    fontFamily:'monospace',
    marginBottom: 32,
    alignSelf: 'center',
    color: 'black'
  },
  ingredientText: {
  fontFamily:'monospace',
    fontStyle: 'italic',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 32,
    color: 'black'
  },
  ingredientItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16,
    color:'black',
    padding: 20
  },
  container: {
    alignItems: 'center',
    backgroundColor:'#d9f7e6'
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey',




  }
});

export default PlantDetailScreen;
