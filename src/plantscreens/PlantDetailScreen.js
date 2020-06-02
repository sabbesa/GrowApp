import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>

            <Image source={require('../images/back.png')} style = {styles.backbutton} />

          </TouchableOpacity>
        </View>
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
                'Can not be undone',
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
        <Text style={styles.speciesHeader}>Category:</Text>
        <Text style={styles.speciesText}>{plant.species}</Text>
        <Text style={styles.descriptionHeader}>Information: </Text>
        <Text style={styles.descriptionText}>  {plant.informations} </Text>

      </ImageBackground>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    //fontFamily:'monospace',
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
  speciesText: {
    fontSize: 16,
    //fontFamily:'monospace',
    marginBottom: 32,
    alignSelf: 'center',
    color: 'black'
  },
  speciesHeader: {
    fontSize: 18,
    fontWeight:'bold',
    //fontFamily:'monospace',
    marginBottom: '5%',
    alignSelf: 'center',
    color: 'black'
  },
  descriptionText: {
    //fontFamily:'monospace',
    fontStyle: 'italic',
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 32,
    color: 'black'
  },
  descriptionHeader: {
    //fontFamily:'monospace',
    alignSelf: 'center',
    fontWeight:'bold',
    fontSize: 18,
    marginBottom: 32,
    color: 'black'
  },
  descriptionItemText: {
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
  },
  backbutton:{
    marginTop: 20,
    height: 30,
    width: 30,

// <<<<<<< HEAD
// =======
//
//
//
//
// >>>>>>> 5e354655c97bc42588950a85b8b693a739751941
  }
});

export default PlantDetailScreen;


        //
        // <Text style={styles.descriptionText}>Information:</Text>
        // {
        //   plant.informations === undefined || plant.informations.length == 0 ?
        //     <Text style = {{alignSelf:'center'}}>None</Text> : <FlatList
        //   horizontal={true}
        //     data={plant.informations}
        //     contentContainerStyle={styles.listContainer}
        //       ItemSeparatorComponent={() =>
        //         <Divider style={{ backgroundColor: 'black' }} />}
        //       scrollEnabled={true}
        //       keyExtractor={(item, index) => index.toString()}
        //       renderItem={({ item }) =>
        //         <Text style={styles.descriptionItemText}>{item}</Text>
        //       }
        //     />
        // }
