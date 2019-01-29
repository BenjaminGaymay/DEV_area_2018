import React from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import './Login.css';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'login'
    };
  }

  registerForm = () => {
    return (
      <div style={{ padding: 15 }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'lighter' }}>S'inscrire</h1>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Nom d'utilisateur" />
            </Grid>
          </Grid>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Email" type="email" />
            </Grid>
          </Grid>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item >
              <Lock />
            </Grid>
            <Grid item >
              <TextField fullWidth label="Mot de passe" type="password" />
            </Grid>
          </Grid>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item >
              <Lock />
            </Grid>
            <Grid item >
              <TextField fullWidth label="Répéter" type="password" />
            </Grid>
          </Grid>
        <Grid style={{ marginTop: 25 }} container justify="center" direction="column" alignItems="center">
          <Button variant="contained" color="primary" onClick={this.handleRegisterSubmit}>S'inscrire'</Button>
          <div style={{ marginTop: 15 }}><i>Déjà un compte ?</i></div>
          <Button onClick={() => {
            this.setState({
              form: 'login'
            });
          }}>Se connecter</Button>
        </Grid>
      </div>
    );
  }

  loginForm = () => {
    return (
      <div style={{ padding: 15 }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'lighter' }}>Connexion</h1>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Nom d'utilisateur" />
            </Grid>
          </Grid>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item >
              <Lock />
            </Grid>
            <Grid item >
              <TextField fullWidth label="Mot de passe" type="password" />
            </Grid>
          </Grid>
        <Grid style={{ marginTop: 25 }} container justify="center" direction="column" alignItems="center">
          <Button variant="contained" color="primary" onClick={this.handleLoginSubmit}>Se connecter</Button>
          <div style={{ marginTop: 15 }}><i>Pas de compte ?</i></div>
          <Button onClick={() => {
            this.setState({
              form: 'register'
            });
          }}>S'inscrire</Button>
        </Grid>
      </div>
    );
  }

  handleRegisterSubmit = () => {

  }

  handleLoginSubmit = () => {

  }

  render() {
    const loginForm = this.state.form === 'login';

    return (
      <Grid container justify="center" alignItems="center" alignContent="center" style={{ height: loginForm ? 400 : 515 }}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={10}>
            {this.state.form === 'login' ?
              this.loginForm() :
              this.registerForm()
            }
          </Paper>
        </Grid>
      </Grid>
    );
  }
}