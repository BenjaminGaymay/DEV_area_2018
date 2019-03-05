import React, { useState } from "react";
import {
  AppBar,
  Dialog,
  Slide,
  Toolbar,
  IconButton,
  Button,
  Typography,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Form from "react-jsonschema-form";
import FormAction from './FormAction';
import FormReaction from './FormReaction';
import "./MyDialog.css";


const Transition = props => <Slide direction="up" {...props} />;

const MyDialog = ({ open, setOpen, item }) => {
  const handleClose = () => setOpen(false);
  const { action, reaction } = item;
  const [mode, setMode] = useState(action ? "action" : "reaction");


  const handleSubmit = () => {
    console.log("yo");
  };


  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
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
          {mode === "action" ?
            <FormAction action={action} setMode={setMode}/> :
            reaction ? <FormReaction reaction={reaction}/> : <Button onClick={handleSubmit}>Valider</Button>
            }
        </ListItem>
        <Divider />
      </List>
    </Dialog>
  );
};

export default MyDialog;
