/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, FlatList, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {CachedImage} from 'react-native-cached-image';
import * as Account from '../services/Account';
import * as Api from '../services/Api';
import * as Alert from "react-native";

type Props = {};
export default class Dashboard extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      account: null,
      index: 0,
      message: null,
      links: [],
      myLinks: [],
    };

    this.props.navigation.addListener(
      'willFocus', () => {
        this.refresh();
      });
  }

  findInLinks(id) {
    for (let item of this.state.links) {
      if (item.id === id) {
        return item;
      }
    }
    console.log("id: " + id + " not found !");
    return null;
  }

  refresh() {
    Account.getAccountInfo().then(async result => {
      this.setState({account: result});
      let links = await Api.getLinks(result.login, result.password);
      /*console.log(links);*/
      this.setState({links: links});
      let myLinks = [];
      let mySubscribes = await Api.getMyLinks(result.login, result.password);
      if (mySubscribes != null) {
        for (let data of mySubscribes) {
          let item = this.findInLinks(data.subscribe_id);
          if (item) {
            item.data = data;
            myLinks.push(item);
          }
        }
      }
      this.setState({myLinks: myLinks});
      this.props.navigation.setParams({isConnected: true});
    }).catch(() => {
      this.props.navigation.setParams({isConnected: false});
    });
    this.state.message = this.props.navigation.getParam('message');
  }

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C55B0'
      },
      title: "Dashboard",
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

  onSwip(index) {
    this.setState({index: index});
  }

  confirmDelete(item) {
    Alert.Alert.alert(
      'Delete confirmation',
      'Do you want remove this link form your account ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Remove', onPress: () => {
            Api.unsubscribe(this.state.account.login, this.state.account.password, item.data.id).then(result => {
              Api.getMyLinks(this.state.account.login, this.state.account.password).then(mySubscribes => {
                let myLinks = [];
                if (mySubscribes != null) {
                  for (let data of mySubscribes) {
                    let item = this.findInLinks(data.subscribe_id);
                    if (item) {
                      item.data = data;
                      myLinks.push(item);
                    }
                  }
                }
                this.setState({myLinks: myLinks});
              });
            }).catch(error => {
              console.log(error);
            });
          }
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.swiper}>
        <View style={styles.headerSwiper}>
          <TouchableHighlight style={[styles.headerSwiperButton, this.state.index === 0 ? styles.headerSwiperButtonActive : null]}
                              onPress={() => {
                                if (this.state.index > 0) {
                                  this.setState({index: 0});
                                  this.refs.swiper.scrollBy(-1);
                                }
                              }}>
            <Text style={{color: this.state.index === 0 ? 'white' : '#0095ff', fontSize: 20}}>
              All Links
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.headerSwiperButton, this.state.index === 1 ? styles.headerSwiperButtonActive : null]}
                              onPress={() => {
                                this.setState({index: 1});
                                this.refs.swiper.scrollBy(1);
                              }}>
            <Text style={{color: this.state.index === 1 ? 'white' : '#0095ff', fontSize: 20}}>
              Your Links
            </Text>
          </TouchableHighlight>
        </View>
        <Swiper removeClippedSubviews={false} ref={"swiper"} style={styles.wrapper}
                showsButtons={false} loop={false} showsPagination={false} onIndexChanged={this.onSwip.bind(this)}>
          <View>
            {this.state && this.state.message ? (<Text style={styles.message}>{this.state.message}</Text>) : null}
            {this.state && this.state.links ? (
              <FlatList data={this.state.links}
                        renderItem={({item}) =>
                          <View style={styles.shadow}>
                            <TouchableOpacity
                              onPress={() => {
                                this.props.navigation.navigate('LinkAction', {item: item, mod: "create"});
                              }}>
                              <View style={styles.item}>
                                <CachedImage style={{flex: 0.25, marginRight: 10, width: null, height: null, resizeMode: 'contain'}}
                                             source={{uri: item.url}}
                                />
                                <View style={styles.text}>
                                  <Text style={{color: "black", fontWeight: "bold", marginBottom: 10}}>{item.name}</Text>
                                  <Text>{item.description}</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
              />) : null}
          </View>
          <View>
            {this.state && this.state.message ? (<Text style={styles.message}>{this.state.message}</Text>) : null}
            {this.state && this.state.myLinks ? (
              <FlatList data={this.state.myLinks}
                        renderItem={({item}) =>
                          <View style={styles.shadow}>
                            <TouchableOpacity
                              onPress={() => {
                                this.props.navigation.navigate('LinkAction', {item: item, mod: "edit"});
                              }}>
                              <View style={styles.item}>
                                <CachedImage style={{flex: 0.25, marginRight: 10, width: null, height: null, resizeMode: 'contain'}}
                                             source={{uri: item.url}}
                                />
                                <View style={styles.text}>
                                  <Text style={{color: "black", fontWeight: "bold", marginBottom: 10}}>{item.name}</Text>
                                  <Text>{item.description}</Text>
                                </View>
                                <TouchableOpacity onPress={this.confirmDelete.bind(this, item)}>
                                  <Icon name="trash" type='font-awesome' size={26} color="red"/>
                                </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
              />) : null}
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
  },
  headerSwiperButtonActive: {
    backgroundColor: '#0095ff',
  },
  headerSwiperButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#0095ff',
    borderWidth: 2,
    width: "50%",
    flex: 1,
  },
  headerSwiper: {
    //height: "5%",
    width: "100%",
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  message: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#00cc00',
  },
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
