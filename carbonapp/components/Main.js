// file that is called after Landing, Login, and Register
// import react and react elements
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// load page content
import Tabs from './main/Tabs';

// load redux libraries
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';



export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser(); // calls actions/index.js which calls dispatch(reducers) which updates user states 
        // must fetch user data and accompanying data every login
    }
    render() {
        const { currentUser } = this.props; // redux calls current user info, fetched earlier
        //console.log(currentUser);

        if (currentUser == undefined) {
            return(<View style = {{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text textAlign={'center'}>Fetching User Info...</Text>
                   </View>) 
        }

        return (<Tabs />)
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);