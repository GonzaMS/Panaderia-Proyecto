import "../css/custom.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import { Table, Container } from "reactstrap";

export class StockProductos extends Component {
  state = {
    stocks: [],
    productos_elaborados_sotck: [],
    productos_elaborados: [],
    detalles_productos: [],
    productosFiltrados: [],
    modalActualizar: false,
    modalInsertar: false,
  };

  componentDidMount() {
    this.fetchDatos();
  }

  fetchDatos = () => {
    try {
      //Obtener el stock de productos
      axios
        .get("https://localhost:7089/api/stocks")
        .then((response) => {
          this.setState({ stocks: response.data });
        })
        .catch((error) => {
          console.log(error.message);
        });

      // Obtener el stock de productos elaborados
      axios
        .get("https://localhost:7089/api/productos_elaborados_stock")
        .then((response) => {
          this.setState({ productos_elaborados_sotck: response.data });
        })
        .catch((error) => {
          console.log(error.message);
        });

      // Obtener los productos elaborados
      axios
        .get("https://localhost:7089/api/productos_elaborados")
        .then((response) => {
          this.setState({ productos_elaborados: response.data });
        })
        .catch((error) => {
          console.log(error.message);
        });

      //Obtener los detalles de los productos
      axios
        .get("https://localhost:7089/api/detalles_productos")
        .then((response) => {
          this.setState({ detalles_productos: response.data });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener el nombre del producto elaborado
  obtenerProducto = (fk_producto_elaborado) => {
    const {productos_elaborados} = this.state;
    console.log(fk_producto_elaborado)


    const productoEnStock = productos_elaborados.find(
      (producto) => producto.id_producto_elaborado === fk_producto_elaborado
    );

    if (productoEnStock) {
      console.log(productoEnStock);
      return productoEnStock.str_nombre_producto;
    } else {
      return "Sin producto";
    }
  }

  //Obtener la fecha de elaboracion del producto
  obtenerElaboracion = (fk_producto_elaborado) => {
    const { productos_elaborados_sotck, detalles_productos } = this.state;
  
    const productoEnStock = productos_elaborados_sotck.find(
      (producto) => producto.fk_producto_elaborado === fk_producto_elaborado
    );
  
    if (productoEnStock) {
      console.log(productoEnStock);
      const detalleProducto = detalles_productos.find(
        (detalle) => detalle.id_detalle_producto === productoEnStock.fk_producto_elaborado
      );
  
      if (detalleProducto) {
        console.log(detalleProducto);
        return detalleProducto.date_elaboracion;
      } else {
        return "Sin fecha";
      }
    } else {
      return "Sin fecha";
    }
  }

  //Obtener fecha vencimiento
  obtenerVencimiento = (fk_producto_elaborado) => {
    const { productos_elaborados_sotck, detalles_productos } = this.state;
  
    const productoEnStock = productos_elaborados_sotck.find(
      (producto) => producto.fk_producto_elaborado === fk_producto_elaborado
    );
  
    if (productoEnStock) {
      const detalleProducto = detalles_productos.find(
        (detalle) => detalle.id_detalle_producto === productoEnStock.fk_producto_elaborado
      );
  
      if (detalleProducto) {
        return detalleProducto.date_vencimiento;
      } else {
        return "Sin fecha";
      }
    } else {
      return "Sin fecha";
    }
  }
  
  //Obtener iva
  obtenerIva = (fk_producto_elaborado) => {
    const { productos_elaborados_sotck, detalles_productos } = this.state;
  
    const productoEnStock = productos_elaborados_sotck.find(
      (producto) => producto.fk_producto_elaborado === fk_producto_elaborado
    );
  
    if (productoEnStock) {
      const detalleProducto = detalles_productos.find(
        (detalle) => detalle.id_detalle_producto === productoEnStock.fk_producto_elaborado
      );
  
      if (detalleProducto) {
        return detalleProducto.fl_iva;
      } else {
        return "Sin iva";
      }
    } else {
      return "Sin iva";
    }
  }
  

  //Filtrar por producto
  filtrarPorProducto = (nombreProducto) => {
    const { productos_elaborados_sotck } = this.state;

    const productosFiltrados = productos_elaborados_sotck.filter((dato) => {
      const nombre = this.obtenerProducto(dato.fk_producto_elaborado);
      return nombre.toLowerCase().includes(nombreProducto.toLowerCase());
    });

    this.setState({ productosFiltrados });
  };

  render() {
    const { productos_elaborados_sotck, productosFiltrados } = this.state;
    const mostrarProductos = productosFiltrados.length > 0 ? productosFiltrados : productos_elaborados_sotck;

    return (
      <>
        <Container>
          <br />
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <p>Stock Productos Elaborados</p>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Buscar por productos"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={(e) => this.filtrarPorProducto(e.target.value)}
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
                    {" "}
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Producto Elaborado</th>
                <th>Fecha Elaboracion</th>
                <th>Fecha vencimiento</th>
                <th>Iva</th>
              </tr>
            </thead>

            <tbody>
              {mostrarProductos.map((dato) => (
                <tr key={dato.id_producto_stock}>
                  <td>{dato.fl_cantidad}</td>
                  <td>{this.obtenerProducto(dato.fk_producto_elaborado)}</td>
                  <td>{this.obtenerElaboracion(dato.fk_producto_elaborado)}</td>
                  <td>{this.obtenerVencimiento(dato.fk_producto_elaborado)}</td>
                  <td>{this.obtenerIva(dato.fk_producto_elaborado)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}
