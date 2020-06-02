import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';
import GridList from '../ui/GridList';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { addTask, updateTask, uploadTask } from '../taskapi/TasksApi';
import GrowImagePicker from '../ui/GrowImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BackgroundGreenWhite from '../images/BackgroundGreenWhite.png'
import Camera from '../images/cameralogo.png'
import AddSymbol from '../images/Add.png'


const TaskForm = (props) => {

  setTaskImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
  //  <ImageBackground source={BackgroundGreenWhite} style={styles.backgroundContainer}>
    <KeyboardAwareScrollView>
    <ImageBackground source={BackgroundGreenWhite} style={styles.backgroundContainer}>
    <View style={styles.backgroundContainer}>
    <View style={styles.container}>
    <Text style={styles.headlines}>Add Task</Text>
      <GrowImagePicker image={props.task.image} onImagePicked={setTaskImage} />
      <TextInput
        value={props.values.title}
        style={styles.longFormInput}
        placeholder='Title'
        onChangeText={text => { props.setFieldValue('title', text) }}
      />
      <Text style={styles.validationText}> {props.errors.title}</Text>
      <TextInput
        value={props.values.date}
        style={styles.longFormInput}
        placeholder='Finish date'
        onChangeText={text => { props.setFieldValue('date', text) }}
      />
      <Text style={styles.validationText}> {props.errors.date}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.formInput}
          onChangeText={text => { props.setDescriptions(text) }}
          placeholder='Tasks'
        />

        <Button
          color="#17a589"
          title="add"
          onPress={() => { props.submitDescriptions() }}/>

      </View>
      <GridList
        items={props.task.descriptions} />
        <View style={styles.button}>
      <Button
        color="#17a589"
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
    height: 50,
    color: 'black',
    width: '75%',
    marginBottom: 16,
    marginTop: 16,
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
    marginBottom: 25,
    //fontFamily: 'monospace'
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
  mapPropsToValues: ({ task }) => ({
    title: task.title,
    date: task.date,
    imageUri: null
  }),
  enableReinitialize: true,
  validationSchema: (props) => yup.object().shape({
    title: yup.string().max(30).required(),
    date: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
    console.log(props);

    values.descriptions = props.task.descriptions;

    console.log(values);

    if (props.task.id) {
      values.id = props.task.id;
      values.createdAt = props.task.createdAt;
      values.image = props.task.image;
      uploadTask(values, props.onTaskUpdated, { updating: true });
    } else {
      uploadTask(values, props.onTaskAdded, { updating: false });
    }
  },
})(TaskForm);
