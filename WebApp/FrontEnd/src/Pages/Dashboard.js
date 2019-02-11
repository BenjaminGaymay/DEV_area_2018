import React, { useState, useEffect } from "react";
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

const Transition = props => <Slide direction="up" {...props} />;

export default function Dashboard(props) {
  // const services = [
  //   {
  //     name: "reddit",
  //     options: {
  //       image:
  //         "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png",
  //       accessToken: ""
  //     }
  //   },
  //   {
  //     name: "facebook",
  //     options: {
  //       image:
  //         "https://geeko.lesoir.be/wp-content/uploads/sites/58/2018/11/Facebook-2.jpg",
  //       accessToken: ""
  //     }
  //   },
  //   {
  //     name: "github",
  //     options: {
  //       image:
  //         "https://dyw7ncnq1en5l.cloudfront.net/optim/news/75/75755/-c-github.jpg",
  //       accessToken: ""
  //     }
  //   }
  // ];

  const [token, setToken] = useState("");
  const [services, setServices] = useState([
    {
      name: "reddit",
      options: {
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png",
        accessToken: ""
      }
    },
    {
      name: "facebook",
      options: {
        image:
          "https://geeko.lesoir.be/wp-content/uploads/sites/58/2018/11/Facebook-2.jpg",
        accessToken: ""
      }
    },
    {
      name: "github",
      options: {
        image:
          "https://dyw7ncnq1en5l.cloudfront.net/optim/news/75/75755/-c-github.jpg",
        accessToken: ""
      }
    }
  ]);
  const [configuration, setConfiguration] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    window.addEventListener("message", handleOauthResponse);
    return () => {
      window.removeEventListener("message", handleOauthResponse);
    };
  });

  function handleOauthResponse(e) {
    if (e.origin !== "http://localhost:8081") {
      return;
    }
    const res = services.find(obj => obj.name === selectedService);
    // if (res) res.options.accessToken = e.data.access_token;
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

  return (
    <Grid container spacing={16} style={{ marginTop: 32 }}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={32}>
          {services.map((item, index) => (
            <Grid item key={item.name}>
              <Card elevation={4}>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 150 }}
                    image={`${item.options.image}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography component="p">
                      Noob noob noob noob noob noob noob noob noob noob{" "}
                      {item.name}
                    </Typography>
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
          <ListItem button>
            <ListItemText
              primary={`${selectedService.charAt(0).toUpperCase() +
                selectedService.slice(1)} access token`}
              onClick={() => {
                window.open(url);
              }}
            />
            <p>{token}</p>
          </ListItem>
        </List>
      </Dialog>
    </Grid>
  );
}
