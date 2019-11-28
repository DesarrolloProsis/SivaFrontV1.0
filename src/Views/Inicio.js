import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";
import NavbarLogged from "../Components/Navbar/NavbarLogged";

class Inicio extends React.Component {

    render() {
        return (
            <div>
                <NavbarLogged></NavbarLogged>
                <div className="bg">
                    <div className="container py-5">
                        <div className="row justify-content-md-center py-5">
                            <div className="col-md-7"><Link className="btn btn-primary btn-lg btn-block btn-height bg-color" to="/modulo">MOVIMIENTOS</Link></div>
                        </div>
                        {/* <div className="row justify-content-md-center py-4">
                            <div className="col-md-7 justify-middle"><Link className="btn btn-primary btn-lg btn-block btn-height bg-color-2" to="/recargas">RECARGA</Link></div>
                        </div> */}
                    </div>
                </div>
            </div>



        )
    }
}

export default Inicio;