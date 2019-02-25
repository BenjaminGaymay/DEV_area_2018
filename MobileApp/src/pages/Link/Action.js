/**
 * @flow
 */

import React, {Component} from 'react';
import {KeyboardAvoidingView, TouchableHighlight, View} from 'react-native'
import {Icon, Text} from "react-native-elements";
import t from 'tcomb-form-native';

const Form = t.form.Form;

type Props = { navigation: Object };
type State = {
  atype: string, // Activity type. E.g. the content type.
  type: Object, // This is "type" in the tcomb-form sense.  The struct.
  options: Object, // Form options.
  value: Object // Form values.
};

export default class LinkAction extends Component<Props, State> {
  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3C55B0'
    },
    title: "Action",
    headerRight: null
  });

  form: Form;

  constructor(props) {
    super(props);
  }

  getType() {
    return t.struct({
      label: t.String,
      team: t.String,
    });
  }

  teams = [
    {value: 'or', text: 'Orioles'},
    {value: 'ya', text: 'Yankees'},
    {value: 're', text: 'Red Sox'},
    {value: 'other', text: 'Other'}
  ];

  options = {
    fields: {
      label: {
        error: 'coucou',
      },
      team: {
        error: 'dommage',
        factory: t.form.Select,
        options: this.teams,
        nullOption: {value: '', text: 'Choose your team'}
      },
    }
  };


  async onPress() {
    const value = this._form.getValue();

    if (value != null) {
      console.log(value);
    }
  }

  render() {
    return (
      <View>
        <Form
          ref={c => this._form = c}
          type={this.getType()}
          options={this.options}
        />
        <TouchableHighlight style={{}} onPress={this.onPress.bind(this)}>
          <Text style={{}}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}