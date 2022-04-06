import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export class Register extends Component {
    // initializes components, first function to be called when creating a component
    constructor(props) { // init
        super(props); // inheriting from library?

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const app = getApp(); // retrieve default app
        const db = getFirestore(app); // establish connection with firestore database
        const auth = getAuth();
        const { email, password, name } = this.state; // cool javascript technique, use this instead of saying const email = this.state.email, password = this.state.password, etc.
        createUserWithEmailAndPassword(auth, email, password) //asynchronized
            .then((result) => { // when we get above response from firebase server, this function will be triggered
                try {
                    const docRef = setDoc(doc(db, "users", auth.currentUser.uid), { // set document for this user (named after userid) in collection "users"
                        name: name,
                        email: email,
                    });
                    console.log("Document written with ID: ", auth.currentUser.uid);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
                console.log(result) // response from firebase
            })
            .catch((error) => {
                console.log(error)
            })
        }

  // function taht is called anytime state component changes or loads 
  render() { 
    return (
        <View style = {{ flex:1, justifyContent: 'center' }}>
            <TextInput
                textAlign={'center'}
                style={{padding: 10}}
                placeholder='name'
                onChangeText={(name) => this.setState({ name })} // necessary to detect and store changes made to text input. name is text inside input, assigns name to variable called name
            />
            <TextInput
                textAlign={'center'}
                style={{padding: 10}}
                placeholder='email'
                onChangeText={(email) => this.setState({ email })} 
            />
            <TextInput
                textAlign={'center'}
                style={{padding: 10}}
                placeholder='passsword'
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })} 
            />
            <Button
                onPress={() => this.onSignUp()}
                title='Sign Up'
            />
        </View>
    )
  }
}

export default Register