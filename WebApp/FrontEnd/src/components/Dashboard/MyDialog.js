import React, { useState, useReducer } from "react";
import {
  AppBar,
  Dialog,
  Slide,
  Grid,
  Toolbar,
  IconButton,
  Button,
  Typography,
  List,
  ListItem,
  Divider,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";

import FormAction from "./FormAction";
import FormReaction from "./FormReaction";
import "./MyDialog.css";

const Transition = props => <Slide direction="up" {...props} />;

const reducer = (state, action) => {
  switch (action.type) {
    case "mode":
      return { ...state, mode: action.value };
    case "dataAction":
      return { ...state, dataAction: action.value };
    case "dataReaction":
      return { ...state, dataReaction: action.value };
    case "alertError":
      return { ...state, errorOpen: action.value };
    case "setError":
      return { ...state, error: action.value };
    case "submit": {
      axios.post(
        `${process.env.REACT_APP_API}/subscribe`,
        null,
        {
          headers: {
            login: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
          },
          data: {
            subscribeId: state.id,
            configAction: state.dataAction,
            configReaction: state.dataReaction
          },
        }
      ).then(r => {
        console.log('success');
      }).catch(err => {
        console.log('error');
      });
      return state;
    }

    default:
      return state;
  }
};

const MyDialog = ({ open, setOpen, item }) => {
  const { action, reaction, id } = item;

  const [
    { mode, error, errorOpen },
    dispatch
  ] = useReducer(reducer, {
    mode: action ? "action" : "reaction",
    dataAction: null,
    dataReaction: null,
    error: "",
    errorOpen: false,
    id
  });

  const handleClose = () => setOpen(false);
  const handleCloseError = () => dispatch({ type: "alertError", value: false });

  const handleSubmit = () => {
    console.log("yo");
    dispatch({ type: "submit" });
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
              {item.name}
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Fermer
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            {mode === "action" ? (
              <FormAction action={action} dispatch={dispatch} />
            ) : reaction ? (
              <FormReaction reaction={reaction} dispatch={dispatch} />
            ) : (
              <Grid container justify="center">
                <Grid item style={{ textAlign: "center" }}>
                  <p>Pas de réaction à configurer</p>
                  <Button
                    style={{ margin: "0 auto" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Valider
                  </Button>
                </Grid>
              </Grid>
            )}
          </ListItem>
          <Divider />
        </List>
      </Dialog>

      <Dialog
        open={errorOpen}
        onClose={handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Attention !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyDialog;
