import React from "react";
import { Grid } from "@material-ui/core";

import "./Home.css";

import HomeImg from "../../assets/images/home.png";
import RedditImg from "../../assets/images/reddit.png";
import GithubImg from "../../assets/images/github.png";
import ClashroyaleImg from "../../assets/images/clash-royale.png";
import LolImg from "../../assets/images/lol.png";
import ImdbImg from "../../assets/images/imdb.png";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlOauth: ""
    };
  }

  render() {
    return (
      <div style={{ margin: 0 }}>
        <div style={{ minheight: "800px" }}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={16} />
            </Grid>
          </Grid>

          <div className="div">
            <img src={HomeImg} alt="Area" className="img-left" />
            <h1>AREA : A world that works for you</h1>
            <p>
            AREA is the free way to get all your apps and devices talking to each other. 
            Not everything on the internet plays nice, so we're on a mission to build a more connected world.
            </p>
          </div>

          <div className="div">
           <img src={ClashroyaleImg} alt="clash-royal" className="img-right" />
            <h1>Clash-Royale : The game in the future</h1>
            <p>
            We’ll show you some of our favorite pairings. Just turn on what you like and we’ll make it happen for you.
            </p>
          </div>

          <div className="div">
            <img src={RedditImg} alt="reddit" className="img-left" />
            <h1>Reddit : share what you think</h1>
            <p>
            AREA is the free way to get all your apps and devices talking to each other. 
            Not everything on the internet plays nice, so we're on a mission to build a more connected world.
            </p>
          </div>

          <div className="div">
           <img src={GithubImg} alt="github" className="img-right" />
            <h1>Github : Share your work</h1>
            <p>
            With github you can share your work through all over the world.
            </p>
          </div>

          <div className="div">
           <img src={LolImg} alt="lol" className="img-left" />
            <h1>Lol : The MOBA game</h1>
            <p>
            League of Legends (lol) is probably the most famous moba game all over the world.
            </p>
          </div>

          <div className="div">
           <img src={ImdbImg} alt="imdb" className="img-right" />
            <h1>Imdb : The best internet movie database</h1>
            <p>
            IMDB is a movie internet database that deals with the cinema, the television and video games.
            </p>
          </div>

        </div>
      </div>
    );
  }
}
