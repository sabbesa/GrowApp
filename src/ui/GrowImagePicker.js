import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const GrowImagePicker = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (image) {
      console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image])

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
      response => {
        if (response.error) {
          console.log("image error");
        } else {
          console.log("Image: " + response.uri)
          setSelectedImage({ uri: response.uri });
          onImagePicked({ uri: response.uri });
        }
      }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={this.pickImageHandler}>

          <Image source={require('../images/cameralogo.png')} style = {styles.camerabutton} />

        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    position: 'absolute',
    bottom: 0, right: 35
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
    camerabutton:{
      height: 50,
      width: 50,

  }

})

export default GrowImagePicker;
