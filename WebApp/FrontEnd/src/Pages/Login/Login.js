import React, { useState, useContext } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  IconButton
} from "@material-ui/core";
import { Redirect } from "react-router";
import { AccountCircle, Lock, Close } from "@material-ui/icons";
import Context from "../../context/context";
import { register, login as _login } from "../../api";

const Login = () => {
  const context = useContext(Context);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("login");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [animation, setAnimation] = useState(false);
  const [err, setErr] = useState("");

  const handleRegisterSubmit = async e => {
    e.preventDefault();
    setAnimation(true);

    const r = await register(`${process.env.REACT_APP_API}/register`, {
      login,
      email,
      password
    });
    setOpen(true);
    if (!r) {
      setErr("Oups, une erreur est survenue");
    } else {
      setErr("Vous êtes enregistré ! Vous pouvez vous connecter !");
    }
    setAnimation(false);
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    setAnimation(true);
    const res = await _login(`${process.env.REACT_APP_API}/login`, {
      login,
      password
    });
    if (res) {
      context.setUser({ isLogged: true, username: login, password });
    } else {
      setOpen(true);
      setErr("Oups, une erreur est survenue !");
      setAnimation(false);
    }
  };

  const registerForm = () => (
    <div key="register" style={{ padding: 15 }}>
      <h1 style={{ textAlign: "center", fontWeight: "lighter" }}>S'inscrire</h1>
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            name="login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          return
        </Grid>
      </Grid>
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item>
          <Lock />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item>
          <Lock />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Répéter"
            type="password"
            name="confPassword"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid
        style={{ marginTop: 25 }}
        container
        justify="center"
        direction="column"
        alignItems="center"
      >
        {!animation ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterSubmit}
          >
            S'inscrire'
          </Button>
        ) : (
          <CircularProgress />
        )}

        <div style={{ marginTop: 15 }}>
          <i>Déjà un compte ?</i>
        </div>
        <Button onClick={() => setForm("login")}>Se connecter</Button>
      </Grid>
    </div>
  );

  const loginForm = () => (
    <div key="login" style={{ padding: 15 }}>
      <h1 style={{ textAlign: "center", fontWeight: "lighter" }}>Connexion</h1>
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            name="login"
            value={login}
            onChange={e => {
              setLogin(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item>
          <Lock />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid
        style={{ marginTop: 25 }}
        container
        justify="center"
        direction="column"
        alignItems="center"
      >
        {!animation ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginSubmit}
          >
            Se connecter
          </Button>
        ) : (
          <CircularProgress />
        )}
        <div style={{ marginTop: 15 }}>
          <i>Pas de compte ?</i>
        </div>
        <Button onClick={() => setForm("register")}>S'inscrire</Button>
      </Grid>
    </div>
  );

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      alignContent="center"
      style={{ height: form === "login" ? 400 : 515 }}
    >
      {context.isLogged && <Redirect to="/dashboard" />}
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={10}>
          {form === "login" ? loginForm() : registerForm()}
        </Paper>
      </Grid>
      <Snackbar
        open={open}
        message={<p style={{ fontSize: 15 }}>{err}</p>}
        onClose={() => setOpen(false)}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>
        ]}
      />
    </Grid>
  );
};

export default Login;
