/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Account from '../services/Account'

type Props = {};
export default class Logout extends Component<Props> {
  constructor(props) {
    super(props);

    Account.resetAccount().then(result => {
      return props.navigation.navigate('Home');
    });
  }

  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3C55B0'
    },
    title: "Area",
    headerRight:
      <View style={{marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, color: 'white'}}
              onPress={() => {
                navigation.navigate('Home')
              }}>Home
        </Text>
        <Icon name="person" size={26} color="white"/>
      </View>,
  });

  render() {
    return (
      <View style={styles.page}>
        <ScrollView style={styles.container}>
          <Text>Waiting to logout...</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: "100%",
    height: "100%",
  },
});
