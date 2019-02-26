/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image, StatusBar, ScrollView, TouchableOpacity} from 'react-native';

/*const description = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

/*class BackgroundImage extends Component {

  render() {
    return (
      <ImageBackground source={require('./assets/images/background.jpg')}
                       style={styles.backgroundImage}>
        {this.props.children}
      </ImageBackground>
    )
  }
}*/

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.bar}>
          <Text style={styles.barText}>AREA</Text>
        </View>
        <View style={styles.item}>
          <Image source={require('./assets/images/Home.png')}
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
          <Image source={require('./assets/images/clash-royale.png')}
                 style={styles.itemImage}/>
        </View>
        <View style={styles.item}>
          <Image source={require('./assets/images/reddit.png')}
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
          <Image source={require('./assets/images/Github.png')}
                 style={styles.itemImage}/>
        </View>
        <View style={styles.item}>
          <Image source={require('./assets/images/lol.png')}
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
          <Image source={require('./assets/images/imdb.png')}
                 style={styles.itemImage}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#3f51b5",
    width: "100%",
    height: 50,
    marginBottom: 20,
  },
  barText: {
    marginTop: 10,
    marginLeft: 10,
    color: "white",
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
    backgroundColor: "white",
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
