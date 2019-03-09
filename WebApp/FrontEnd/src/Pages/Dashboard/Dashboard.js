import React, { useState, useEffect, useContext } from "react";
import { Grid, Tabs, Tab, Paper } from "@material-ui/core";

import Context from "../../context/context";
import AllServices from "../../components/Dashboard/AllServices";
import MyServices from "../../components/Dashboard/MyServices";

import { allLinks } from "../../api";

const Dashboard = () => {
  const context = useContext(Context);
  const [value, setValue] = useState(0);
  const [_services, _setServices] = useState(null);

  const fetchServices = async () => {
    const res = await allLinks({
      Accept: "application/json",
      login: context.username,
      password: context.password
    });
    if (Array.isArray(res)) _setServices(res);
  };

  useEffect(() => {
    fetchServices();
  }, []);


  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Grid
      container
      style={{ marginTop: 32, margin: 0, width: "100%" }}
      spacing={0}
      justify="center"
    >
      <Grid item xs={10} style={{ marginTop: 32, margin: 0, width: "100%" }}>
        <Paper style={{ marginTop: 32 }} color="secondary">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Tous les services" />
            <Tab label="Mes services" />
          </Tabs>
        </Paper>
        <Grid
          container
          justify="center"
          spacing={32}
          style={{
            margin: 0,
            width: "100%"
          }}
        >
          {value === 0 && (
            <AllServices services={_services} context={context} />
          )}
          {value === 1 && <MyServices services={_services} context={context} />}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
