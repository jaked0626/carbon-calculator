import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { CLARIFAI_API_KEY } from '@env';
import { manipulateAsync } from 'expo-image-manipulator';

// @ts-ignore
const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
 apiKey: CLARIFAI_API_KEY
});

process.nextTick = setImmediate;
 
export default function Results(props) {
  console.log(props.route.params.image);
  const [image, setImage] = useState(props.route.params.image); //base64
  const [predictions, setPredictions] = useState(null);

  // const prepareImage = async () => {
  //   const manipulatedImage = await manipulateAsync(
  //     image,
  //     [{ resize: { height: 300, width: 300 } }],
  //     { base64: true }
  //   );
  //   setImage(manipulatedImage.base64);
  // };
  
  //console.log(image);

  // predict = async image => {
  //   let predictions = await clarifai.models.predict(
  //     Clarifai.GENERAL_MODEL,
  //     image
  //   );
  //   return predictions;
  // };
  // objectDetection = async () => {
  //   let photo = await this.capturePhoto();
  //   let resized = await this.resize(photo);
  //   let predictions = await this.predict(resized);
  //   this.setState({ predictions: predictions.outputs[0].data.concepts });
  // };
  return (
    <Text>Results</Text>
  )
}

