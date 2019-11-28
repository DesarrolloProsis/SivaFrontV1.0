import React from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableUser from "../TableUser/TableUser";
import Pagination from "../Pagination/Pagination";
import "./CardModuleFilters.css";
import axios from "axios";
import Cookies from 'universal-cookie';
/* DatePicker */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardInfo from "../CardInfo/CardInfo";
import * as moment from 'moment'
registerLocale('es', es)





// const  indexOfLastPost = currentPage * postsPerPAge;
// const indexOfFirstPost = indexOfLastPost - postsPerPAge;
// const currenPosts = this.state.movimientos.slice(indexOfFirstPost, indexOfLastPost);

class CardModuleFilters extends React.Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        tags: [],
        cuenta: "",
        tag: "Todos los Tags",
        typeCuenta: "",
        idcuenta: "",
        movimientos: [],
        movimientoPagi: [],
        arrayDePaginas: [],
        totalPost: 0,
        currentPage: 1,
        postsPerPAge: 15,
        loader: false, 

    };




    //ArrayPaginadoTablaUSer
    paginate = pageNumber => {


        if (pageNumber === 1) {

            var uno = this.state.movimientos.slice(0, 15)
            this.setState({ movimientoPagi: uno })

        }
        else if (pageNumber === 'Siguiente' || pageNumber === 'Anterior') {



            for (let i = 0; i < this.state.arrayDePaginas.length; i++) {

               

                if (this.state.arrayDePaginas[i] % 10 === 0) {


                    this.arrayAntSig(pageNumber, this.state.arrayDePaginas[i])
                    console.log(pageNumber, this.state.arrayDePaginas[i])

                }

            }

        }
        else {
            var dos = this.state.movimientos.slice(pageNumber * 15 - 15, pageNumber * 15)
            this.setState({ movimientoPagi: dos })

        }


    }

    arrayAntSig = (concepto, numeroPagina) => {

        var arraypage = []


        if (concepto == 'Siguiente') {


            var i_inicio = numeroPagina + 1

            arraypage.push('Anterior')

            for (let i = i_inicio; i < i_inicio + 10; i++) {


                if (i === i_inicio + 9) {

                    arraypage.push(i)
                    arraypage.push("Siguiente")
                }
                else {
                    arraypage.push(i)
                }



            }

            this.setState({ arrayDePaginas: arraypage })
        }
        else {

            
            if (numeroPagina === 10) {            


                for (let i = 1; i < 11; i++) {


                    if (i == 10) {

                        arraypage.push(i)
                        arraypage.push("Siguiente")
                    }
                    else {
                        arraypage.push(i)
                    }



                }

                this.setState({ arrayDePaginas: arraypage })
            }
            else {


         
                
                if(numeroPagina > 20)
                    arraypage.push("Anterior")

                
                for (let i = numeroPagina - 19; i <= numeroPagina - 10; i++) {



                    if(i == numeroPagina - 10 ){

                    arraypage.push(i)
                    arraypage.push("Siguiente")

                    }
                    else{
                    arraypage.push(i)
                    }




                }

                this.setState({ arrayDePaginas: arraypage })

            }

        }




    }


    //ArrayPaginado
    arrayPag = numeroPagina => {

     

        var paginasParaUtilizar = Math.ceil(this.state.totalPost / 10)
        var arraypage = []

        if (paginasParaUtilizar > 10) {

            var i_inicio = numeroPagina + 1

            for (let i = i_inicio; i < i_inicio + 10; i++) {


                if (i === 10) {

                    arraypage.push(i)
                    arraypage.push('Siguiente')
                }
                else {
                    arraypage.push(i)
                }



            }

            this.setState({ arrayDePaginas: arraypage })

        }
        else {

            for (let i = 1; i <= Math.ceil(this.state.totalPost / 10); i++) {

                if (i <= 10) {


                    arraypage.push(i)

                }


            }
            this.setState({ arrayDePaginas: arraypage })
        }

    }

    //cambio de fecha fin
    handleChangeEndDate = date => {
        this.setState({
            endDate: date
        });
    }
    //handle cambio de fecha inicio
    handleChange = date => {
        this.setState({
            startDate: date
        });
    }

    //handle cambio de dropdown cuentas
    handleDropdownChange = event => {
        //.target cambia a currentTarget para compatibilidad con FireFox
        if(event.currentTarget.value == "")
            this.setState({tag: ''})
            else
            this.setState({tag: 'Todos los Tags'})

        if (event) {
            const selectedIndex = event.currentTarget.options.selectedIndex;

            // console.log(event.target.options[selectedIndex].getAttribute('data-key'))
            var idCuentaCliente = event.currentTarget.options[selectedIndex].getAttribute('data-key')
            this.state.tags.length = 0;

            var arrayType = event.currentTarget.value.split(',')


            this.setState({
                cuenta: arrayType[1],
                idcuenta: idCuentaCliente,
                typeCuenta: arrayType[0]

            })


        }

        // console.log(event.currentTarget.dataset.tag)
        this.fillTags(arrayType[1])
    }



    //Handle change de dropwdon tags
    handleDropdownChangeTag = event => {

        if(event.target.value === ''){
            this.setState({tag:  "Todos los Tags"})
        }
        else{
        this.setState({
            tag: event.target.value,

        })
    }
    }



    // Filtro de tags para dropdown dependiento seleccion
    fillTags = (cuenta) => {

        this.props.tags.forEach(element => {
            if (element.cuentaId === cuenta) {
                var newStateArray = this.state.tags;
                newStateArray.push(element.numTag);
                this.setState({ tags: newStateArray });
            }
        });
    }

    // Llenado de tabla para pasar mediante props
    fillData = () => {

        
        this.setState({
            loader: true,
            movimientoPagi: [],
            arrayDePaginas: [],
        
        })

        const cookieget = new Cookies();
        var token = `${cookieget.get('token')}`
        var config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        let idCuenta = this.state.idcuenta;
        let cuenta = this.state.cuenta;
        let tag = this.state.tag;
        let startDate = moment(this.state.startDate).format('YYYY-MM-DD')
        let endDate = moment(this.state.endDate).format('YYYY-MM-DD')
        console.log(idCuenta)
        console.log(tag)
        console.log(cuenta)
        console.log(startDate)
        console.log(endDate)
        if (cuenta !== "" && tag !== "" && startDate !== "" && endDate !== "") {


            console.log(`http://192.168.0.144:8084/api/clients/movimientosCuenta/${idCuenta}/${cuenta}/${startDate}/${endDate}`)
            axios.get(`http://192.168.0.144:8084/api/clients/movimientosCuenta/${idCuenta}/${cuenta}/${startDate}/${endDate}`, config)

                .then(res => {



                    var indexOfLastPost = this.state.currentPage * this.state.postsPerPAge;
                    var indexoffirsPost = indexOfLastPost - this.state.postsPerPAge;

                    this.setState({
                        movimientos: res.data.listTransaccion,
                        movimientoPagi: res.data.listTransaccion.slice(indexoffirsPost, indexOfLastPost),

                    })
                    this.setState({loader: false})

                    console.log(this.state.movimientos.length)
                    if(this.state.movimientos.length > 10 ){
                        
                        this.setState({ totalPost: this.state.movimientos.length })
                        this.arrayPag(0)
                        }
                        else{
                            this.setState({arrayDePaginas: []})
                        }

                })
                .catch(err => {
                    console.log("AXIOS ERROR", err)
                    this.setState({loader: false})
                    this.setState({
                        movimientos: false
                    })
                })
        } else if (idCuenta !== "" && cuenta !== "" && tag !== "" && startDate !== "" && endDate !== "") {

            axios.get(`http://192.168.0.144:8084/api/clients/movimientosTag/${cuenta}/${tag}/${startDate}/${endDate}`, config)
                .then(res => {

                    var indexOfLastPost = this.state.currentPage * this.state.postsPerPAge;
                    var indexoffirsPost = indexOfLastPost - this.state.postsPerPAge;
                    console.log(res.data)
                    this.setState({
                        movimientos: res.data.listTransaccion,
                        movimientoPagi: res.data.listTransaccion.slice(indexoffirsPost, indexOfLastPost),


                    })
                    this.setState({loader: false})
                    console.log(this.state.movimientos.length)
                    if(this.state.movimientos.length > 10 ){
                    this.setState({ totalPost: this.state.movimientos.length })
                    this.arrayPag(0)
                    }
                    else
                    {
                        this.setState({arrayDePaginas: []})
                    }
                })
                .catch(err => {
                    console.log("AXIOS ERROR", err)
                    this.setState({loader: false})
                    this.setState({
                        movimientos: false
                    })
                })
        } else {
            console.log("CONSULTA INVALIDA")
            this.setState({loader: false})
        }

    }
    render() {

        return (
            <div>
                <Row className="py-5">
                    <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                        <CardInfo cuenta={this.state.cuenta} tag={this.state.tag} typeCuenta={this.state.typeCuenta}></CardInfo>
                    </Col>
                    <Col xl={9} lg={9} md={12} sm={12} xs={12}>
                        <Card.Header className="header">MOVIMIENTOS</Card.Header>
                        <Card.Header >

                            <Row>
                                <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                                    <p className="filter-text">Cuentas:</p>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Control as="select" onClick={this.handleDropdownChange}>
                                            <option defaultValue="" data-key="" value="" >No seleccionado</option>
                                            {this.props.cuentas.map((cuenta, id) => {
                                                return (
                                                    <option value={cuenta[2] + ',' + cuenta[1]} key={id} data-key={cuenta[0]}>{cuenta[1]}</option>
                                                )
                                            })}

                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                                    <p className="filter-text">Tags:</p>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Control as="select" onClick={this.handleDropdownChangeTag}>
                                            <option defaultValue="" value="">No seleccionado</option>
                                            {this.state.tags.map((tag, id) => {
                                                return (
                                                    <option value={tag} key={id}>{tag}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xl={2} lg={6} md={6} sm={6} xs={12}>
                                    <p className="filter-text">Fecha Inicio:</p>
                                    <DatePicker className="dp-filter" locale="es" selected={this.state.startDate} onChange={this.handleChange} withPortal dateFormat="dd/MM/yyyy"></DatePicker>
                                </Col>
                                <Col xl={2} lg={6} md={6} sm={6} xs={12}>
                                    <p className="filter-text">Fecha Fin:</p>
                                    <DatePicker className="dp-filter" locale="es" selected={this.state.endDate} onChange={this.handleChangeEndDate} withPortal dateFormat="dd/MM/yyyy"></DatePicker>
                                </Col>
                                <Col xl={2} lg={6} md={6} sm={6} xs={12}>
                                    <Button className="button-buscar" onClick={this.fillData}>Buscar</Button>
                                </Col>
                            </Row>
                        </Card.Header >
                        <TableUser datos={this.state.movimientoPagi} datos2={this.state.loader} postPage={this.state.postsPerPAge} totalPost={this.state.totalPost} paginate={this.paginate} arrayPaginas={this.state.arrayDePaginas}></TableUser>                        
                        
                    </Col>
                </Row>
            </div>

        )
    }
}
export default CardModuleFilters;
    