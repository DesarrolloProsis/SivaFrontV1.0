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
import { object } from "prop-types";
registerLocale('es', es)




// const  indexOfLastPost = currentPage * postsPerPAge;
// const indexOfFirstPost = indexOfLastPost - postsPerPAge;
// const currenPosts = this.state.movimientos.slice(indexOfFirstPost, indexOfLastPost);

class CardModuleFilters extends React.Component {
    state = {


        //ArrayStaticos--Hasta--AxiosNuevo
        cuentas: [],
        tags: [],
        //ArraysDinamico-Metodos
        startDate: new Date(),
        endDate: new Date(),
        cuentaInfo: "",
        tagInfo: "Todos los Tags",
        typeCuentaInfo: "",
        idCuenta: "",
        arrayTag: [],
        movimientos: [],
        movimientoPagi: [],
        arrayDePaginas: [],
        totalPost: 0,
        currentPage: 1,
        postsPerPAge: 15,
        loader: false,



    };


    componentDidMount() {

        const cookieget = new Cookies();
        var token = `${cookieget.get('token')}`
        var numCliente = `${cookieget.get('numCliente')}`
        var axiosconfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        // var objectNew = {};
        // objectNew.file1 = [1,'Manzana']
        // objectNew.file2 = [2, 'Pera']

        axios.get(`http://192.168.0.144:8084/api/clients/${numCliente}`, axiosconfig)
            .then(res => {

                this.setState({
                    cuentas: res.data.cuentas,
                    tags: res.data.tags,
                    idcuenta: res.data.cuentas[0][0],
                    cuentaInfo: res.data.cuentas[0][1],
                    typeCuentaInfo: res.data.cuentas[0][2],
                })

                console.log(this.state.idcuenta)
                this.fillTags(this.state.cuentaInfo)

            })
            .catch(err => {
                console.log(err)
            })
    }




