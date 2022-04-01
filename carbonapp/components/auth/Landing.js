import * as React from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Landing({ navigation }) {
  return (
    <View style = {{ flex:1, justifyContent: 'center' }}>
        <Button 
            title="Register"
            onPress={() => navigation.navigate('Register')}/>
        <Button 
            title="Login"
            onPress={() => navigation.navigate('Login')}/>
    </View>  
  )
}
