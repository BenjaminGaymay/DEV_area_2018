import React from "react";
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

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlOauth: "",
      services: [
        {
          name: "reddit",
          image:
            "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png"
        },
        {
          name: "facebook",
          image:
            "https://geeko.lesoir.be/wp-content/uploads/sites/58/2018/11/Facebook-2.jpg"
        },
        {
          name: "github",
          image:
            "https://dyw7ncnq1en5l.cloudfront.net/optim/news/75/75755/-c-github.jpg"
        }
      ],
      configuration: false
    };
  }

  oauth = service => {
    this.setState(
      {
        urlOauth: `http://localhost:8081/auth/${service}`,
        configuration: true
      },
      () => {
        window.open(this.state.urlOauth);
      }
    );
  };

  componentDidMount() {
    window.addEventListener("message", this.handleOauthResponse);
  }

  handleOauthResponse(e) {
    if (e.origin !== "http://localhost:8081") {
      return;
    }
    console.log(e.data);
  }

  handleCloseDialog = () => {
    this.setState({
      configuration: false
    });
  };

  render() {
    return (
      <Grid container spacing={16} style={{ marginTop: 32 }}>
        <Grid item xs={12}>
          <Grid
            container
            justify="center"
            spacing={32}
            direction="column"
            alignItems="center"
          >
            {this.state.services.map((item, index) => (
              <Grid item xs={10} md={6} key={item.name}>
                <Card elevation={4}>
                  <CardActionArea>
                    <CardMedia
                      style={{ height: 150 }}
                      image={`${item.image}`}
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
                      onClick={() => this.oauth(item)}
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
          open={this.state.configuration}
          onClose={this.handleCloseDialog}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleCloseDialog}
                aria-label="Close"
              >
                <Close />
              </IconButton>
              <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                Put service name here!
              </Typography>
              <Button color="inherit" onClick={this.handleCloseDialog}>
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
                primary="Default notification ringtone"
                secondary="Tethys"
              />
              <p>Some configuration...</p>
            </ListItem>
          </List>
        </Dialog>
      </Grid>
    );
  }
}
