import React from "react";
import {
  Grid,
  Button,
  List,
  ListItem,
  Divider,
  ListSubheader,
  Paper
} from "@material-ui/core";

const ConfirmConfig = ({ dataAction, dataReaction, handleSubmit }) => {
  console.log(dataAction);
  console.log(dataReaction);
  return (
    <Grid container justify="center">
      <Grid item xs={8} style={{ textAlign: "center" }}>
        <Paper>
          <p>Récapitulatif</p>
          <List
            style={{ fontSize: "24px;" }}
            subheader={<ListSubheader component="div">Action</ListSubheader>}
          >
            {Object.keys(dataAction).map(i => (
              <React.Fragment key={i + dataAction[i]}>
                <ListItem button divider>
                  <div style={{ textAlign: "center", width: "100%" }}>
                    {i} - {dataAction[i]}
                  </div>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
          {dataReaction && (
            <>
              <List
                style={{ fontSize: "24px;" }}
                subheader={
                  <ListSubheader component="div">Réaction</ListSubheader>
                }
              >
                {Object.keys(dataReaction).map(i => (
                  <React.Fragment key={i + dataReaction[i]}>
                    <ListItem button divider>
                      <div style={{ textAlign: "center", width: "100%" }}>
                        {i} - {dataReaction[i]}
                      </div>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </>
          )}

          <Button
            style={{
              margin: "0 auto",
              marginBottom: "20px",
              marginTop: "20px"
            }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Valider
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ConfirmConfig;
