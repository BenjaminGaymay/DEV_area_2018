import React from "react";

import { Button, Grid } from "@material-ui/core";
import {  } from 'react-oauth-popup';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlOauth: ''
    };
  }
  oauth = service => {
    this.setState({
      urlOauth: `http://localhost:3000/${service}`
    });
    const oauthWin = window.open(this.state.urlOauth);

    window.setInterval(() => {
        if (oauthWin.closed) {
            window.clearInterval();
        }
    });
    console.log(service);
  };

  render() {
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              <Grid item>
                <Button
                  onClick={() => this.oauth("reddit")}
                  variant="contained"
                  color="secondary"
                >
                  Reddit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => this.oauth("facebook")}
                  variant="contained"
                  color="primary"
                >
                  Facebook
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => this.oauth("github")}
                  variant="contained"
                >
                  Github
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
