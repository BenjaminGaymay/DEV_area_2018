import React from "react";
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

import "./MyDialog.css";
const Transition = props => <Slide direction="up" {...props} />;

const MyDialog = ({ open, setOpen, item }) => {
  const handleClose = () => setOpen(false);
  const { action, reaction } = item;

  if (!action) {
    return <h1>Noob</h1>;
  }

  const createSchema = () => {
    let options = {
      title: "Configurer l'action",
      type: "object",
      properties: {}
    };

    const newConfig = {};
    for (const i in action.config) {
      let tmp = action.config[i];
      if (tmp.type === "checkbox") {
        tmp.type = "string";
      }
      if (tmp.label) {
        tmp.title = tmp.label;
      }
      if (tmp.values) {
        tmp.enum = tmp.values;
      }
      newConfig[i] = tmp;
    }
    options["properties"] = newConfig;
    return options;
  };

  const handleSubmit = ({formData}, e) => {
    console.log(formData);
  };
  const schema = createSchema();
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
          {schema && (
            <div className="form-style">
              <Form schema={schema} onSubmit={handleSubmit}>
                <Button type="submit" variant="contained" color="primary">Configurer réaction</Button>
              </Form>
            </div>
          )}
        </ListItem>
        <Divider />
      </List>
    </Dialog>
  );
};

export default MyDialog;
