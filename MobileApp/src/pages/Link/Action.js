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
import * as Account from '../../services/Account'
import * as Api from "../../services/Api";

type Props = {};
export default class LinkAction extends Component<Props> {
  constructor(props) {
    super(props);

    Account.getAccountInfo().then(async result => {
      //this.setState({links: links});
      //this.props.navigation.setParams({isConnected: true});
    }).catch(() => {
      return this.props.navigation.navigate('Logins');
    });
    console.log(this.props.navigation.getParam('item'));
  }

  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3C55B0'
    },
    title: "Action",
    headerRight: null,
  });

  render() {
    return (
      <View style={styles.page}>
        <ScrollView style={styles.container}>
          <Text>coucou</Text>
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
