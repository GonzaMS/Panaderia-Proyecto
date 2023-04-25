import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class ProductosElaborados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            recetas: [],
            nombre: '',
            receta: '',
            editMode: false,
            editId: null,
        };
        this.handleNombreChange = this.handleNombreChange.bind(this);
        this.handleRecetaChange = this.handleRecetaChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchProductos();
        this.fetchRecetas();
    }

    async fetchProductos() {
        try {
            const response = await axios.get('https://localhost:7089/api/Productos_elaborados');
            this.setState({ productos: response.data });
        } catch (error) {
            console.log(error);
        }
    }

    async fetchRecetas() {
        try {
            const response = await axios.get('https://localhost:7089/api/Recetas');
            this.setState({ recetas: response.data });
        } catch (error) {
            console.log(error);
        }
    }

    handleNombreChange(event) {
        this.setState({ nombre: event.target.value });
    }

    handleRecetaChange(event) {
        this.setState({ receta: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { nombre, receta, editMode, editId } = this.state;
        const data = {
            str_nombre_producto: nombre,
            fk_recetas: receta,
        };
        try {
            if (editMode) {
                await axios.put(`https://localhost:7089/api/Productos_elaborados/${editId}`, data);
            } else {
                await axios.post('https://localhost:7089/api/Productos_elaborados', data);
            }
            this.setState({ nombre: '', receta: '', editMode: false, editId: null });
            this.fetchProductos();
        } catch (error) {
            console.log(error);
        }
    }

    async handleEdit(producto) {
        this.setState({ nombre: producto.str_nombre_producto, receta: producto.fk_recetas, editMode: true, editId: producto.id_producto_elaborado });
    }

    async handleDelete(producto) {
        try {
            await axios.delete(`https://localhost:7089/api/Productos_elaborados/${producto.id_producto_elaborado}`);
            this.fetchProductos();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { productos, recetas, nombre, receta, editMode } = this.state;

        return (
            <div>
                <h1>Productos Elaborados</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Receta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id_producto_elaborado}>
                                <td>{producto.id_producto_elaborado}</td>
                                <td>{producto.str_nombre_producto}</td>
                                <td>{producto.Recetas ? producto.Recetas.str_receta : '-'}</td>
                                <td>
                                    <button onClick={() => this.handleEdit(producto)}>Editar</button>
                                    <button onClick={() => this.handleDelete(producto)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>{editMode ? 'Editar Producto' : 'Crear Producto'}</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" value={nombre} onChange={this.handleNombreChange} />
                    </label>
                    <br />
                    <label>
                        Receta:
                        <select value={receta} onChange={this.handleRecetaChange}>
                            <option value="">Seleccionar</option>
                            {recetas.map((receta) => (
                                <option key={receta.id_receta} value={receta.id_receta}>
                                    {receta.str_receta}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit">{editMode ? 'Guardar cambios' : 'Crear'}</button>
                </form>
                <br />
                <Link to="/">Volver al inicio</Link>
            </div>
        );
    }
}