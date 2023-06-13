import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/custom.css";

export const FacturaVenta = () => {
  const [ruc, setRuc] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [timbrado, setTimbrado] = useState("");
  const [numeroFactura, setNumeroFactura] = useState("");
  const [fecha, setFecha] = useState("");
  const [codigoProducto, setCodigoProducto] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [impuesto, setImpuesto] = useState("");
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [datosProductosElaborados, setDatosProductosElaborados] = useState([]);
  const [datosDetallesFacturas, setDatosDetallesFacturas] = useState([]);

  const handleAgregarItem = () => {
    const item = {
      codigoProducto,
      producto,
      cantidad,
      precioUnitario,
      impuesto,
    };

    // Buscar el nombre y precio unitario del producto en la lista de datos de productos elaborados
    const productoEncontrado = datosProductosElaborados.find(
      (productoElaborado) => productoElaborado.id === parseInt(codigoProducto)
    );
    if (productoEncontrado) {
      item.producto = productoEncontrado.nombre;
      item.precioUnitario = productoEncontrado.precioUnitario;
    }

    setItems([...items, item]);

    const itemTotal =
      parseFloat(item.precioUnitario) * parseFloat(item.cantidad);

    setTotal((prevTotal) => prevTotal + itemTotal);

    setCodigoProducto("");
    setProducto("");
    setCantidad("");
    setPrecioUnitario("");
    setImpuesto("");
  };

  const obtenerFacturas = async () => {
    try {
      const response = await axios.get("https://localhost:7089/api/facturas");
      const facturas = response.data;

      // Obtener los datos necesarios de cada factura
      const datosFacturas = facturas.map((factura) => ({
        iva5: factura.fl_iva_5,
        iva10: factura.fl_iva_10,
        cliente: factura.fk_cliente,
      }));

      console.log(datosFacturas);
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
  };

  const obtenerDetalleFactura = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7089/api/detalles_facturas"
      );
      const detallesFacturas = response.data;

      // Obtener los datos necesarios de cada detalle de factura
      const datosDetallesFacturas = detallesFacturas.map((detalleFactura) => ({
        cantidad: detalleFactura.int_cantidad,
        precioUnitario: detalleFactura.fl_precio_unitario,
        producto: detalleFactura.fk_producto,
      }));

      setDatosDetallesFacturas(datosDetallesFacturas); // Actualizar el estado

      console.log(datosDetallesFacturas);
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
  };

  const obtenerProductosElaborados = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7089/api/productos_elaborados"
      );
      const productosElaborados = response.data;

      // Obtener los datos necesarios de cada producto elaborado
      const datosProductosElaborados = productosElaborados.map(
        (productoElaborado) => ({
          id: productoElaborado.id_producto_elaborado,
          nombre: productoElaborado.str_nombre_producto,
          precioUnitario: productoElaborado.fl_precio_unitario,
        })
      );

      setDatosProductosElaborados(datosProductosElaborados); // Actualizar el estado

      console.log(datosProductosElaborados);
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
  };

  const obtenerClientes = async () => {
    try {
      const response = await axios.get("https://localhost:7089/api/clientes");
      const clientes = response.data;

      // Hacer algo con los datos de los clientes obtenidos
      console.log(clientes);
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerFacturas();
    obtenerDetalleFactura();
    obtenerProductosElaborados();
    obtenerClientes(); // Agregar esta línea
  }, []);

  const guardarFactura = async () => {
    try {
      // Obtener los datos del cliente mediante la API de clientes
      const clientesResponse = await axios.get(
        `https://localhost:7089/api/clientes?str_ruc_cliente=${ruc}`
      );
      const cliente = clientesResponse.data[0]; // Suponiendo que el RUC/CI es único y devuelve solo un cliente

      if (!cliente) {
        console.log(
          "No se encontró ningún cliente con el RUC/CI proporcionado"
        );
        return;
      }

      const factura = {
        int_timbrado: generarNumeroAzar(),
        str_ruc_cliente: cliente.str_ruc_cliente,
        str_nombre_cliente: cliente.str_nombre_cliente,
        date_fecha_emision: obtenerFechaActual(),
        fl_total_pagar: total,
        fl_iva_5: 0, // Ajusta este valor según corresponda
        fl_iva_10: 0, // Ajusta este valor según corresponda
        fk_cliente: cliente.id_cliente, // Relacionar con el ID del cliente obtenido
      };

      // Guardar la factura en la API de Facturas
      const facturasResponse = await axios.post(
        "https://localhost:7089/api/facturas",
        factura
      );
      const facturaGuardada = facturasResponse.data;

      console.log("Factura guardada:", facturaGuardada);

      // Realizar cualquier acción adicional después de guardar la factura
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
  };

  const generarNumeroAzar = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const fechaFormateada = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    return fechaFormateada;
  };

  return (
    <div>
      <div>
        <h1>Nueva Venta</h1>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>RUC/CI:</label>
              <input
                type="text"
                style={{ width: "300px" }}
                className="form-control custom-input"
                value={ruc}
                onChange={(e) => setRuc(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Código de Producto:</label>
                  <input
                    type="text"
                    style={{ width: "300px" }}
                    className="form-control codigoP"
                    value={codigoProducto}
                    onChange={(e) => setCodigoProducto(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="cantidadP-label">Cantidad:</label>
                  <input
                    type="text"
                    style={{ width: "300px" }}
                    className="form-control cantidadP"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-outline-success facturaAgg"
        onClick={handleAgregarItem}
      >
        Agregar
      </button>
      <br></br>
      <table id="customers">
        <thead>
          <tr>
            <th>Código Producto</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Impuesto</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.codigoProducto}</td>
              <td>{item.producto}</td>
              <td>{item.cantidad}</td>
              <td>{item.precioUnitario}</td>
              <td>{item.impuesto}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br></br>
      <div>
        <label className="totalP-label">Total:</label>
        <input
          type="text"
          style={{ width: "150px" }}
          className="form-control totalP"
          value={total}
          readOnly
        />
      </div>
      <div className="col-sm-12 col-md-4">
        <Link to="/Caja" className="custom-link">
          <button
            type="button"
            className="btn btn-outline-success facturaAgg"
            onClick={guardarFactura}
          >
            Guardar
          </button>
        </Link>
      </div>
    </div>
  );
};

