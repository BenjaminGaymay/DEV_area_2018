import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";

const Service = ({ item }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card elevation={4}>
        <CardActionArea>
          <CardMedia style={{ height: 150 }} image={`${item.url}`} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography component="p">{item.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => {}}>
            Configure
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Service;
