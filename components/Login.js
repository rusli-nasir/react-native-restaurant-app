import React, { Component } from 'react';
import {View, Button, StyleSheet } from 'react-native';
import { Icon, Input, CheckBox, Input } from 'react-native-elements';
import { SecureStore } from 'expo';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernname: '',
            password: '',
            remember: false,
        }
    }

    componentDidMount() {
        // get items from SecureStore => returns a promise
        SecureStore.getItemAsync('userinfo') // userinfo is the key
            .then((userdata) => {
                let userinfo = JSON.parse(userdata)
                if (userinfo) {
                    this.setState({ username: userinfo.username, password: userinfo.password, remember: true})
                }
            })
    }

    static navigationOptions = {
        title: 'Login'
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        // Save data into the SecureStore
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password })
            )
            .catch((error) => console.log('Could not save user data', error))
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user data', error))
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput} /* Input styling */
                    />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput} /* Input styling */
                    />
                <CheckBox 
                        title='Remeber Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember })}
                    />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color='#512A8'
                        />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }    
})
export default Login;