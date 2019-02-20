import React from "react";

import "./Footer.css";
import AreaLogo from "../../assets/images/area.png";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
            <img src={AreaLogo} alt="Area" className="logo" /><br />
            copyrights © 2019<br />
            [ Auhtors : Benjamin Gaymay - Benoit Pingris - Enguerrand Arminjon - Maxim Perrin - Robin Pronnier ]
      </div>
    );
  }
}