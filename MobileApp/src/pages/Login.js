import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Button, Text} from 'react-native';
import t from 'tcomb-form-native';
import {Icon} from "react-native-elements";
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
      console.log('No account info set in memory !', error);
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

  handleSubmit = () => {
    this.setState({error: null});
    const value = this._form.getValue();

    if (value != null) {
      Api.login(value.login, value.password).then(() => {
        Account.setAccountInfo(value.login, value.password).then(() => {
          return this.props.navigation.navigate('Dashboard');
        }).catch(() => {
          this.setState({error: 'Cannot save credentials'});
        });
      }).catch(() => {
        this.setState({error: 'Login and password not match'});
      });
    } else {
      this.setState({error: 'Please fill the from'});
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.error}>
            {this.state && this.state.error}
          </Text>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    width: "100%",
    height: "100%",
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  form: {
    padding: 20,
  },
});
