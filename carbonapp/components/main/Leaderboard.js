import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Leaderboard() {
  return (
    <View style = {{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/app-logo2.png')}
          style={styles.imageContainer}
         />
        <Text>Coming soon...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
  },
});

