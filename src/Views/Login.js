import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import Navbar from "../Components/Navbar/Navbar";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import store from "../Redux/store";
import axios from "axios";
class Login extends React.Component {
  state = {
    user: "",
    pass: "",
    token: "",
    error:false,
    numCliente:"",
    codigoConfirmacion: "",
    validate: false,
  }
  handleChangeUser = (event) => {
    this.setState({ user: event.target.value });
  }
  handleChangePass = (event) => {
    this.setState({ pass: event.target.value });
  }
  handleNumeroConfirmacion = (event) => {
    this.setState({ codigoConfirmacion: event.target.value });
}

  logIn = () => {
    var data = {
      "email": this.state.user,
      "password": this.state.pass
    }
    axios.post("http://192.168.0.144:8084/api/auth/login", data)
      .then((res) => {

        if(res.data === "SINCONFIRMAR"){

          alert("Sin Confirmar")
          this.setState({validate: true})
        }
        else if(res.data == false){
          alert("No autorizado")
        }  
        else{
        

        this.setState({
          token: res.data.token,
          numCliente:res.data.numeroCliente

        })
        const cookies = new Cookies();
        cookies.set('token',this.state.token);
        cookies.set('numCliente',this.state.numCliente);
        this.props.history.push("/inicio");
      }
      })
      .catch((err) => {
        console.log("REQUEST ERROR: ", err);
        this.setState({
          error:true
        })
      });
    }

    confirmarCodigo = () =>{

      
      axios.post(`http://192.168.0.144:8084/api/auth/confimacionCorreo/${this.state.user}/${this.state.codigoConfirmacion}`)
      .then(res => {
        alert(res.data)
          if (res.data === true) {
              console.log(res.data)
              this.setState({validate: false})
          }
          else{
              console.log(res.data)
              console.log("FALLO ALGO EN EL REGISTRO :(")
          }

      })
      .catch(err => {
          console.log(err)
      })
    }

  render() {
    const errorMessage = () =>{
      
      if (this.state.error === true) {
        return(
          <h4 Style="color:red; font-size:15px;">Credenciales no validas, revisa que tus datos sean correctos. </h4>
        )
       
      }
    }

        //Modal para confirmar contraseña
        const pass = () => {
          if (this.state.validate !== false) {
              return (
                  <Modal show={this.state.validate} centered>
                      <Modal.Header>
                          <Modal.Title>CONFIRMACION</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h5>Enviamos el codigo de confirmacion a tu correo que registraste previamente</h5>
                          <Form>                              
                              <Form.Group>
                                  <Form.Label>Codigo de Validacion</Form.Label>
                                  <Form.Control placeholder="Escribe el codigo" onChange={this.handleNumeroConfirmacion} />
                              </Form.Group>
                          </Form>
                      </Modal.Body>
                      <Modal.Footer>                          
                          <Button variant="success" onClick={this.confirmarCodigo}>Confirmar Codigo</Button>
                      </Modal.Footer>
                  </Modal>
              )
          }
      }

    return (
      <div>
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image color" />
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5 row-back">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">¡Bienvenido!</h3>
                      <form>
                      {errorMessage()}
                      {pass()}
                        <div className="form-label-group ">
                          <input autoComplete="new-email" type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={this.handleChangeUser} autoFocus />
                          <label htmlFor="inputEmail" className="">Correo Electrónico</label>
                        </div>
                        <div className="form-label-group">
                          <input  autoComplete="new-password" type="password" id="inputPassword" className="form-control form-space" placeholder="Password" onChange={this.handleChangePass} />
                          <label htmlFor="inputPassword">Contraseña</label>
                        </div>
                        <p onClick={this.logIn} className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 botoninicio-verde" >iniciar</p>
                        <Link to="/register">
                          <p>¿Eres nuevo? Resgístrate aquí</p>
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
