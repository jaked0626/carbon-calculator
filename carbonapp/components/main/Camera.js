import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image } from 'react-native';
import { Camera, CameraPreview } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

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
        const photoData = await camera.takePictureAsync({quality: 1,});
        setImage(photoData);
        setPreviewVisible(true);
      }
    } else {
      Alert.alert("Needs permission to use camera")
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null) { // || hasGalleryPermission === null
    return <View />;
  }
  if (hasCameraPermission === false) {// || hasGalleryPermission === false
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        ref={ref => setCamera(ref)} // assigns camera variable to the camera we are using
        > 
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back // if camera type is back, change to front, otherwise change to back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <MaterialCommunityIcons name = 'rotate-3d-variant' color = '#A3E4D7' size = {45} />
          </TouchableOpacity>
        </View>
        <View style = {styles.cameraButtonContainer}>
        <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => { takePicture();}}/>
          <Button
            style={styles.galleryButton}
            title='Gallery'
            onPress={() => { pickImage();}}/>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    top : 15,
    right: -15,
  },
  cameraButton: {
    //flex: 0.23,
    alignSelf: 'center',
    width: 90,
    height: 90,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#A3E4D7',
    shadowOpacity: 1,
    shadowRadius: 1,
    top: 80,
  },
  cameraButtonContainer: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  galleryButtonContainer: {
    flex:1, 
    flexDirection: 'row-reverse',
  },
  galleryButton: {
    alignSelf:'flex-end',
    justifyContent: 'flex-start'
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