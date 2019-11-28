import React from "react";
import "./Navbar.css";
import logo from "./SiVAwhite.png";

class Navbar extends React.Component {
  state = {

  }
  render() {
    return (
      <div className="div">
        <nav className="navbar navstyle fixed-top navbar-dark">
          <img alt="logo" className="logomarhnos" src={logo} />
        </nav>
      </div>
    );
  }
}
export default Navbar;
