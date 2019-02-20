import React, {Component} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import t from 'tcomb-form-native';
import {Icon} from "react-native-elements";
import * as env from '../env'

const Form = t.form.Form;

const User = t.struct({
  login: t.String,
  password: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {marginBottom: 10},
  },
  controlLabel: {
    normal: {color: '#3C55B0', fontSize: 18, marginBottom: 7, fontWeight: '600'},
    error: {color: '#3C55B0', fontSize: 18, marginBottom: 7, fontWeight: '600'}
  }
};

const options = {
  fields: {
    login: {
      error: 'login pls'
    },
    password: {
      error: 'Password pls'
    },
  },
  stylesheet: formStyles,
};

export default class Login extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3C55B0'
    },
    title: "Login",
    headerRight:
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, color: 'white'}}
              onPress={() => {
                navigation.navigate('Register')
              }}>Register
        </Text>
        <Icon name="person" size={26} color="white"/>
      </View>,
  });

  error = '';

  handleSubmit = () => {
    const value = this._form.getValue();
    if (value != null) {

      fetch(env.API + "/login", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: value.login,
          password: value.password
        }),
      }).then(result => {
        //value.login
        //value.password
        // store ça sur appareil
        console.log('GOOD');
      }).catch(error => {
        console.log('BAD');
        console.log(error);
      });

      console.log('value: ', value);
      console.log('api: ', env.API);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={User}
          options={options}
        />
        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: "5%",
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
