/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
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
  header: {
    height: 10,
  },
  page: {
    flex: 1,
  },
  /*  backgroundImage: {
      flex: 1,
      width: "100%",
      height: "100%",
      resizeMode: "cover"
    },*/
  container: {
    flex: 1,
    flexDirection: 'column',
    width: "100%",
    height: "100%",
  },
  item: {
    flexDirection: 'row',
    //backgroundColor: "red",
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
  },
  itemImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    margin: 10,
    /*width: "20%",
    height: "20%"*/
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {},
});
