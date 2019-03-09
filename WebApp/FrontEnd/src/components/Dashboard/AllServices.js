import React, { useEffect, useState } from "react";

import { Grid, CircularProgress, Snackbar } from "@material-ui/core";

import Service from "./Service";
import axios from "axios";

const AllServices = ({ context, services }) => {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");

  const getToken = e => {
    if (e.origin !== "http://localhost:8080") {
      return;
    }
    if (e.data.success && e.data.access_token) {
      // Send the access token !
      axios
        .post(`${process.env.REACT_APP_API}/updateToken`, null, {
          headers: {
            Accept: "application/json",
            login: context.username,
            password: context.password,
            token: e.data.access_token
          }
        })
        .then(r => {
          setOpen(true);
          setErr("Compte configuré avec succès !");
        })
        .catch(r => {
          setOpen(true);
          setErr("Une erreur est survenue !");
        });
    }
  };

  useEffect(() => {
    window.addEventListener("message", getToken);
    return () => window.removeEventListener("message", getToken);
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
      <Snackbar
        open={open}
        message={<span style={{ fontSize: "20px" }}>{err}</span>}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default AllServices;
