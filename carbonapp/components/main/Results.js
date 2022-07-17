import React, { useState } from 'react';
import {
  Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import { CLARIFAI_API_KEY } from '@env';
import { manipulateAsync } from 'expo-image-manipulator';
import BouncyCheckbox from "react-native-bouncy-checkbox";
// @ts-ignore
const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
 apiKey: CLARIFAI_API_KEY
});

console.log(clarifai);

process.nextTick = setImmediate;
 
export default function Results(props) {

  const [score, setScore] = useState(false);
  const [image, setImage] = useState(props.route.params.image); //base64
  const [predictions, setPredictions] = useState(null);

  console.log(image.uri)
  
  const predict = clarifai.models.predict(Clarifai.FOOD_MODEL, 
                  {base64: image.base64 },
                  { maxConcepts: 10, minValue: 0.4 })
    .then((response) => setPredictions(response.outputs[0].data.concepts)
    .catch((err) => alert(err))
    );

  const toggleScore = async () => {
    var tempScore = Math.floor(Math.random() * 10) / 2 + 1;
    setScore(tempScore);
  }

  const messages = ["You can do better!", "Not great", "Not bad", "Good job!!", "Excellent!!!"]

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.headerText}>{score ? `Your Meal Score is ${score}` : "Analyzing Your Meal..."}</Text>
          <Text style={styles.headerText}>{score ? messages[score - 1] : ""}</Text>
          <TouchableOpacity
            style={styles.imageWrapper}
          >
            {image && (
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    zIndex: 0,
                    elevation: 0,
                  }}
                >
                  <Image
                    source={{uri: `${image.uri}`}}
                    style={styles.imageContainer}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.predictionWrapper}>
            {image && (
              <Text style={styles.text}>
                {predictions ? 'Select Food Item or Ingredients:' : 'Predicting Food Item...'}
              </Text>
            )}
            {predictions &&
              predictions?.length &&
              console.log("=== Detect foods predictions: ===")}

            {predictions &&
              predictions.map(
                (p, index) => {
                  console.log(`${index} ${p.name}: ${p.value}`);
                  return (
                    <BouncyCheckbox
                      key={index}
                      style={styles.text}
                      text={p.name}
                      textStyle={{
                        textDecorationLine: "none",
                      }}
                      onPress={(isChecked) => {}}/>
                  );
                }
              )}
          </View>
          {predictions && (
          <Button
            title="Calculate Score!"
            onPress={() => toggleScore()}
          />)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  headerText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  imageWrapper: {
    width: 300,
    height: 300,
    borderColor: "#66c8cf",
    borderWidth: 3,
    borderStyle: "dashed",
    marginTop: 40,
    marginBottom: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 280,
    height: 280,
  },
  predictionWrapper: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  transparentText: {
    opacity: 0.8,
  },
});

