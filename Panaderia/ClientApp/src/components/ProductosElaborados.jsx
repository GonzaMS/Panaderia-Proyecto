import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

export class ProductosElaborados extends Component {
  state = {
    productosElaborados: [],
    recetas: [],
    detallesRecetas: [],
    ingredientes: [],
    modalOpen: false, // state to control modal visibility
    modalAddOpen: false, // state to control add modal visibility
    selectedReceta: null, // state to store the selected receta
    editProductId: null, // state to store the ID of the product being edited
    newProductName: "", // state to store the new product name
    selectedRecetaId: "", // state to store the selected receta ID
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("https://localhost:7089/api/productos_elaborados")
      .then((response) => {
        const productosElaborados = response.data;
        this.setState({ productosElaborados });
      })
      .catch((error) => {
        console.error("Error al obtener los productos elaborados:", error);
      });

    axios
      .get("https://localhost:7089/api/recetas")
      .then((response) => {
        const recetas = response.data;
        this.setState({ recetas });
      })
      .catch((error) => {
        console.error("Error al obtener las recetas:", error);
      });

    axios
      .get("https://localhost:7089/api/detalles_recetas")
      .then((response) => {
        const detallesRecetas = response.data;
        this.setState({ detallesRecetas });
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de las recetas:", error);
      });

    axios
      .get("https://localhost:7089/api/ingredientes")
      .then((response) => {
        const ingredientes = response.data;
        this.setState({ ingredientes });
      })
      .catch((error) => {
        console.error("Error al obtener los ingredientes:", error);
      });

  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  toggleAddModal = () => {
    this.setState((prevState) => ({
      modalAddOpen: !prevState.modalAddOpen,
      editModalOpen: false,
    }));
  };

  verReceta = (recetaId) => {
    axios
      .get(`https://localhost:7089/api/recetas/${recetaId}`)
      .then((response) => {
        const selectedReceta = response.data;
        const detallesReceta = this.obtenerDetallesReceta(recetaId); // Obtener los detalles de la receta
        selectedReceta.detalles = detallesReceta; // Agregar los detalles al objeto de la receta
        this.setState({ selectedReceta });
        console.log(detallesReceta);
        this.toggleModal();
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la receta:", error);
      });
  };

  handleProductNameChange = (event) => {
    this.setState({ newProductName: event.target.value });
  };

  handleRecetaChange = (event) => {
    this.setState({ selectedRecetaId: event.target.value });
  };

  addProductoElaborado = () => {
    const { newProductName, selectedRecetaId } = this.state;
    const newProduct = {
      str_nombre_producto: newProductName,
      fk_recetas: parseInt(selectedRecetaId),
    };

    axios
      .post("https://localhost:7089/api/productos_elaborados", newProduct)
      .then(() => {
        this.toggleAddModal();
        this.fetchData();
        this.setState({ newProductName: "", selectedRecetaId: "" });
      })
      .catch((error) => {
        console.error("Error al agregar el producto elaborado:", error);
      });
  };

  deleteProductoElaborado = (productId) => {
    axios
      .delete(`https://localhost:7089/api/productos_elaborados/${productId}`)
      .then(() => {
        this.fetchData();
        this.setState({ editModalOpen: false });
      })
      .catch((error) => {
        console.error("Error al eliminar el producto elaborado:", error);
      });
  };

  filtrarPorProducto = (nombreProducto) => {
    if (nombreProducto.trim() === "") {
      this.fetchData();
    } else {
      axios
        .get(
          `https://localhost:7089/api/Productos_elaborados/Buscar/${nombreProducto}`
        )
        .then((response) => {
          const productosElaborados = response.data;
          this.setState({ productosElaborados });
        })
        .catch((error) => {
          console.error("Error al obtener los productos elaborados:", error);
        });
    }
  };

  //Obtener todos los detalles de una receta, dado su ID lo guardo en un array y obtenemos el nombre del ingrediente y la cantidad
  obtenerDetallesReceta = (recetaId) => {
    const { detallesRecetas, ingredientes } = this.state;
    const detalles = [];
    detallesRecetas.forEach((detalle) => {
      console.log("detalle.fk_receta:", detalle.fk_receta);
      console.log("recetaId:", recetaId);
      if (detalle.fk_receta === recetaId) {
        const ingrediente = ingredientes.find(
          (ingrediente) => ingrediente.id_ingrediente === detalle.fk_ingrediente
        );
        console.log("ingrediente:", ingrediente);
        detalles.push({
          ingrediente: ingrediente.str_nombre_ingrediente,
          cantidad: detalle.fl_cantidad,
        });
      }
    });
    console.log("detalles:", detalles);
    return detalles;
  };
  

  render() {
    const {
      productosElaborados,
      recetas,
      modalOpen,
      selectedReceta,
      modalAddOpen,
      newProductName,
      selectedRecetaId,
    } = this.state;

    return (
      <>
        <Container>
          <br />
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <p>Producto Elaborado</p>
            </div>
            <div className="col-sm-12 col-md-5">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Buscar por nombre"
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
                    <path
                      fillRule="evenodd"
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.toggleAddModal}
              >
                Nuevo Producto Elaborado
              </button>
            </div>
          </div>
          <br />
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Ver Receta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosElaborados.map((producto) => (
                <tr key={producto.id_producto_elaborado}>
                  <td>{producto.str_nombre_producto}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => this.verReceta(producto.fk_recetas)}
                    >
                      Ver Receta
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link text-danger"
                      onClick={() =>
                        this.deleteProductoElaborado(
                          producto.id_producto_elaborado
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        {/* Modal */}
        <Modal isOpen={modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Receta</ModalHeader>
          <ModalBody>
            {selectedReceta && (
              <>
                <h5>{selectedReceta.str_nombre_receta}</h5>
                <p>{selectedReceta.str_preparacion}</p>
                <h6>Ingredientes:</h6>
                <ul>
                  {selectedReceta.detalles.map((detalle) => (
                    <li key={detalle.ingrediente}>
                      {detalle.ingrediente}: {detalle.cantidad}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ModalBody>
        </Modal>

        {/* Add Modal */}
        <Modal isOpen={modalAddOpen} toggle={this.toggleAddModal}>
          <ModalHeader toggle={this.toggleAddModal}>
            Nuevo Producto Elaborado
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="newProductName">Nombre del Producto</Label>
              <Input
                type="text"
                id="newProductName"
                value={newProductName}
                onChange={this.handleProductNameChange} // Add onChange handler
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="selectReceta">Receta</Label>
              <Input
                type="select"
                id="selectReceta"
                value={selectedRecetaId}
                onChange={this.handleRecetaChange} // Add onChange handler
              >
                <option value="">Seleccione una receta</option>
                {recetas.map((receta) => (
                  <option value={receta.id_receta} key={receta.id_receta}>
                    {receta.str_receta}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.addProductoElaborado}
              disabled={!newProductName || !selectedRecetaId}
            >
              Agregar
            </Button>
            <Button color="secondary" onClick={this.toggleAddModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