    //ArrayPaginadoTablaUSer
    paginate = pageNumber => {



        if (pageNumber === 1) {
            var primeros15 = this.state.movimientos.slice(0, 15)
            this.setState({ movimientoPagi: primeros15 })
        }
        else if (pageNumber === 'Siguiente') {

            for (let i = 0; i < this.state.arrayDePaginas.length; i++) {

                if (this.state.arrayDePaginas[i] % 10 === 0) {

                    this.arrayAntSig(pageNumber, this.state.arrayDePaginas[i])
                }
            }
        }
        else if (pageNumber === 'Anterior') {

            if (this.state.arrayDePaginas.length < 10) {
                
                this.arrayAntSig(pageNumber, this.state.arrayDePaginas[1] - 1)
            }
            else {

                for (let i = 0; i < this.state.arrayDePaginas.length; i++) {

                    if (this.state.arrayDePaginas[i] % 10 === 0) {

                        this.arrayAntSig(pageNumber, this.state.arrayDePaginas[i])
                    }
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
        var paginasParaUtilizar = Math.ceil(this.state.totalPost / 15)
        var i_fin = null
        var ultimaPAgina = false

        if (concepto == 'Siguiente') {

            
            var i_inicio = numeroPagina + 1
            arraypage.push('Anterior')

            if (paginasParaUtilizar > numeroPagina) {

                console.log("ultima", i_inicio,"numeroPAg", numeroPagina)
                if((paginasParaUtilizar - numeroPagina) > 10){

                    console.log("Ulti mos PAsos ", (paginasParaUtilizar - numeroPagina))
                    i_fin = i_inicio  + 10                   
                    ultimaPAgina = false
                }
                else{
                    i_fin = paginasParaUtilizar + 1
                    ultimaPAgina = true
                }
               
            }
            else
                i_fin = i_inicio + 10

            for (let i = i_inicio; i < i_fin; i++) {
                
                if (i === i_fin - 1) {

                    if (ultimaPAgina == true) {
                        arraypage.push(i)
                    }
                    else {
                        arraypage.push(i)
                        arraypage.push("Siguiente")
                    }

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

                if (numeroPagina > 20)
                    arraypage.push("Anterior")
                for (let i = numeroPagina - 19; i <= numeroPagina - 10; i++) {

                    if (i == numeroPagina - 10) {
                        arraypage.push(i)
                        arraypage.push("Siguiente")
                    }
                    else {
                        arraypage.push(i)
                    }
                }

                this.setState({ arrayDePaginas: arraypage })

            }

        }

    }


    //ArrayPaginado
    arrayPag = numeroPagina => {

        var paginasParaUtilizar = Math.ceil(this.state.totalPost / 15)
        var arraypage = []

        console.log("Numero de Paginaciones", paginasParaUtilizar)
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

            for (let i = 1; i <= Math.ceil(this.state.totalPost / 15); i++) {
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


        var numCuenta = event.currentTarget.value
        var tipoCuenta = null
        var idcuenta = null

        for (var i = 0; i < this.state.cuentas.length; i++) {
            if (this.state.cuentas[i][1] === numCuenta) {
                tipoCuenta = this.state.cuentas[i][2]
                idcuenta = this.state.cuentas[i][0]
            }
        }

        this.setState({
            cuentaInfo: numCuenta,
            typeCuentaInfo: tipoCuenta,
            idcuenta: idcuenta,
        })

        this.fillTags(numCuenta)
    }



    //Handle change de dropwdon tags
    handleDropdownChangeTag = event => {

        if (event.target.value === '') {
            this.setState({ tag: "Todos los Tags" })
        }
        else {
            this.setState({
                tagInfo: event.target.value,

            })
        }
    }



    // Filtro de tags para dropdown dependiento seleccion
    fillTags = (cuenta) => {

        var arrayNew = []


        this.state.tags.forEach(element => {

            if (element.cuentaId === cuenta) {

                arrayNew.push(element)

            }
        });

        this.setState({ arrayTag: arrayNew })




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
        let cuenta = this.state.cuentaInfo;
        let tag = this.state.tagInfo;
        let startDate = moment(this.state.startDate).format('YYYY-MM-DD')
        let endDate = moment(this.state.endDate).format('YYYY-MM-DD')

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
                    this.setState({ loader: false })


                    if (this.state.movimientos.length > 15) {
                        this.setState({ totalPost: this.state.movimientos.length })
                        this.arrayPag(0)
                    }
                    else {
                        this.setState({ arrayDePaginas: [] })
                    }
                    console.log("Datos de los Array", this.state.movimientos.length, this.state.movimientoPagi.length, this.state.totalPost)

                })
                .catch(err => {
                    console.log("AXIOS ERROR", err)
                    this.setState({ loader: false })
                    this.setState({
                        movimientos: false
                    })
                })
        } else if (idCuenta !== "" && cuenta !== "" && tag !== "" && startDate !== "" && endDate !== "") {

            axios.get(`http://192.168.0.144:8084/api/clients/movimientosTag/${cuenta}/${tag}/${startDate}/${endDate}`, config)
                .then(res => {

                    var indexOfLastPost = this.state.currentPage * this.state.postsPerPAge;
                    var indexoffirsPost = indexOfLastPost - this.state.postsPerPAge;

                    this.setState({
                        movimientos: res.data.listTransaccion,
                        movimientoPagi: res.data.listTransaccion.slice(indexoffirsPost, indexOfLastPost),


                    })
                    this.setState({ loader: false })

                    if (this.state.movimientos.length > 10) {
                        this.setState({ totalPost: this.state.movimientos.length })
                        this.arrayPag(0)
                    }
                    else {
                        this.setState({ arrayDePaginas: [] })
                    }
                })
                .catch(err => {
                    console.log("AXIOS ERROR", err)
                    this.setState({ loader: false })
                    this.setState({
                        movimientos: false
                    })
                })
        } else {
            console.log("CONSULTA INVALIDA")
            this.setState({ loader: false })
        }

    }
    render() {

        return (
            <div>
                <Row className="py-5">
                    <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                        <CardInfo cuenta={this.state.cuentaInfo} tag={this.state.tagInfo} typeCuenta={this.state.typeCuentaInfo}></CardInfo>
                    </Col>
                    <Col xl={9} lg={9} md={12} sm={12} xs={12}>
                        <Card.Header className="header">MOVIMIENTOS</Card.Header>
                        <Card.Header >

                            <Row>
                                <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                                    <p className="filter-text">Cuentas:</p>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Control as="select" onClick={this.handleDropdownChange}>
                                            {this.state.cuentas.map((cuenta, id) => {
                                                return (
                                                    <option value={cuenta[1]} key={id} data-key={cuenta[2]}>{cuenta[1]}</option>
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
                                            {this.state.arrayTag.map((tag, id) => {
                                                return (
                                                    <option value={tag.numTag} key={id.cuentaId}>{tag.numTag}</option>
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
