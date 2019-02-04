import React from "react";
import { Grid } from "@material-ui/core";

import Img from "../assets/images/home.png";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlOauth: ""
    };
  }

  render() {
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16} />
          </Grid>
        </Grid>
        <img src={Img} alt="IFTTT" style={{ width: "100%", height: "auto" }} />
      </div>
    );
  }
}
