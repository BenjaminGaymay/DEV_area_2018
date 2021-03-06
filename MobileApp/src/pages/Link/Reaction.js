/**
 * @flow
 */

import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native'
import {Text} from "react-native-elements";
import t from 'tcomb-form-native';
import * as Account from "../../services/Account";
import * as Api from "../../services/Api";

const Form = t.form.Form;
type Props = { navigation: Object };
export default class LinkReaction extends Component<Props, State> {
  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3C55B0'
    },
    title: "Reaction",
    headerRight: null
  });

  formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {marginBottom: 10},
    },
    controlLabel: {
      normal: {color: '#3C55B0', fontSize: 18, marginBottom: 7, fontWeight: '600'},
      error: {color: '#3C55B0', fontSize: 18, marginBottom: 7, fontWeight: '600'}
    }
  };

  generateType(part) {
    let type = {};
    for (let index in part.config) {
      if (part.config[index].type === "array") {
        this.state.banned.push({[index]: null});
        this.state.error = 'Certain champs sont indisponibles sur mobile';
      } else {
        type[index] = t.String;
      }
    }
    return t.struct(type);
  }

  generateOptions(part) {
    let options = {fields: {}, stylesheet: this.formStyles,};
    for (let index in part.config) {
      let item = part.config[index];
      if (item.type === "checkbox") {
        let values = part.config[index].values;
        let valuesFormat = [];
        for (let val of values) {
          let text = val === '' ? 'All' : val;
          valuesFormat.push({value: val, text: text});
        }
        options.fields[index] = {
          label: part.config[index].label,
          factory: t.form.Select,
          options: valuesFormat,
          nullOption: {value: null, text: 'Choose one'}
        };
      } else {
        options.fields[index] = {
          label: part.config[index].label,
        };
      }
    }
    return options;
  }

  constructor(props) {
    super(props);

    this.state = {
      actionConfig: null,
      error: null,
      item: null,
      type: null,
      options: null,
      value: null,
      banned: [],
    };

    Account.getAccountInfo().then(result => {
      this.state.account = result;
    }).catch(error => {
      return this.props.navigation.navigate('Login');
    });

    this.state.item = this.props.navigation.getParam('item');
    this.state.actionConfig = this.props.navigation.getParam('actionConfig');
    if (typeof this.state.item.reaction !== "undefined") {
      this.state.type = this.generateType(this.state.item.reaction);
      this.state.options = this.generateOptions(this.state.item.reaction);
      if (typeof this.state.item.mod !== "undefined" && typeof this.state.item.data !== "undefined") {
        this.state.value = this.state.item.data.config_reaction;
      }
    }
  }

  validAndSend(value) {
    console.log(value);
    let reactionConfig = value;
    for (let item of this.state.banned) {
      reactionConfig = {...reactionConfig, ...item};
    }

    /*subscribe to api*/
    /*console.log(this.state.actionConfig);
    console.log(reactionConfig);
    console.log(this.state.account.login);
    console.log(this.state.account.password);
    console.log("**********");*/
    if (typeof this.state.item.mod !== "undefined" && this.state.item.mod === "edit") {
      Api.editThisLink(this.state.account.login, this.state.account.password, this.state.item.data.id, this.state.item.id, this.state.actionConfig, reactionConfig).catch()
        .then(result => {
          console.log("> Send with success !");
          this.props.navigation.navigate('Dashboard', {message: "Edited with success !"});
        })
        .catch(error => {
          console.log("> Cannot be send !");
          console.log(error);
        });
    } else {
      Api.subscribe(this.state.account.login, this.state.account.password, this.state.item.id, this.state.actionConfig, reactionConfig).catch()
        .then(result => {
          console.log("> Send with success !");
          this.props.navigation.navigate('Dashboard', {message: "Subscribed with success !"});
        })
        .catch(error => {
          console.log("> Cannot be send !");
          console.log(error);
        });
    }
  }

  handleSubmit() {
    const value = this._form.getValue();

    if (value) {
      this.validAndSend(value);
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.form}>
          <Text style={{color: "black", fontWeight: "bold", marginBottom: 10}}>{this.state.item.name}</Text>
          {this.state && this.state.error ? (<Text style={styles.error}>{this.state.error}</Text>) : null}
          {this.state && this.state.type && this.state.options ? [(
            <Form key={0}
                  ref={c => this._form = c}
                  type={this.state.type}
                  options={this.state.options}
                  value={this.state.value}
            />), (
            <Button key={1}
                    title="Send !"
                    onPress={this.handleSubmit.bind(this)}
            />)] : (
            <Button
              title="No configuration required,  submit :) !"
              onPress={this.validAndSend.bind(this, null)}
            />)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
