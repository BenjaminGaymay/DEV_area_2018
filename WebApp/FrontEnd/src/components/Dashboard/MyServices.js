import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";

import Service from "./Service";

const MyServices = ({ context }) => {
  const [services, setServices] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/subscribe`, {
        headers: {
          Accept: "application/json",
          login: context.username,
          password: context.password
        }
      })
      .then(res => setServices(res.data))
      .catch(console.error);
  }, []);
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

export default MyServices;
