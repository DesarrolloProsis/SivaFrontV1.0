import React from "react";
import "./Navbar.css";
import logo from "./SiVAwhite.png";
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router';
class Navbar extends React.Component {
  state = {

  }
  logOut = () =>{
    const cookies = new Cookies();
    cookies.remove('token');
    cookies.remove('numCliente');
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="div">
        <nav className="navbar navstyle fixed-top navbar-dark">
          <img alt="logo" className="logomarhnos" src={logo} />
          <Button variant="danger" size="sm" className="button-logout" onClick={this.logOut}>Cerrar Sesión</Button>
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);
