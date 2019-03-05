/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image, ScrollView, Button, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Account from '../services/Account';
import * as Api from '../services/Api';
import * as Alert from "react-native";


type Props = {};
export default class Home extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      text: null,
      url: null,
    };

    this.props.navigation.addListener(
      'willFocus', () => {
        this.refresh();
      })
  }

  refresh() {
    Account.getApiUrl().then(result => {
      console.log(result);
      this.setState({url: result});
    });
    Account.getAccountInfo().then(() => {
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
          <Text style={{fontSize: 18, color: 'white'}}
                onPress={() => {
                  navigation.navigate(params && params.isConnected ? 'Dashboard' : 'Login');
                }}>{params && params.isConnected ? 'Dashboard' : 'Login'}
          </Text>
          <Icon name={params && params.isConnected ? 'home' : 'person'} size={26} color="white"/>
        </View>
    }
  };

  onSubmitEdit() {
    Account.getApiUrl().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
    Api.ping(this.state.text).then(result => {
      Alert.Alert.alert(
        'Server changed !',
        'Ping found a server\n :)',
        [{
          text: 'Ok',
          onPress: () => {
            Account.setApiUrl(this.state.text).then();
          },
          style: 'cancel'
        },],
        {cancelable: false},
      );
    }).catch(error => {
      Alert.Alert.alert(
        'Server not found !',
        'Ping request failed',
        [{text: 'Ok', style: 'cancel'},],
        {cancelable: false},
      );
    });
    console.log(this.state.text);
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView style={styles.container}>
          <View style={styles.item}>
            <Image source={require('../../assets/images/Home.png')}
                   style={styles.itemImage}/>
            <View style={styles.text}>
              <Text style={styles.title}>AREA : A world that works for you</Text>
              <Text style={styles.description}>AREA is the free way to get all your apps and devices talking to each other. Not everything on the internet plays nice, so we're on a mission to build a more connected world.</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.text}>
              <Text style={styles.title}>Clash-Royale : The game in the future</Text>
              <Text style={styles.description}>We’ll show you some of our favorite pairings. Just turn on what you like and we’ll make it happen for you.</Text>
            </View>
            <Image source={require('../../assets/images/clash-royale.png')}
                   style={styles.itemImage}/>
          </View>
          <View style={styles.item}>
            <Image source={require('../../assets/images/reddit.png')}
                   style={styles.itemImage}/>
            <View style={styles.text}>
              <Text style={styles.title}>Reddit : share what you think</Text>
              <Text style={styles.description}>AREA is the free way to get all your apps and devices talking to each other. Not everything on the internet plays nice, so we're on a mission to build a more connected world.</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.text}>
              <Text style={styles.title}>Github : Share your work</Text>
              <Text style={styles.description}>AREA is the free way to get all your apps and devices talking to each other. Not everything on the internet plays nice, so we're on a mission to build a more connected world.</Text>
            </View>
            <Image source={require('../../assets/images/Github.png')}
                   style={styles.itemImage}/>
          </View>
          <View style={styles.item}>
            <Image source={require('../../assets/images/lol.png')}
                   style={styles.itemImage}/>
            <View style={styles.text}>
              <Text style={styles.title}>Lol : The MOBA game</Text>
              <Text style={styles.description}>League of Legends (lol) is probably the most famous moba game all over the world.</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.text}>
              <Text style={styles.title}>Imdb : The best internet movie database</Text>
              <Text style={styles.description}>IMDB is a movie internet database that deals with the cinema, the television and video games.</Text>
            </View>
            <Image source={require('../../assets/images/imdb.png')}
                   style={styles.itemImage}/>
          </View>
          <View style={[{marginBottom: 10, marginLeft: 15, marginRight: 15}, styles.textButton]}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
              <Text style={{width: "60%"}}>
                Replace default server url :
              </Text>
              <TextInput style={{width: "40%", height: 80}}
                         placeholder={this.state.url}
                         onChangeText={(text) => this.setState({text: text})}
                         onSubmitEditing={this.onSubmitEdit.bind(this)}/>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Button
                title="Submit"
                onPress={this.onSubmitEdit.bind(this)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textButton: {
    flex: 1,
    //alignItems: 'center',
    borderWidth: 1,
  },
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
