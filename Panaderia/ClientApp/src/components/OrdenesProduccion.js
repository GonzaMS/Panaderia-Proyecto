import React, { Component } from 'react';

export class OrdenesProduccion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordenes: [],
            cantidad: '',
            producto_elaborado: '',
        };
        this.handleUpdateOrden = this.handleUpdateOrden.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch('https://localhost:7089/api/ordenes_produccion');
            const data = await response.json();
            this.setState({ ordenes: data });
        } catch (error) {
            console.log(error);
        }
    }

    async handleUpdateOrden(id, newState) {
        try {
            const response = await fetch(`https://localhost:7089/api/ordenes_produccion/${id}`);
            const data = await response.json();
            const body = JSON.stringify({ ...data, bool_estado_orden: newState });
            await fetch(`https://localhost:7089/api/ordenes_produccion/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
            this.fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { cantidad, producto_elaborado } = this.state;
        try {
            const response = await fetch('https://localhost:7089/api/ordenes_produccion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ int_cantidad: cantidad, fk_producto_elaborado: producto_elaborado })
            });
            const data = await response.json();
            this.setState({ cantidad: '', producto_elaborado: '' });
            this.fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { ordenes, cantidad, producto_elaborado } = this.state;
        return (
            <div>
                <h1>Órdenes de producción</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Cantidad:
                        <input type="text" name="cantidad" value={cantidad} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Producto elaborado:
                        <input type="text" name="producto_elaborado" value={producto_elaborado} onChange={this.handleInputChange} />
                    </label>
                    <button type="submit">Agregar orden</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cantidad</th>
                            <th>Producto elaborado</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map(({ id_orden, int_cantidad, fk_producto_elaborado, bool, bool_estado_orden }) => (
                            <tr key={id_orden}>
                                <td>{id_orden}</td>
                                <td>{int_cantidad}</td>
                                <td>{fk_producto_elaborado}</td>
                                <td>{bool_estado_orden ? 'Terminado' : 'En progreso'}</td>
                                <td>
                                    <button onClick={() => this.handleUpdateOrden(id_orden, !bool_estado_orden)}>
                                        {bool_estado_orden ? 'Marcar como en progreso' : 'Marcar como terminado'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

