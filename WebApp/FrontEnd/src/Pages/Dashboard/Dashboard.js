import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";

import axios from "axios";
import Context from "../../context/context";
import Service from "../../components/Dashboard/Service";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [services, setServices] = useState([]);
  const [configuration, setConfiguration] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [url, setUrl] = useState("");
  const context = useContext(Context);

  useEffect(() => {
    window.addEventListener("message", handleOauthResponse);

    axios
      .get(`${process.env.REACT_APP_API}/getLinks`, {
        headers: {
          Accept: "application/json",
          login: context.username,
          password: context.password
        }
      })
      .then(res => {
        setServices(res.data);
      })
      .catch(console.error);
    return () => {
      window.removeEventListener("message", handleOauthResponse);
    };
  }, []);

  function handleOauthResponse(e) {
    if (e.origin !== "http://localhost:8081") {
      return;
    }
    const res = services.find(obj => obj.name === selectedService);
    if (res) setToken(res.options.accessToken);
  }

  function oauth(service) {
    setUrl(`http://localhost:8081/auth/${service.name}`);
    setConfiguration(true);
    setSelectedService(service.name);
  }

  function getToken() {
    const res = services.find(o => o.name === selectedService);
    if (res) {
      console.log(res);
    }
  }

  return (
    <Grid
      container
      style={{ marginTop: 32, margin: 0, width: "100%" }}
      spacing={0}
      justify="center"
    >
      <Grid item xs={10} style={{ marginTop: 32, margin: 0, width: "100%" }}>
        <Grid
          container
          justify="center"
          spacing={32}
          style={{
            margin: 0,
            width: "100%"
          }}
        >
          {services.map((item, index) => (
            <Service key={item.name + item.id + index} item={item} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
