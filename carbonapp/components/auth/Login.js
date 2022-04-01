import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export class Login extends Component {
    // initializes components, first function to be called when creating a component
    constructor(props) { // init
        super(props); // inheriting from library?

        this.state = {
            email: '',
            password: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const auth = getAuth();
        const { email, password } = this.state; // cool javascript technique, use this instead of saying const email = this.state.email, password = this.state.password, etc.
        signInWithEmailAndPassword(auth, email, password) //asynchronized
            .then((result) => { // when we get above response from firebase server, this function will be triggered
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
                title='Sign In'
            />
        </View>
    )
  }
}

export default Login