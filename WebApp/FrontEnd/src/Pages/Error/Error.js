import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";

const Error = () => {
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      alignItems="center"
      style={{ height: "500px" }}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="chap"
            image="https://media.giphy.com/media/gngO1gmBhS9na/giphy.gif"
            title="LoliloL"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              404
            </Typography>
            <Typography component="p">Omg page not found lol</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Error;
