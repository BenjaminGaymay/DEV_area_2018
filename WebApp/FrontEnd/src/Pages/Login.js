import React from 'react';
import axios from "axios";
import { Paper, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import './Login.css';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'login',
      login: '',
      mail: '',
      password: '',
      confPassword: '',
      animation: false
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
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
            <TextField fullWidth label="Nom d'utilisateur" name="login" value={this.state.login} onChange={this.handleChange} />
          </Grid>
        </Grid>
        <Grid container spacing={16} alignItems="center" justify="center">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField fullWidth label="Email" type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </Grid>
        </Grid>
        <Grid container spacing={16} alignItems="center" justify="center">
          <Grid item >
            <Lock />
          </Grid>
          <Grid item >
            <TextField fullWidth label="Mot de passe" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </Grid>
        </Grid>
        <Grid container spacing={16} alignItems="center" justify="center">
          <Grid item >
            <Lock />
          </Grid>
          <Grid item >
            <TextField fullWidth label="Répéter" type="password" name="confPassword" value={this.state.confPassword} onChange={this.handleChange} />
          </Grid>
        </Grid>
        <Grid style={{ marginTop: 25 }} container justify="center" direction="column" alignItems="center">
          {!this.state.animation ?
            <Button variant="contained" color="primary" onClick={this.handleRegisterSubmit}>S'inscrire'</Button> :
            <CircularProgress />}

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
            <TextField fullWidth label="Nom d'utilisateur" name="login" value={this.state.login} onChange={this.handleChange} />
          </Grid>
        </Grid>
        <Grid container spacing={16} alignItems="center" justify="center">
          <Grid item >
            <Lock />
          </Grid>
          <Grid item >
            <TextField fullWidth label="Mot de passe" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </Grid>
        </Grid>
        <Grid style={{ marginTop: 25 }} container justify="center" direction="column" alignItems="center">
          {!this.state.animation ?
            <Button variant="contained" color="primary" onClick={this.handleLoginSubmit}>Se connecter</Button> :
            <CircularProgress />}
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

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    this.setState({
      animation: true
    }, () => {
      axios.post("http://localhost:8081/register", { login: this.state.login, email: this.state.email, password: this.state.password })
        .then(res => {
          this.setState({
            animation: false
          });
          console.log(res.status);
        })
        .catch(res => {
          this.setState({
            animation: false
          });
          console.log(res.status);
        });
    });
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({
      animation: true
    }, () => {
      axios.post('http://localhost:8081/login', { login: this.state.login, password: this.state.password })
        .then(res => {
          this.setState({
            animation: false
          });
          console.log(res.status);
        })
        .catch(res => {
          this.setState({
            animation: false
          });
          console.log(res.status);
        });
    });
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