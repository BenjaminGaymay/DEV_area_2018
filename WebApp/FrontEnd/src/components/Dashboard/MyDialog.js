import React, { useReducer } from "react";
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

const MyDialog = ({ open, setOpen, item, context }) => {
  const { action, reaction, id } = item;

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
        return {
          ...state,
          error: {
            title: action.title,
            subtitle: action.subtitle
          }
        };
      default:
        return state;
    }
  };

  const [
    { mode, error, errorOpen, dataAction, dataReaction },
    dispatch
  ] = useReducer(reducer, {
    mode: action ? "action" : "reaction",
    dataAction: null,
    dataReaction: null,
    error: "",
    errorOpen: false
  });

  const handleClose = () => setOpen(false);
  const handleCloseError = () => dispatch({ type: "alertError", value: false });

  const handleSubmit = () => {
    setOpen(false);
    axios
      .post(
        `${process.env.REACT_APP_API}/subscribe`,
        {
          subscribeId: id,
          configAction: dataAction,
          configReaction: dataReaction
        },
        {
          headers: {
            Accept: "application/json",
            login: context.username,
            password: context.password
          }
        }
      )
      .then(r => {
        dispatch({
          type: "setError",
          title: "Alerte",
          subtitle: "Demande envoyée"
        });
        dispatch({ type: "alertError", value: true });
        console.log("success");
      })
      .catch(err => {
        dispatch({
          type: "setError",
          title: "Alerte",
          subtitle: "Une erreur est survenue"
        });
        dispatch({ type: "alertError", value: true });
        console.log("error");
      });
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
              <FormReaction
                reaction={reaction}
                dispatch={dispatch}
                handleSubmit={handleSubmit}
              />
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
        <DialogTitle id="alert-dialog-title">{error.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error.subtitle}
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
