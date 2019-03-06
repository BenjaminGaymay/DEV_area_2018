import React from "react";

import { Grid, CircularProgress } from "@material-ui/core";

import Service from "./Service";

const AllServices = ({context, services}) => {
  return (
    <>
      {services ? (
        services.map((item, index) => (
          <Service
            key={item.name + item.id + index}
            item={item}
            context={context}
          />
        ))
      ) : (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: "100px" }}
        >
          <CircularProgress />
        </Grid>
      )}
    </>
  );
};

export default AllServices;
