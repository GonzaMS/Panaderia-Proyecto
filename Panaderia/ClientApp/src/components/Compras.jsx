import "../css/Components.css"
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

const data = [
    { proveedor: "Distribuidora Esquivel", fecha: "21/03/2023", montoTotal: "30.000"},
    { proveedor: "Distribuidora Cesar", fecha: "25/03/2023", montoTotal: "50.000"},
    { proveedor: "Dulce Cruz S.R.L", fecha: "02/04/2023", montoTotal: "55.000"},
    { proveedor: "Cepasa S.R.L", fecha: "17/04/2023", montoTotal: "90.000"},
    { proveedor: "Euro Bakeries", fecha: "20/04/2023", montoTotal: "40.000"},
];

export class Compras extends Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        modalCompra: false,
        form: {
            id: "",
            proveedor: "",
            fecha: "",
            montoTotal: "",
        },
    };
    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };
    mostrarModalCompra = (dato) => {
        this.setState({
            form: dato,
            modalCompra: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    cerrarModalCompra = () => {
        this.setState({ modalCompra: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                arreglo[contador].proveedor = dato.proveedor;
                arreglo[contador].fecha = dato.fecha;
                arreglo[contador].montoTotal = dato.montoTotal;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    eliminar = (dato) => {
        var opcion = window.confirm("Estás seguro que deseas ELIMINAR la compra de " + dato.proveedor);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };
    
    filtrarPorProveedor = (valorBusqueda) => {
        const datosFiltrados = data.filter(dato => {
        const proveedor = dato.proveedor.toLowerCase();
        const busqueda = valorBusqueda.toLowerCase();
        return proveedor.includes(busqueda);
        });
        this.setState({ data: datosFiltrados });
      }
      

    render() {
        return (
            <>
                <Container>
                    <br />
                    
                    <br />
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <p>Compra</p>
                        </div>
                        
                        <div className="col-sm-12 col-md-5">
                            <div className="input-group">
                                <input type="search" className="form-control rounded" placeholder="Buscar por proveedor" aria-label="Search" aria-describedby="search-addon" onChange={(e) => this.filtrarPorProveedor(e.target.value)}/>
                                <span className="input-group-text" id="basic-addon2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                               </span>
                            </div>
                        </div>


                        <div className="col-sm-12 col-md-4">
                        <Link to='/FacturaCompra' className="custom-link">
                                        <button type="button" className="custom-button"> Nueva Compra</button>
                                    </Link>
                        </div>


                    </div>

                    <br />
                    <Table>
                        <thead>
                            <tr>
                                <th>Proveedor</th>
                                <th>Fecha</th>
                                <th>Monto Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.id}>
                                    <td>{dato.proveedor}</td>
                                    <td>{dato.fecha}</td>
                                    <td>{dato.montoTotal}</td>
                                    <td>
                                    <button type="button" className="btn btn-outline-secondary" 
                                             onClick={() => this.mostrarModalCompra(dato)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                             <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                             <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                           </svg></svg>
                                            </button>{" "}
                                            <button type="button" className="btn btn-outline-success" 
                                             onClick={() => this.mostrarModalActualizar(dato)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
                                            </button>{" "}
                                            <button type="button" className="btn btn-outline-danger" onClick={() => this.eliminar(dato)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                                className="bi bi-trash3" viewBox="0 0 16 16"> <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                             </svg>
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        

                        <FormGroup>
                            <label>
                                Proveedor:
                            </label>
                            <input className="form-control" name="proveedor" type="text" onChange={this.handleChange} value={this.state.form.proveedor} />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Fecha:
                            </label>
                            <input className="form-control" name="fecha" type="text" onChange={this.handleChange} value={this.state.form.fecha} />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Monto Total:
                            </label>
                            <input className="form-control" name="montoTotal" type="text" onChange={this.handleChange} value={this.state.form.montoTotal} />
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                         <button type="button" className="btn btn-outline-success" onClick={() => this.editar(this.state.form)}>Editar</button>
                        
                         <button type="button" className="btn btn-outline-danger" onClick={() => this.cerrarModalActualizar()}>Cancelar</button>
                      
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Nueva Compra</h3></div>
                    </ModalHeader>

                    <ModalBody>
                     

                        <FormGroup>
                            <label>
                                Proveedor:
                            </label>
                            <input  className="form-control" name="proveedor" type="text"  onChange={this.handleChange}   />
                        </FormGroup>

                        <FormGroup>
                        <label>
                                Fecha:
                            </label>
                            <input className="form-control" name="fecha" type="text" onChange={this.handleChange}  />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Monto Total:
                            </label>
                            <input className="form-control" name="montoTotal" type="text" onChange={this.handleChange}  />
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                    <button type="button" className="btn btn-outline-success" onClick={() => this.insertar()}>Guardar</button> 
                        <button type="button" className="btn btn-outline-danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</button>   
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalCompra}>
                    <ModalHeader>
                        <div><h3>Compras</h3></div>
                    </ModalHeader>

                    <ModalBody>
       

                    </ModalBody>

                    <ModalFooter>
                        <button type="button" className="btn btn-outline-danger" onClick={() => this.cerrarModalCompra()}>Cancelar</button>   
                    </ModalFooter>
                </Modal>
                
            </>
            
        );
        

        
    }
}
