import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Inicio from "../Views/Inicio";
import Modulo from "../Views/Modulo";
import Cookies from 'universal-cookie';
import axios from "axios";
class Protected extends React.Component {
    state = {
       auth:true
    }
    UNSAFE_componentWillMount() {
        const cookieget = new Cookies();
        var cookie = `${cookieget.get('token')}`
        var numCliente = `${cookieget.get('numCliente')}`
        var data = {
            "id":"0",
            "cliente":`${numCliente}`,
            "fechaGeneracion":"10/05/2000",
            "webToken":`${cookie}`
        }
        axios.post("http://192.168.0.144:8084/api/auth/validateToken", data)
            .then(res => {
                if (res) {
                    this.setState({
                        auth: true
                    })
                }
            })
            .catch(err => {
                console.log("fallo!")
                console.log(err);
                this.setState({
                    auth: false
                })
            })
        }

    render() {
    

        return (
            <Switch>
                <Route path="/inicio" render={() => (this.state.auth === true ? (<Inicio />) : (<Redirect to="/" />))} />
                <Route path="/modulo" render={() => (this.state.auth === true ? (<Modulo />) : (<Redirect to="/" />))} />
            </Switch>

        )


    }
}
export default Protected;