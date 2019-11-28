import React from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "./Register.css";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sivalogo from "../sivalogo.png";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
// import Cookies from 'universal-cookie';
class Confirmacion extends React.Component {


    render(){
        console.log(this.props.match)
    return (
        <div>
            <Navbar></Navbar>
            <Container fluid className="py-5 head-margin-top">
                <Row className="justify-content-md-center">
                    <Col xs="12" sm="12" md="9" lg="6" xl="6">
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col xs="12" sm="12" md="6" lg="6" xl="6"><img className="sivalogo" alt="logosiva" src={sivalogo}></img></Col>
                                    <Col xs="12" sm="12" md="6" lg="6" xl="6" className="left-margin">
                                        <Form className="left-margin-group">
                                            <p className="valpass"></p>
                                            <Form.Group  >
                                                <Form.Label>Numero de Verificacion</Form.Label>
                                                <Form.Control  placeholder="Codigo de Verificacion" />
                           
                                            </Form.Group>
                                        </Form>
                                        <Button variant="success" className="button-register" >Registrar</Button>
                                    </Col>                                    
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>

        )
    }
    
}
export default Confirmacion;