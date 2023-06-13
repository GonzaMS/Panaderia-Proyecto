import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


import {
    Table,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";


export class Ventas extends Component {
    state = {
        data: [],
        modalActualizar: false,
        modalInsertar: false,
        modalVenta: false,
        form: {
            id: "",
            str_nombre_cliente: "",
            fl_total_pagar: "",
        },
    };

    componentDidMount() {
        this.obtenerDatos();
    }

    obtenerDatos = () => {
        axios.get("https://localhost:7089/api/facturas")
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => {
                console.error(error);
            });
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

    mostrarModalVenta = () => {
        this.setState({
            modalVenta: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    cerrarModalVenta = () => {
        this.setState({ modalVenta: false });
    };

    editar = (dato) => {
        const { id, str_nombre_cliente, fl_total_pagar } = dato;
        const datosActualizados = {
            id: id,
            str_nombre_cliente: str_nombre_cliente,
            fl_total_pagar: fl_total_pagar,
        };

        axios.put(`https://localhost:7089/api/facturas/${id}`, datosActualizados)
            .then(response => {
                this.obtenerDatos();
                this.setState({ modalActualizar: false });
            })
            .catch(error => {
                console.error(error);
            });
    };

    eliminar = (dato) => {
        var opcion = window.confirm("Estás seguro que deseas ELIMINAR la venta a " + dato.str_nombre_cliente);
        if (opcion === true) {
            const { id } = dato;

            axios.delete(`https://localhost:7089/api/facturas/${id}`)
                .then(response => {
                    this.obtenerDatos();
                    this.setState({ modalActualizar: false });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    insertar = () => {
        const { str_nombre_cliente, fl_total_pagar } = this.state.form;
        const nuevaVenta = {
            str_nombre_cliente: str_nombre_cliente,
            fl_total_pagar: fl_total_pagar,
        };

        axios.post("https://localhost:7089/api/facturas", nuevaVenta)
            .then(response => {
                this.obtenerDatos();
                this.setState({ modalInsertar: false });
            })
            .catch(error => {
                console.error(error);
            });
    };

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    filtrarPorCliente = (valorBusqueda) => {
        axios.get("https://localhost:7089/api/facturas")
            .then(response => {
                const datosFiltrados = response.data.filter(dato => {
                    const cliente = dato.str_nombre_cliente.toLowerCase();
                    const busqueda = valorBusqueda.toLowerCase();
                    return cliente.includes(busqueda);
                });
                this.setState({ data: datosFiltrados });
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        return (
            <>
                <Container>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <p>Venta</p>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control rounded"
                                    placeholder="Buscar por cliente"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    onChange={(e) => this.filtrarPorCliente(e.target.value)}
                                />
                                <span className="input-group-text" id="basic-addon2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-search"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                                        />
                                        <path
                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <Link to='/FacturaVenta' className="custom-link">
                                <button type="button" className="custom-button"> Nueva Venta</button>
                            </Link>
                        </div>
                    </div>
                    <br />
                    <Table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Monto de Factura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.id}>
                                    <td>{dato.str_nombre_cliente}</td>
                                    <td>{dato.fl_total_pagar}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => this.mostrarModalVenta(dato)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-pencil"
                                                viewBox="0 0 16 16"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-eye"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                                    />
                                                    <path
                                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                                    />
                                                </svg>
                                            </svg>
                                        </button>{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div>
                            <h3>Editar</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Nombre del Cliente:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.form.str_nombre_cliente}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Monto de Factura:</label>
                            <input
                                className="form-control"
                                name="monto"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.monto}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => this.editar(this.state.form)}
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => this.cerrarModalActualizar()}
                        >
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div>
                            <h3>Nueva Venta</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Cliente:</label>
                            <input
                                className="form-control"
                                name="cliente"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Monto de Factura:</label>
                            <input
                                className="form-control"
                                name="monto"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => this.insertar()}
                        >
                            Insertar
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => this.cerrarModalInsertar()}
                        >
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalVenta}>
                    <ModalHeader>
                        <div>
                            <h3>Venta</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Cliente:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.form.str_nombre_cliente}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Monto de Factura:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.form.fl_total_pagar}
                                readOnly
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => this.cerrarModalVenta()}
                        >
                            Cerrar
                        </button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
