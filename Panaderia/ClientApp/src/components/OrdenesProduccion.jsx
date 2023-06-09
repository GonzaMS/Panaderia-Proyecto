import React, { Component } from "react";
import axios from "axios";

export class OrdenesProduccion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordenes: [], // Lista de órdenes de producción
      productos_elaborados: [], // Lista de productos elaborados
      cantidad: "", // Cantidad de producto a elaborar
      producto_elaborado: "", // ID del producto elaborado
      filtroEstado: "", // Estado de la orden de producción
    };
    this.handleUpdateOrden = this.handleUpdateOrden.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFiltroEstadoChange = this.handleFiltroEstadoChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    try{
      axios
        .get("https://localhost:7089/api/ordenes_produccion")
        .then((response) => {
          const data = response.data;
          this.setState({ ordenes: data });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });

      axios
      .get("https://localhost:7089/api/productos_elaborados")
      .then((response) => {
        const data = response.data;
        this.setState({ productos_elaborados: data });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    }catch(error){
      alert(error); 
      console.log(error);
    }

  }

  async handleUpdateOrden(id, newState) {
    try {
      const response = await axios.get(
        `https://localhost:7089/api/ordenes_produccion/${id}`
      );
      const data = response.data;
      const body = JSON.stringify({ ...data, bool_estado_orden: newState });
      await axios.put(
        `https://localhost:7089/api/ordenes_produccion/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.fetchData();
    } catch (error) {
      alert(error)
      console.log(error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { cantidad, producto_elaborado } = this.state;
    try {
      const response = await axios.post(
        "https://localhost:7089/api/ordenes_produccion",
        {
          int_cantidad: cantidad,
          fk_producto_elaborado: producto_elaborado,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      this.setState({ cantidad: "", producto_elaborado: "" });
      this.fetchData();
    } catch (error) {
      alert(error)
      console.log(error);
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFiltroEstadoChange(event) {
    this.setState({ filtroEstado: event.target.value })
  }

  // Obtener el nombre del producto elaborado según su ID
  getNombreProductoElaborado(id) {
    const { productos_elaborados } = this.state;
    const producto = productos_elaborados.find(
      (producto) => producto.id_producto_elaborado === id
    );
    return producto ? producto.str_nombre_producto : "";
  }

  // Filtrar las órdenes de producción según el estado seleccionado
  filtrarPorEstado(ordenes, filtroEstado) {
    if (filtroEstado === "") {
      return ordenes;
    } else if (filtroEstado === "EnCurso") {
      return ordenes.filter((orden) => !orden.bool_estado_orden);
    } else if (filtroEstado === "Finalizado") {
      return ordenes.filter((orden) => orden.bool_estado_orden);
    }
  }

  render() {
    const { ordenes, cantidad, producto_elaborado, filtroEstado } = this.state;

    // Filtrar las órdenes de producción según el estado seleccionado
    const ordenesFiltradas = this.filtrarPorEstado(
      this.state.ordenes,
      filtroEstado
    );

    return (
      <div>
        <h1>Órdenes de producción</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Cantidad:
            <input
              type="text"
              name="cantidad"
              value={cantidad}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Producto elaborado:
            <input
              type="text"
              name="producto_elaborado"
              value={producto_elaborado}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Agregar orden</button>
        </form>
        <select value={filtroEstado} onChange={this.handleFiltroEstadoChange}>
          <option value="">Todos</option>
          <option value="EnCurso">En Curso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
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
            {ordenesFiltradas.map(
              ({
                id_orden,
                int_cantidad,
                fk_producto_elaborado,
                bool_estado_orden,
              }) => (
                <tr key={id_orden}>
                  <td>{id_orden}</td>
                  <td>{int_cantidad}</td>
                  <td>
                    {this.getNombreProductoElaborado(fk_producto_elaborado)}
                  </td>
                  <td>{bool_estado_orden ? "Finalizado" : "En Proceso"}</td>
                  <td>
                    <button
                      onClick={() =>
                        this.handleUpdateOrden(id_orden, !bool_estado_orden)
                      }
                    >
                      {bool_estado_orden ? "Poner en curso" : "Finalizar Orden"}
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
