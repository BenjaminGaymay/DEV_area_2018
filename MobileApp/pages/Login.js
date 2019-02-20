import React, { Component } from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import t from 'tcomb-form-native';
import {Icon} from "react-native-elements";

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
};

const options = {
  fields: {
    email: {
      error: 'Email pls'
    },
    username: {
      error: 'Email pls'
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

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
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
