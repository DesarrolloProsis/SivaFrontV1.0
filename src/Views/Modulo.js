import React from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Cookies from 'universal-cookie';
import NavbarLogged from "../Components/Navbar/NavbarLogged";
import CardModuleFilters from "../Components/CardModule/CardModuleFilters";
// import { ReactComponent as Imprimir } from './24px.svg';
import "./Modulo.css"
class Modulo extends React.Component {
   
    render() {
        return (
            <div>
                <NavbarLogged></NavbarLogged>
                <Container className="py-5" >
                    <CardModuleFilters></CardModuleFilters>
                </Container>
            </div>

        )
    }
}
export default Modulo;
//  <Card.Header className="header">MOVIMIENTOS<Imprimir className="imp-style"></Imprimir></Card.Header>