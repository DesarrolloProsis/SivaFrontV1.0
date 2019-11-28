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
import ReCAPTCHA from "react-google-recaptcha";

// import Cookies from 'universal-cookie';
class Register extends React.Component {
    state = {
        correoCliente: "",
        numCliente: "",
        passCliente: "",
        passConfirmCliente: "",
        reqPass: false,
        valPass: "",
        valData: "",
        confirmacion: false,
        numConfirmacion: "",
        idToken: "",
        modalTerminar: false,
    }

    //reCaptcha
    onChangereCapctcha = (value) => {
        console.log("Captcha value:", value);
    }

    //Obtener Correo
    handleChangeCorreo = (event) => {
        this.setState({ correoCliente: event.target.value });
    }
    handleNumeroConfirmacion = (event) => {
        this.setState({ numConfirmacion: event.target.value });
    }
    //Obtener Número de Usuario
    handleChangeNum = (event) => {
        this.setState({ numCliente: event.target.value });
    }
    // Obtener contraseña
    handleChangePass1 = (event) => {
        this.setState({ passCliente: event.target.value })
    }
    handleChangePass2 = (event) => {
        this.setState({ passConfirmCliente: event.target.value })
    }

    confirmar = () => {

        console.log(`http://192.168.0.144:8084/api/auth/confimacionCorreo/${this.state.idToken}/${this.state.numConfirmacion}`)
        axios.post(`http://192.168.0.144:8084/api/auth/confimacionCorreo/${this.state.correoCliente}/${this.state.numConfirmacion}`)
            .then(res => {
                if (res.data === true) {
                    console.log(res.data)
                    this.props.history.push("/login");
                }
                else {
                    console.log(res.data)
                    console.log("FALLO ALGO EN EL REGISTRO :(")
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    //Volver a enviar el correo
    reenviarCorreo = () => {

        console.log("Reenvio de Correo")
        axios.post(`http://192.168.0.144:8084/api/auth/reenviarCorreo/${this.state.correoCliente}`)
            .then(res => {
                if (res.data == true) {
                    alert("Se volvio a enviar el correo de verificacion")
                }
                else {
                    alert("No se envio nada :(")
                }
            })
            .catch(err => {
                console.log("REQUEST ERROR: ", err);
                this.setState({
                    valPass: "Error: El usuario ya esta registrado."
                })
            })

    }

    //Consulta de axios para validar usuario & cliente y mostrar modal
    auth = () => {

        if (this.state.correoCliente !== "" && this.state.numCliente !== "") {
            axios.get(`http://192.168.0.144:8084/api/auth/clientexists/${this.state.numCliente}/${this.state.correoCliente}`)
                .then(res => {
                    if (res.data === true) {
                        this.setState({
                            reqPass: true,
                            valData: ""
                        })
                    }

                })
                .catch(err => {
                    this.setState({
                        valData: err.response.data[0]
                    })
                })
        }

    }
    //Val contraseña
    register = () => {
        if (this.state.passCliente === this.state.passConfirmCliente) {
            var data = {
                "email": this.state.correoCliente,
                "NumeroCliente": this.state.numCliente,
                "password": this.state.passConfirmCliente
            }
            axios.post("http://192.168.0.144:8084/api/auth/register", data)
                .then(res => {

                    this.setState({ idToken: res.data.id })
                    this.setState({ reqPass: false })
                    this.setState({ confirmacion: true })
                })
                .catch(err => {
                    console.log("REQUEST ERROR: ", err);
                    this.setState({
                        valPass: "Error: El usuario ya esta registrado."
                    })
                })
            this.setState({
                valPass: ""
            })
        } else {
            this.setState({
                valPass: "Las contraseñas no coinciden, verifica que sean iguales."
            })
        }
    }

    render() {
        //Modal para confirmar contraseña
        const pass = () => {
            if (this.state.reqPass !== false) {
                return (
                    <Modal show={this.state.reqPass} centered>
                        <Modal.Header>
                            <Modal.Title>Crear Contraseña</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <h5 className="valpass">{this.state.valPass}</h5>
                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Escribe tu Contraseña" onChange={this.handleChangePass1} />
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Confirma tu Contraseña" onChange={this.handleChangePass2} />
                                    {/* <ReCAPTCHA
                                        sitekey="6Lf9JcUUAAAAAJ7fAuUxODUb-fuDGQ85r2VMtCRk"
                                        onChange={this.onChangereCapctcha}
                                    />, */}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => { this.setState({ reqPass: false }) }} >Cancelar</Button>
                            <Button variant="success" onClick={this.register}>Confirmar</Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        }




        if (this.state.confirmacion == false) {
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
                                                    <p className="valpass">{this.state.valData}</p>
                                                    <Form.Group  >
                                                        <Form.Label>Correo Electrónico</Form.Label>
                                                        <Form.Control autoComplete="new-email" type="email" placeholder="Escribe tu correo electrónico" onChange={this.handleChangeCorreo} />
                                                        <Form.Label>No. de Cliente</Form.Label>
                                                        <Form.Control autoComplete="new-user" type="text" placeholder="Escribe tu número de cliente" onChange={this.handleChangeNum} />
                                                    </Form.Group>
                                                </Form>
                                                <Button variant="success" className="button-register" onClick={this.auth}>Registrar</Button>
                                            </Col>
                                            {pass()}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>



            )
        }
        else {

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
                                                    <Form.Group  >
                                                        <Form.Label>Codigo de confirmacion</Form.Label>
                                                        <Form.Control placeholder="Escribe el codigo" onChange={this.handleNumeroConfirmacion} />
                                                    </Form.Group>
                                                </Form>
                                                <Button variant="success" className="button-register" onClick={this.confirmar}>Validar Correo</Button>
                                                <Link onClick={this.reenviarCorreo}>
                                                    <p>¿No resiviste el correo?</p>
                                                </Link>
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
}
export default Register;