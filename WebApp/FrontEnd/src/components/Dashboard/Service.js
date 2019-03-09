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

import MyDialog from "./MyDialog";

const Service = props => {
  const [item] = useState(props.item);

  const [open, setOpen] = useState(false);
  const context = props.context;

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
          <Button
            size="small"
            color="primary"
            onClick={() => {
              if (item.action && item.action.authorizationUrl) {
                window.open(
                  `${process.env.REACT_APP_API}${item.action.authorizationUrl}`
                );
              }
              if (
                item.reaction &&
                item.reaction.authorizationUrl &&
                item.action &&
                item.action.authorizationUrl !== item.reaction.authorizationUrl
              ) {
                window.open(
                  `${process.env.REACT_APP_API}${
                    item.reaction.authorizationUrl
                  }`
                );
              }
              setOpen(true);
            }}
          >
            Configure
          </Button>
        </CardActions>
      </Card>
      <MyDialog item={item} open={open} setOpen={setOpen} context={context} />
    </Grid>
  );
};

export default Service;
