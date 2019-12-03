import React from "react";
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Navbar';
import "./TableUser.css";
//Spinner 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

function TableUser(props, props2,props3, props4,props5, props6) {

  const pageNumber = [];
  

  if (props.datos.length > 0) {
    return (
      <div className="res-height">
        <Table size="sm" striped bordered hover responsive className="table-res ">
          <thead className="table-color">
            <tr>
              <th>Concepto</th>
              <th>Plaza</th>
              <th>Carril</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Saldo Restante</th>
            </tr>
          </thead>
          <tbody>

          {props.datos.map(mov => {
              return (<tr>
                 
                                     
                    <td >{mov[0]}</td>
                    <td >{mov[1]}</td>
                    <td >{mov[2]}</td>
                    <td >{mov[3]}</td>
                    <td style = {{color: mov[0] !== "TRANSACCION" ?  "#00FF00" : "#FF0000"}} >{mov[4]}</td>
                    <td >{mov[5]}</td>
                
              </tr>)
            })}


          </tbody>
        </Table>        
        <Loader visible={props.datos2} type="Circles" color="#EC6D25" height={100} width={720}/>    
        <nav>
            <ul className="pagination justify-content-center" >
                {props.arrayPaginas.map(number => (
                    <li key={number}  className="page-item">
                        <a  onClick={() => props.paginate(number)} className="page-link">{number}</a> 
                    </li>        
                ))}

            </ul>
        </nav>  
      </div>

    );
  } else if (props.datos.length == 0) {
    return (
      <div className="res-height">
        <Table size="sm" striped bordered hover responsive className="table-res ">
          <thead className="table-color">
            <tr>
              <th>Concepto</th>
              <th>Plaza</th>
              <th>Fecha</th>
              <th>Saldo</th>
              <th>Saldo Final</th>
            </tr>
          </thead>
          <tbody>

            Sin datos...

          </tbody>
        </Table>
        <Loader visible={props.datos2} type="Circles" color="#EC6D25" height={100} width={720}/>  
      </div>

    );
  } else {
    return (<div className="res-height">
      <Table size="sm" striped bordered hover responsive className="table-res ">
        <thead className="table-color">
          <tr>
            <th>Concepto</th>
            <th>Plaza</th>
            <th>Fecha</th>
            <th>Saldo</th>
            <th>Saldo Final</th>
          </tr>
        </thead>
        <tbody>
          Sin datos...
      </tbody>
      </Table>
      <Loader visible={props.datos2} type="Circles" color="#EC6D25" height={100} width={720}/>  
    </div>)
  }


}
export default TableUser;