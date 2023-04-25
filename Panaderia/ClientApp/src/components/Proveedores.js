import React, { Component } from 'react';
import axios from "axios";
import './Proveedores.css';

export class Proveedores extends Component {
    state = {
        proveedores: []
    };

    componentDidMount() {
        this.fetchProveedores();
    }

    fetchProveedores = () => {
        axios.get("https://localhost:7089/api/Proveedores")
            .then(res => {
                const proveedores = res.data;
                this.setState({ proveedores });
            })
            .catch(error => {
                alert("Error al obtener proveedores");
            });
    }

    handleAddProveedor = (proveedor) => {
        axios.post("https://localhost:7089/api/Proveedores", proveedor)
            .then(res => {
                this.fetchProveedores();
            })
            .catch(error => {
                alert("Error al agregar proveedor");
            });
    }

    handleDeleteProveedor = (id) => {
        axios.delete(`https://localhost:7089/api/Proveedores/${id}`)
            .then(res => {
                this.fetchProveedores();
            })
            .catch(error => {
                alert("Error al eliminar proveedor");
            });
    }

    handleUpdateProveedor = (proveedor) => {
        axios.put(`https://localhost:7089/api/Proveedores/${proveedor.id_proveedor}`, proveedor)
            .then(res => {
                this.fetchProveedores();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h2>Proveedores</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>RUC</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.proveedores.map(proveedor => (
                            <tr key={proveedor.id_proveedor}>
                                <td>{proveedor.id_proveedor}</td>
                                <td>{proveedor.str_nombre_proveedor}</td>
                                <td>{proveedor.str_direccion_proveedor}</td>
                                <td>{proveedor.str_ruc_proveedor}</td>
                                <td>{proveedor.str_correo_proveedor}</td>
                                <td>{proveedor.str_telefono_proveedor}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.handleDeleteProveedor(proveedor.id_proveedor)}>Eliminar</button>
                                    <button className="btn btn-warning" onClick={() => this.handleUpdateProveedor(proveedor)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AgregarProveedor onAddProveedor={this.handleAddProveedor} />

            </div>
        );
    }
}

class AgregarProveedor extends Component {
    state = {
        nombre: "",
        direccion: "",
        ruc: "",
        correo: "",
        telefono: ""
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, direccion, ruc, correo, telefono } = this.state;
        if (!nombre || !direccion || !ruc || !correo || !telefono) {
            alert("Por favor complete todos los campos");
            return;
        }
        const proveedor = {
            str_nombre_proveedor: this.state.nombre,
            str_direccion_proveedor: this.state.direccion,
            str_ruc_proveedor: this.state.ruc,
            str_correo_proveedor: this.state.correo,
            str_telefono_proveedor: this.state.telefono
        };
        this.props.onAddProveedor(proveedor);
        this.setState({
            nombre: "",
            direccion: "",
            ruc: "",
            correo: "",
            telefono: ""
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Agregar Proveedor</h3>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" className="form-control" id="nombre" value={this.state.nombre} onChange={(e) => this.setState({ nombre: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" className="form-control" id="direccion" value={this.state.direccion} onChange={(e) => this.setState({ direccion: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="ruc">RUC:</label>
                    <input type="text" className="form-control" id="ruc" value={this.state.ruc} onChange={(e) => this.setState({ ruc: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="correo">Correo:</label>
                    <input type="text" className="form-control" id="correo" value={this.state.correo} onChange={(e) => this.setState({ correo: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input type="text" className="form-control" id="telefono" value={this.state.telefono} onChange={(e) => this.setState({ telefono: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        );
    }
}