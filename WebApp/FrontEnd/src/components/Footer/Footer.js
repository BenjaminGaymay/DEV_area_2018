import React from "react";

import "./Footer.css";
import AreaLogo from "../../assets/images/area.png";

const Footer = _ => {
  return (
    <div className="footer">
      <img src={AreaLogo} alt="Area" className="logo" />
      <br />
      Copyrights © 2019
      <br />[ Authors : Benjamin Gaymay - Benoit Pingris - Enguerrand Arminjon -
      Maxim Perrin - Robin Pronnier ]
    </div>
  );
};

export default Footer;