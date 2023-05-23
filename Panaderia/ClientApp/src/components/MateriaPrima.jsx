import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    {ingrediente: "Harina de trigo", cantidad: "20 kg", costo: "100.000"},
    {ingrediente: "Aceite de oliva", cantidad: "10 litros", costo: "110.000"},
    {ingrediente: "Esencia de vainilla", cantidad: "5 litros", costo: "185.000"},
    {ingrediente: "Manteca", cantidad: "10 kg", costo: "240.000"},
    {ingrediente: "Sal", cantidad: "3 kg", costo: "75.000"},
];

export class MateriaPrima extends Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            ingrediente: "",
            cantidad: "",
            costo: "",
        },
    };
    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
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

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                arreglo[contador].ingrediente = dato. ingrediente;
                arreglo[contador].cantidad = dato.cantidad;
                arreglo[contador].costo = dato.costo;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
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

    filtrarPorIngrediente = (valorBusqueda) => {
        const datosFiltrados = data.filter(dato => {
        const ingrediente = dato.ingrediente.toLowerCase();
        const busqueda = valorBusqueda.toLowerCase();
        return ingrediente.includes(busqueda);
        });
        this.setState({ data: datosFiltrados });
      }
      

    render() {
        return (
            <>
                <Container>
                    <br />
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <p>Materia Prima</p>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <div class="input-group">
                                <input type="search" class="form-control rounded" placeholder="Buscar por ingrediente" aria-label="Search" aria-describedby="search-addon" onChange={(e) => this.filtrarPorIngrediente(e.target.value)}/>
                                <span class="input-group-text" id="basic-addon2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                               </span>
                            </div>
                        </div>


                        <div className="col-sm-12 col-md-4">
                            <Button className="left-button" color="success" onClick={() => this.mostrarModalInsertar()}>Nueva Materia Prima</Button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <Table> 
                        <thead>
                            <tr>
                                <th>Ingrediente</th>
                                <th>Cantidad</th>
                                <th>Costo</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.id}>
                                    <td>{dato. ingrediente}</td>
                                    <td>{dato.cantidad}</td>
                                    <td>{dato.costo}</td>
                                    <td>
                                        <button type="button" class="btn btn-outline-success" 
                                            onClick={() => this.mostrarModalActualizar(dato)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
                                        </button>{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Registro</h3></div>
                    </ModalHeader>

                    <ModalBody>

                        <FormGroup>
                            <label>
                                Ingrediente:
                            </label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.ingrediente}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Cantidad:
                            </label>
                            <input
                                className="form-control"
                                name="cantidad"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.cantidad}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Costo:
                            </label>
                            <input
                                className="form-control"
                                name="costo"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.costo}
                            />
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                         <button type="button" class="btn btn-outline-success" onClick={() => this.editar(this.state.form)}>Editar</button>
                        
                         <button type="button" class="btn btn-outline-danger" onClick={() => this.cerrarModalActualizar()}>Cancelar</button>
                      
                    </ModalFooter>
                </Modal>



                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Nuevo Ingrediente</h3></div>
                    </ModalHeader>

                    <ModalBody>


                        <FormGroup>
                            <label>
                                Ingrediente:
                            </label>
                            <input
                                className="form-control"
                                name="ingrediente"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Cantidad:
                            </label>
                            <input
                                className="form-control"
                                name="cantidad"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Costo:
                            </label>
                            <input
                                className="form-control"
                                name="costo"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                    <button type="button" class="btn btn-outline-success" onClick={() => this.insertar()}>Guardar</button> 
                        <button type="button" class="btn btn-outline-danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</button>   
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}