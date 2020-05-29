import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import GridList from '../ui/GridList';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { addPlant, updatePlant, uploadPlant } from '../api/PlantsApi';
import GrowImagePicker from '../ui/GrowImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Bluefade from '../images/Bluefade.png'
import Camera from '../images/cameralogo.png'
import AddSymbol from '../images/Add.png'

const PlantForm = (props) => {

  setPlantImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
  //  <ImageBackground source={BackgroundGreenWhite} style={styles.backgroundContainer}>
    <KeyboardAwareScrollView>
    <ImageBackground source={Bluefade} style={styles.backgroundContainer}>
    <View style={styles.backgroundContainer}>
    <View style={styles.container}>
    <Text style={styles.headlines}>Add Plant</Text>
      <GrowImagePicker image={props.plant.image} onImagePicked={setPlantImage} />
      <TextInput
        value={props.values.name}
        style={styles.longFormInput}
        placeholder='Name'
        onChangeText={text => { props.setFieldValue('name', text) }}
      />
      <Text style={styles.validationText}> {props.errors.name}</Text>
      <TextInput
        value={props.values.species}
        style={styles.longFormInput}
        placeholder='Species'
        onChangeText={text => { props.setFieldValue('species', text) }}
      />
      <Text style={styles.validationText}> {props.errors.species}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.formInput}
          onChangeText={text => { props.setInformations(text) }}
          placeholder='Information'
        />

        <Button
          color="#2471a3"
          title="add"
          onPress={() => { props.submitInformations() }}/>

      </View>
      <GridList
        items={props.plant.informations} />
        <View style={styles.button}>
      <Button
        color= "#2471a3"
        title='Submit'
        onPress={() => props.handleSubmit()}
      />
      </View>
    </View>
    </View>
    </ImageBackground>
    </KeyboardAwareScrollView>
  //  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',


  },
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,

  },
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 100,

  },
  formInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: 'dashed',
    padding: 8,
    height: 110,
    color: 'black',
    width: '75%',
    marginBottom: 16,
    marginTop: 2,
    backgroundColor: '#f0fbf7'
  },
  validationText: {
    color: 'red'
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 8,
    margin: 16,
    backgroundColor: '#f0fbf7',
  },
  headlines: {
    color:'black',
    height: 50,
    fontSize: 30,
    position: 'relative',
    marginBottom: 25
  },
  camerabutton:{
    height: 50,
    width: 50,
    position:'absolute',
    bottom:0
},
button:{
  marginTop:10,
  position: 'relative',
  bottom: 20
}
});

export default withFormik({
  mapPropsToValues: ({ plant }) => ({
    name: plant.name,
    species: plant.species,
    imageUri: null
  }),
  enableReinitialize: true,
  validationSchema: (props) => yup.object().shape({
    name: yup.string().max(30).required(),
    species: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
    console.log(props);

    values.informations = props.plant.informations;

    console.log(values);

    if (props.plant.id) {
      values.id = props.plant.id;
      values.createdAt = props.plant.createdAt;
      values.image = props.plant.image;
      uploadPlant(values, props.onPlantUpdated, { updating: true });
    } else {
      uploadPlant(values, props.onPlantAdded, { updating: false });
    }
  },
})(PlantForm);
