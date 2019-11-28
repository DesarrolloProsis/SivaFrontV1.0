import React from "react";
import Card from 'react-bootstrap/Card';

function CardInfo(props) {
    if (props.cuenta !== "" && props.tag !== "") {        
        return (<Card>
            <Card.Header>INFORMACIÓN</Card.Header>
            <Card.Body>
                <p>Cuenta: <strong>{props.cuenta}</strong></p>
                <hr />
                <p>Tipo Cuenta: <strong>{props.typeCuenta}</strong></p>
                <hr />
                <p>Tag: <strong>{props.tag}</strong></p>
                <hr />
                

                {/* <p>Estatus:<strong > Activo</strong></p> */}                
                
            </Card.Body>
        </Card>)
    } else if (props.tags === undefined && props.cuenta !== "") {
        
        return (
           
            <Card>
                <Card.Header>INFORMACIÓN</Card.Header>
                <Card.Body>
                    <p>Cuenta: <strong>{props.cuenta}</strong></p>
                    <hr />
                    <p>Tipo Cuenta: <strong>{props.typeCuenta}</strong></p>
                <hr />
                    <p>Tag: <strong>{props.tag}</strong></p>
                    <hr />
                    {/* <p>Estatus:<strong > Activo</strong></p> */}
                </Card.Body>
            </Card>


        )
    } else {        
        return (
            
            <Card>
                <Card.Header>INFORMACIÓN</Card.Header>
                <Card.Body>
                    <p>Cuenta: <strong>Sin seleccionar...</strong></p>
                    <hr />
                    <p>Tipo Cuenta: <strong>Sin seleccionar...</strong></p>
                <hr />
                    <p>Tag: <strong>Sin seleccionar...</strong></p>
                    <hr />
                    {/* <p>Estatus:<strong > Activo</strong></p> */}
                </Card.Body>
            </Card>


        )
    }

}
export default CardInfo;



