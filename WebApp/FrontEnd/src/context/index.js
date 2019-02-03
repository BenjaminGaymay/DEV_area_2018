import React from 'react';
import Context from './context';

export default class Provider extends React.Component {
  state = {
    isLogged: false,
    username: '',
    password: '',
    setUser: (payload) => {
      this.setState({
        isLogged: payload.isLogged,
        username: payload.username,
        password: payload.password
      });
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
