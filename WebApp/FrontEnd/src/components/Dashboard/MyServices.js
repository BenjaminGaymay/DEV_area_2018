import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Paper, Typography } from "@material-ui/core";
import { myLinks } from "../../api";
import axios from "axios";
import MyService from "./MyService";

const MyServices = ({ services, context }) => {
  const [myServices, setMyServices] = useState(null);
  const [load, setLoad] = useState(false);

  const deleteItem = id => {
    axios.post(`${process.env.REACT_APP_API}/unsubscribe`, {
      subscribeId: id
    }, {
      headers: {
        Accept: "application/json",
        login: context.username,
        password: context.password
      }
    }).then(r => {
      if (r.status === 200) {
        const newServices = myServices.filter(o => o.config.id !== id);
        setMyServices(newServices);
      }
    }).catch(console.error);
  }

  const fetchServices = async () => {
    const res = await myLinks({
      Accept: "application/json",
      login: context.username,
      password: context.password
    });
    const tmp = [];
    if (Array.isArray(res)) {
      for (const el of res) {
        const zz = services.find(o => o.id === el.subscribe_id);
        if (zz) {
          tmp.push({config: el, info: zz});
        }
      }
      setMyServices(tmp);
    }
    setLoad(true);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      {load ? (
        Array.isArray(myServices) && myServices.length ? (
          myServices.map((item, index) => (
            <MyService
              key={item.info.name + item.info.id + index}
              item={item}
              context={context}
              deleteItem={deleteItem}
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
            <Paper style={{ padding: 50 }}>
              <Typography component="p" variant="h2">
                Vous n'avez pas de services actifs.
              </Typography>
            </Paper>
          </Grid>
        )
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
