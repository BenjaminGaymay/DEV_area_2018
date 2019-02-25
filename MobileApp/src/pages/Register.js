import React, {Component} from 'react';
import {TouchableHighlight, Modal, ScrollView, View, StyleSheet, Button, Text} from 'react-native';
import t from 'tcomb-form-native';
import {Icon} from "react-native-elements";
import * as env from '../../env'
import * as Api from '../services/Api'
import * as Account from "../services/Account"

const Form = t.form.Form;

const User = t.struct({
  login: t.String,
  email: t.String,
  password: t.String,
  'Repeat Password': t.String
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
    email: {
      error: 'email pls'
    },
    password: {
      error: 'Password pls'
    },
    'Repeat Password': {
      error: 'Repeat Password pls'
    },
  },
  stylesheet: formStyles,
};

export default class Register extends Component<Props> {
  state = {
    error: null,
    modalVisible: false,
  };

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
    title: "Register",
    headerRight: null
  });

  handleSubmit = () => {
    this.setState({error: null});
    const value = this._form.getValue();

    if (value != null) {
      Api.register(value.login, value.email, value.password).then(() => {
        this.setState({modalVisible: true});
      }).catch(() => {
        this.setState({error: 'Login and password not match'});
      });
    } else {
      this.setState({error: 'Please fill the from'});
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Modal animationType="slide"
               transparent={false}
               visible={this.state.modalVisible}
               onRequestClose={() => {
                 console.log('Modal has been closed.');
               }}>
          <View style={styles.modal}>
            <Text style={{fontSize: 20, marginBottom: 10}}>Complete your inscription by email !</Text>
            <TouchableHighlight
              style={{backgroundColor: '#44d613', borderRadius: 5, padding: 10}}
              onPress={() => {
                this.setState({modalVisible: false}, () => {
                  this.props.navigation.navigate("Login");
                });
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </Modal>
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
