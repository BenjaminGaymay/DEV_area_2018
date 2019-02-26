/**
 * @flow
 */

import React, {Component} from 'react';
import {Button, View} from 'react-native'
import t from 'tcomb-form-native';
import * as Account from "../../services/Account";

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
      type[index] = t.String;
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

    Account.getAccountInfo().then(result => {
      this.state.account = result;
    }).catch(error => {
      return this.props.navigation.navigate('Login');
    });

    let item = this.props.navigation.getParam('item');
    let actionConfig = this.props.navigation.getParam('actionConfig');
    let type = this.generateType(item.reaction);
    let options = this.generateOptions(item.reaction);

    this.state = {
      item: item,
      actionConfig: actionConfig,
      type: type,
      options: options,
    }
  }


  handleSubmit() {
    const value = this._form.getValue();

    if (value) {
      let reactionConfig = value;

      console.log("Send to api: ");
      /*subscribe to api*/
      console.log(this.state.actionConfig);
      console.log(reactionConfig);
      console.log(this.state.account.login);
      console.log(this.state.account.password);
      console.log("**********");
    }
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Form
          ref={c => this._form = c}
          type={this.state.type}
          options={this.state.options}
        />
        <Button
          title="Send !"
          onPress={this.handleSubmit.bind(this)}
        />
      </View>
    );
  }
}