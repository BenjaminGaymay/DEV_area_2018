import React, { useEffect } from "react";
import { Grid, Button, Paper } from "@material-ui/core";
import dl from "downloadjs";

const MobileApp = () => {
  const fetchApplication = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/client.apk`);
    const blob = res.blob();
    dl(blob, "area.apk");
  };

  useEffect(() => {
    fetchApplication();
  }, []);
  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignContent="center"
      alignItems="center"
      style={{ minHeight: "50vh" }}
    >
      <h1>Votre téléchargement va commencer dans quelques instants</h1>
      <p>Si votre téléchargement n'a pas démarré, cliquez ici</p>
      <Button color="primary" variant="raised" onClick={fetchApplication}>
        Télécharger l'application
      </Button>
    </Grid>
  );
};

export default MobileApp;
