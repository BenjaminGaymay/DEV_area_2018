import React, {Component} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import t from 'tcomb-form-native';
import {Icon} from "react-native-elements";
import * as env from '../../env'
import * as Api from '../services/Api'
import * as Account from "../services/Account"

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

export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    Account.getAccountInfo().then((credentials) => {
      if (credentials !== false) {
        console.log(credentials);
        return props.navigation.navigate('Dashboard');
      }
    }).catch(function (error) {
      console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
    });
  }

  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3C55B0'
    },
    title: "Login",
    headerRight:
      <View style={{marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
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
      Account.setAccountInfo(value.login, value.password).then(() => {
        return this.props.navigation.navigate('Dashboard');
      }).catch(() => {
        this.error = 'Error 1';
      });
    } else {
      this.error = 'Error 2';
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
