import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Icon} from "react-native-elements";

export default class Register extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3C55B0'
    },
    title: "Register",
  });
  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}