import React from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Cookies from 'universal-cookie';
import NavbarLogged from "../Components/Navbar/NavbarLogged";
import CardModuleFilters from "../Components/CardModule/CardModuleFilters";
// import { ReactComponent as Imprimir } from './24px.svg';
import "./Modulo.css"
class Modulo extends React.Component {
    state = {
        cuentas: [],
        tags: []
    }
    componentDidMount() {
        const cookieget = new Cookies();
        var token = `${cookieget.get('token')}`
        var numCliente = `${cookieget.get('numCliente')}`
        var axiosconfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(`http://192.168.0.144:8084/api/clients/${numCliente}`, axiosconfig)
            .then(res => {

                
                this.setState({
                    cuentas: res.data.cuentas,
                    tags: res.data.tags
                })

            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                <NavbarLogged></NavbarLogged>
                <Container className="py-5" >
                    <CardModuleFilters cuentas={this.state.cuentas} tags={this.state.tags}></CardModuleFilters>
                </Container>
            </div>

        )
    }
}
export default Modulo;
//  <Card.Header className="header">MOVIMIENTOS<Imprimir className="imp-style"></Imprimir></Card.Header>