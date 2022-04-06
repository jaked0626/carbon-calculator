import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-O5ZeiXbDwa1R7PvxH2i7n4kTBiyvqEY",
  authDomain: "instagram-dev-7bef4.firebaseapp.com",
  projectId: "instagram-dev-7bef4",
  storageBucket: "instagram-dev-7bef4.appspot.com",
  messagingSenderId: "794461030327",
  appId: "1:794461030327:web:a8ce8437fe81882c024a32",
  measurementId: "G-6M80D09W4M"
};

// initialize app (make sure no firebase app is running or else app will crash)
if (getApps().length == 0) {
  initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // stack navigation

import LandingScreen from './components/auth/Landing.js'
import RegisterScreen from './components/auth/Register.js'
import LoginScreen from './components/auth/Login.js'
import MainScreen from './components/Main.js'
import CameraScreen from './components/main/Camera.js';

const Stack = createStackNavigator();

// import and setup Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export class App extends Component {
  constructor(props){ //init
    super(props); // used to access props inside constructor
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){ // called when components mount and will render next. 
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => { // adds an observer for changes to user signin. shows loading screen. 
      if (user) { // if user exists
        this.setState({
          loggedIn: true,
          loaded: true,
        }) // we can navigate to page
      } else {
        this.setState({
          loggedIn: false,
          loaded: true,
        }) // user does not exist
      }
    }) 
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) { // display interim page until user is loaded (overrides following return)
      return(
        <View style = {{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
          <Text textAlign={'center'}>Loading...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      // wrap with provider to enable redux
      <Provider store = {store}>
        <NavigationContainer>
          <Stack.Navigator 
          intialRouteName='Main'
          screenOptions = {{
            cardStyle : { backgroundColor: 'white' }
          }}
          >
            <Stack.Screen name='Back' component={ MainScreen } options = {{ headerShown: false }} />
            <Stack.Screen name='Camera' component={ CameraScreen } options = {{ headerShown: true }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App
