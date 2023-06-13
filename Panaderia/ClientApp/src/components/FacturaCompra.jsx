import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/custom.css";
import axios from 'axios';

export const FacturaCompra = () => {
  const [cliente, setCliente] = useState('');
  const [ruc, setRuc] = useState('');
  const [ci, setCI] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [impuesto, setImpuesto] = useState('');

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [datosProductosElaborados, setDatosProductosElaborados] = useState([]);
  const [datosProveedores, setDatosProveedores] = useState([]);
  const [fechaActual, setFechaActual] = useState('');

  useEffect(() => {
    obtenerProductosElaborados();
    obtenerProveedores();
  }, []);

  const obtenerProductosElaborados = async () => {
    try {
      const response = await axios.get('https://localhost:7089/api/productos_elaborados');
      const productosElaborados = response.data;

      const datosProductosElaborados = productosElaborados.map(productoElaborado => ({
        id: productoElaborado.id_producto_elaborado,
        nombre: productoElaborado.str_nombre_producto,
        precioUnitario: productoElaborado.fl_precio_unitario
      }));

      setDatosProductosElaborados(datosProductosElaborados);

      console.log(datosProductosElaborados);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerProveedores = async () => {
    try {
      const response = await axios.get('https://localhost:7089/api/proveedores');
      const proveedores = response.data;

      const datosProveedores = proveedores.map(proveedor => ({
        id: proveedor.id_proveedor,
        nombre: proveedor.str_nombre_proveedor
      }));

      setDatosProveedores(datosProveedores);

      console.log(datosProveedores);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const obtenerFechaActual = () => {
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();
      const fechaFormateada = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      return fechaFormateada;
    };

    const interval = setInterval(() => {
      const fechaActual = obtenerFechaActual();
      setFechaActual(fechaActual);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const guardarFactura = async () => {
    try {
      if (!idCliente) {
        console.log('No se encontró ningún cliente con el RUC/CI proporcionado');
        return;
      }

      const factura = {
        int_timbrado: generarNumeroAzar(),
        str_ruc_cliente: ruc,
        str_nombre_cliente: cliente,
        date_fecha_emision: obtenerFechaActual(),
        fl_total_pagar: total,
        fl_iva_5: 0,
        fl_iva_10: 0,
        fk_cliente: idCliente,
      };

      const facturasResponse = await axios.post('https://localhost:7089/api/facturas', factura);
      const facturaGuardada = facturasResponse.data;

      console.log('Factura guardada:', facturaGuardada);
    } catch (error) {
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
    const fechaFormateada = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return fechaFormateada;
  };

  const buscarPrecioProducto = (nombreProducto) => {
    const productoEncontrado = datosProductosElaborados.find(producto => producto.nombre === nombreProducto);
    if (productoEncontrado) {
      setPrecioUnitario(productoEncontrado.precioUnitario.toString());
    } else {
      setPrecioUnitario('');
    }
  };

  const handleAgregarItem = () => {
    const nuevoItem = {
      proveedor: proveedorSeleccionado, // Nombre del proveedor seleccionado
      producto: productoSeleccionado,
      cantidad: parseFloat(cantidad),
      precioUnitario: parseFloat(precioUnitario),
      impuesto: parseFloat(impuesto),
    };

    setItems([...items, nuevoItem]);

    // Restablecer los valores de entrada a su estado inicial
    setProveedorSeleccionado('');
    setProductoSeleccionado('');
    setCantidad('');
    setPrecioUnitario('');
    setImpuesto('');
  };

  return (
    <div>
      <div>
        <h1>Nueva Compra</h1>
        <div className="fecha-actual">{fechaActual}</div>
        <div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group row">
          <label className="col-sm-3 proveedor-label" htmlFor="proveedorSelect">Proveedor:</label>
          <div className="col-sm-9">
            <select
              className="form-control proveedor-input"
              id="proveedorSelect"
              value={proveedorSeleccionado}
              onChange={e => {
                setProveedorSeleccionado(e.target.value);
              }}
            >
              <option value="">Seleccionar proveedor</option>
              {datosProveedores.map(proveedor => (
                <option
                  key={proveedor.id}
                  value={proveedor.nombre}
                >
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="productoSelect" style={{ textAlign: 'right' }}>Producto:</label>
                  <div className="col-sm-9">
                    <select
                      className="form-control"
                      id="productoSelect"
                      value={productoSeleccionado}
                      onChange={e => {
                        setProductoSeleccionado(e.target.value);
                        buscarPrecioProducto(e.target.value);
                      }}
                    >
                      <option value="">Seleccionar producto</option>
                      {datosProductosElaborados.map(productoElaborado => (
                        <option
                          key={productoElaborado.id}
                          value={productoElaborado.nombre}
                        >
                          {productoElaborado.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className='cantidadP-label'>Cantidad:</label>
                  <input type="text" style={{ width: '300px' }} className="form-control cantidadP" value={cantidad} onChange={e => setCantidad(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-outline-success facturaAgg" onClick={handleAgregarItem}>Agregar</button>
        <br></br>
        <table id="customers">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.producto}</td>
                <td>{item.cantidad}</td>
                <td>{item.precioUnitario}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div>
          <label className='totalP-label'>Total:</label>
          <input type="text" style={{ width: '150px' }} className="form-control totalP" value={total} readOnly />
        </div>
        <div className="col-sm-12 col-md-4">
          <Link to='' className="custom-link">
            <button type="button" className="btn btn-outline-success facturaAgg" onClick={guardarFactura}>Guardar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};