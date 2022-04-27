import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image } from 'react-native';
import { Camera, CameraPreview } from 'expo-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      if (camera) { // if camera cannot be found, don't take picture. 
        const photoData = await camera.takePictureAsync({quality: 1,});
        setImage(photoData);
        setPreviewVisible(true);
      }
    } else {
      Alert.alert("Needs permission to use camera")
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
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
    alignItems: 'center',
    justifyContent: 'flex-start',
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