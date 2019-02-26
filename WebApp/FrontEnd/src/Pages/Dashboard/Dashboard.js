import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  Dialog,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Slide
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";
import Context from '../../context/context';

import servicesJSON from "../../assets/services.json";

import CR from "../../components/ServiceConfiguration/CR";
import LoL from "../../components/ServiceConfiguration/LoL";
import Imdb from "../../components/ServiceConfiguration/Imdb";
import Email from "../../components/ServiceConfiguration/Email";
import Github from "../../components/ServiceConfiguration/Github";
import Reddit from "../../components/ServiceConfiguration/Reddit";
import Facebook from "../../components/ServiceConfiguration/Facebook";
import Fortnite from "../../components/ServiceConfiguration/Fortnite";

const Transition = props => <Slide direction="up" {...props} />;

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [services, setServices] = useState([]);
  const [configuration, setConfiguration] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [url, setUrl] = useState("");
  const context = useContext(Context);

  useEffect(() => {
    window.addEventListener("message", handleOauthResponse);
    // setServices(servicesJSON);

    axios.get(`${process.env.REACT_APP_API}/getLinks`, {
      headers: {
        Accept: 'application/json',
        login: context.username,
        password: context.password
      }
    })
    .then(res => {
      console.log(res.data);

      setServices(res.data);
    })
    .catch(console.error);
    return () => {
      window.removeEventListener("message", handleOauthResponse);
    };
  }, []);

  function handleOauthResponse(e) {
    if (e.origin !== "http://localhost:8081") {
      return;
    }
    const res = services.find(obj => obj.name === selectedService);
    if (res) setToken(res.options.accessToken);
  }

  function handleCloseDialog() {
    setConfiguration(false);
  }

  function oauth(service) {
    setUrl(`http://localhost:8081/auth/${service.name}`);
    setConfiguration(true);
    setSelectedService(service.name);
  }

  function getToken() {
    const res = services.find(o => o.name === selectedService);
    if (res) {
      console.log(res);
    }
  }

  function renderSwitch() {
    switch (selectedService) {
      case "reddit":
        return <Reddit />;
      case "github":
        return <Github />;
      case "facebook":
        return <Facebook />;
      case "league of legends":
        return <LoL />;
      case "imdb":
        return <Imdb />;
      case "email":
        return <Email />;
      case "fortnite":
        return <Fortnite />;
      case "clash royale":
        return <CR />;
      default:
        return <></>;
    }
  }

  return (
    <Grid
      container
      style={{ marginTop: 32, margin: 0, width: "100%" }}
      spacing={0}
      justify="center"
    >
      <Grid item xs={10} style={{ marginTop: 32, margin: 0, width: "100%" }}>
        <Grid
          container
          justify="center"
          spacing={32}
          style={{
            margin: 0,
            width: "100%"
          }}
        >
          {services.map((item, index) => (
            <Grid item key={item.name+item.id} xs={12} sm={6} md={4} lg={3}>
              <Card elevation={4}>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 150 }}
                    image={`${item.url}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography component="p">{item.description}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => oauth(item)}
                  >
                    Configure
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Dialog
        fullScreen
        open={configuration}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="Close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
              {selectedService}
            </Typography>
            <Button color="inherit" onClick={handleCloseDialog}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
        </List>
        {renderSwitch()}
      </Dialog>
    </Grid>
  );
};
export default Dashboard;
