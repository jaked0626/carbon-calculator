// import tab navigator 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
// import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
// load components in main/
import FeedScreen from './Feed.js';
import GraphScreen from './Graph.js';
import ProfileScreen from './Profile.js';
import ScoreboardScreen from './Scoreboard.js';
// camera is not imported as it is a different screen

// create bottom navigation tab
const Tab = createBottomTabNavigator();

// create custom camera button 
const CustomCameraButton = ({ children, onPress }) => (
    <TouchableOpacity 
    style = {{
        top : -10,
        justifyContent: 'center', 
        alignItems: 'center',
    }}
    onPress = { onPress }
    >
        <View style = {{
            width: 70, 
            height: 70,
            borderRadius: 35,
            backgroundColor: '#A3E4D7',
        }}>
            { children }
        </View>
    </TouchableOpacity>
);

 // placeholder component for camera
const EmptyScreen = () => {
    return(null);
}

const Tabs = () => {
    return(
        <Tab.Navigator
            initialRouteName='Graph'
            labeled = { false }
            screenOptions={{
                tabBarShowLabel : false,
                tabBarActiveTintColor : '#A3E4D7',
                tabBarInactiveTintColor: 'white',
                tabBarActiveBackgroundColor: "#808B96",
                tabBarInactiveBackgroundColor: '#808B96',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: "#808B96",
                    height: 80,
                }
            }}>
            <Tab.Screen name="Feed" component={FeedScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name = 'picture' color = { color } size = { 22 } />
                    )
            }} />
            <Tab.Screen name="Graph" component={GraphScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name = 'line-graph' color = { color } size = { 25 } />
                    )
            }} />
            <Tab.Screen name="CameraContainer" component={EmptyScreen}
                listeners = {({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Camera")
                    }
                })}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name = 'camera' color = { color } size = { 33 }/>
                    ),
                    tabBarButton: ( props ) => (
                        <CustomCameraButton {...props} />
                    )
            }} />
            <Tab.Screen name="Scoreboard" component={ScoreboardScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name = 'medal' color = { color } size = { 24 } />
                    )
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name = 'person-circle' color = { color } size = { 29 } />
                    )
            }} />
        </Tab.Navigator>
    );
}

export default Tabs;