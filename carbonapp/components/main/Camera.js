import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image } from 'react-native';
import { Camera, CameraPreview } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      // no need for image picker permission
      // const { galleryStatus } = await ImagePicker.requestCameraRollPermissionsAsync();
      // setHasGalleryPermission(status === 'granted');

    })();
  }, []);

  const takePicture = async () => {
    if (hasCameraPermission) {
      if (camera) { // if camera cannot be found, don't take picture. 
        const photoData = await camera.takePictureAsync({quality: 1, base64: true});
        // async, setImage runs before camera.takepicture
        const imageSource = photoData;
        if (imageSource) {
          navigation.navigate('Results', { image: imageSource });
        }
      }
    } else {
      Alert.alert("Needs permission to use camera");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    //console.log(result);

    if (!result.cancelled) {
      const imageSource = result;
      navigation.navigate('Results', { image: imageSource });
    }
  };

  if (hasCameraPermission === null) { // || hasGalleryPermission === null
    return <View />;
  }
  if (hasCameraPermission === false) {// || hasGalleryPermission === false
    return <Text>No access to camera</Text>;
  }
  return (
      <Camera 
        style={styles.camera} 
        type={type}
        ref={ref => setCamera(ref)} // assigns camera variable to the camera we are using
        > 
        <View style = {styles.ButtonsContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back // if camera type is back, change to front, otherwise change to back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
          }}>
            <MaterialCommunityIcons name = 'rotate-3d-variant' color = '#A3E4D7' size = {45} />
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => { takePicture();}}/>
          <TouchableOpacity
            style={styles.galleryButton}
            title="Gallery"
            onPress={() => { pickImage();}}>
            <Entypo name = 'image' color = '#A3E4D7' size = {45} />
          </TouchableOpacity>

        </View>
      </Camera>
  );
}

const styles = StyleSheet.create({ 
  camera: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  ButtonsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  flipButton: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    //justifyContent: 'flex-end',
    //alignSelf: 'flex-start',
  },
  cameraButton: {
    alignSelf: 'center',
    width: 90,
    height: 90,
    bottom: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#A3E4D7',
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  galleryButton: {
    position: 'absolute', 
    right: 30,
    bottom: 50,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: -15,
    marginTop: 10,
    color: 'white',
  },
  image: {
    flex: 1,
  },
 }); 