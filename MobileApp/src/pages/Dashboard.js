/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image, ScrollView, Button, ListView} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import * as Account from '../services/Account';
import * as Api from '../services/Api';

type Props = {};
export default class Dashboard extends Component<Props> {

  state: {
    links: [];
  };

  constructor(props) {
    super(props);

    Account.getAccountInfo().then(async result => {
      let links = await Api.getLinks(result.login, result.password);
      /*console.log(links);*/
      this.setState({links: links});
      this.props.navigation.setParams({isConnected: true});
    }).catch(() => {
      this.props.navigation.setParams({isConnected: false});
    });
  }

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C55B0'
      },
      title: "Area",
      headerLeft: null,
      gesturesEnabled: false,
      headerRight:
        <View style={{marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: 20, fontSize: 18, color: 'white'}}
                onPress={() => {
                  navigation.navigate('Home')
                }}>Home
          </Text>
          <Text style={{fontSize: 18, color: 'white'}}
                onPress={() => {
                  navigation.navigate(params && params.isConnected ? 'Logout' : 'Login');
                }}>{params && params.isConnected ? 'Logout' : 'Login'}
          </Text>
          <Icon name="person" size={26} color="white"/>
        </View>
    }
  };

  render() {
    return (
      <View style={styles.page}>
        {this.state && this.state.links ? (
          <FlatList data={this.state.links}
                    renderItem={({item}) =>
                      <View style={[styles.shadow, styles.item]}>
                        <Image style={{flex: 0.25, width: null, height: null, resizeMode: 'contain'}}
                               source={require('../../assets/images/smallTest.png')}
                        />
                        <View style={styles.text}>
                          <Text style={{fontWeight: "bold", marginBottom: 10}}>{item.name}</Text>
                          <Text>{item.description}</Text>
                        </View>
                      </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
          />) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  shadow: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  }
});
