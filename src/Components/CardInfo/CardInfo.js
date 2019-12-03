import React from "react";
import Card from 'react-bootstrap/Card';

function CardInfo(props) {
      
        
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
  

}
export default CardInfo;



